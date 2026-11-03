"""
Copies the three dashboard Google Sheets into data/ and works out the two daily summaries from them: the files the website
reads. Run every day at 5:29 am by .github/workflows/update-dashboard-data.yml. --check reads and checks without writing;
--out <folder> writes there instead of data/ (the production repo keeps the site's source, so its files are in public/data).

All or nothing: if any Sheet cannot be read or fails a check, no file is touched, the site keeps the previous day's data,
and the run fails with a message naming the Sheet and row. So a half-typed row cannot reach the site, and neither can a
parlay whose matches are not in yet.
"""
import csv
import io
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

DATA = Path(sys.argv[sys.argv.index("--out") + 1]) if "--out" in sys.argv else Path(__file__).resolve().parents[2] / "data"
SHEET_CSV = "https://docs.google.com/spreadsheets/d/{id}/export?format=csv&gid={gid}"
TABLES = {
    "pro_parlays": ("1qnNvRu33vtqubE6mvAbq9o5x6_ZjNO4Fd4eD58QxNNg", 2122682249, "parlay_id,date,strategy,risk,legs,total_odds,fair_probability,stake_share,stake,result,payout,profit,balance_after"),
    "pro_parlay_legs": ("1avLVHtZzbDrSMeOx6TBbfD2B2dEqxe_Ati6y_iCcrlo", 1436308359, "parlay_id,leg_no,match_id,match_date,kickoff,league,home_team,away_team,market,selection,odds,odds_source,fair_probability,ht_score,final_score,result"),
    "free_tips": ("1ovi09iHuMnZx3FLVyGNrjuZLcLbfUQ_K0Y8ALw6jHnw", 1057985856, "tip_id,date,match_id,kickoff,league,home_team,away_team,market,selection,odds,odds_source,fair_probability,ht_score,final_score,result,stake,payout,profit"),
}
PRO_DAILY = "date,strategy,parlays,parlays_won,legs,legs_won,matches,stake,payout,profit,balance".split(",")
FREE_DAILY = "date,tips,tips_won,settled,stake,payout,profit".split(",")
# Only finished results go on the site, so every result must be one of these
RESULTS = {"won", "lost", "void"}
DATE = re.compile(r"\d{4}-\d{2}-\d{2}")
# A score typed where Google could read it as a date (1-2 becoming 2 January) fails here rather than showing on the site
SCORE = re.compile(r"\d+-\d+")
NUMBERS = ("odds", "total_odds", "stake", "payout", "profit", "balance_after")
UNIQUE = {"pro_parlays": "parlay_id", "free_tips": "tip_id"}


def fetch(url):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=60) as response:
                return response.read().decode("utf-8")
        except (urllib.error.URLError, TimeoutError) as e:
            if attempt == 2:
                raise
            print(f"  retrying after: {e}")
            time.sleep(20)


def number(value):
    """(a Sheet may show a figure as $1,234.50)"""
    return float(value.replace("$", "").replace(",", "").strip())


def read_table(name):
    """The Sheet's rows, without any left empty. Problems come back as text, every one of them at once."""
    sheet_id, gid, columns = TABLES[name]
    text = fetch(SHEET_CSV.format(id=sheet_id, gid=gid))
    rows = list(csv.reader(io.StringIO(text)))
    # A Sheet that stops being viewable answers with Google's login page, not with an error
    if not rows or ",".join(rows[0]) != columns:
        return None, [f"{name}: the columns are not the expected ones (is it still viewable by link?): {text[:80]!r}"]
    head = rows[0]
    problems = []
    kept = []
    seen = set()
    for row_number, row in enumerate(rows[1:], start=2):
        if not any(cell.strip() for cell in row):
            continue
        kept.append(row)
        cells = dict(zip(head, row))
        for col in ("date", "match_date"):
            if col in cells and not DATE.fullmatch(cells[col].strip()):
                problems.append(f"{name} row {row_number}: {col} {cells[col]!r} is not yyyy-mm-dd")
        for col in ("ht_score", "final_score"):
            if cells.get(col, "").strip() and not SCORE.fullmatch(cells[col].strip()):
                problems.append(f"{name} row {row_number}: {col} {cells[col]!r} is not a score like 1-2")
        if "result" in cells and cells["result"].strip().lower() not in RESULTS:
            problems.append(f"{name} row {row_number}: result {cells['result']!r} must be won, lost or void")
        if "strategy" in cells and cells["strategy"].strip() != "pro":
            problems.append(f"{name} row {row_number}: strategy {cells['strategy']!r} must be pro")
        for col in NUMBERS:
            if col in cells:
                try:
                    number(cells[col])
                except ValueError:
                    problems.append(f"{name} row {row_number}: {col} {cells[col]!r} is not a number")
        if name in UNIQUE:
            key = cells[UNIQUE[name]].strip()
            if key in seen:
                problems.append(f"{name} row {row_number}: {UNIQUE[name]} {key!r} is used twice")
            seen.add(key)
    if not kept:
        problems.append(f"{name}: no rows")
    return [head] + kept, problems


def as_dicts(rows):
    return [dict(zip(rows[0], row)) for row in rows[1:]]


def pro_daily(parlays, legs):
    """One row per day: the parlays and their stakes, then the matches. A void match is a match but not a settled one."""
    days = {}
    day_of = {}
    for p in as_dicts(parlays):
        key = (p["date"].strip(), p["strategy"].strip())
        d = days.setdefault(key, {"parlays": 0, "won": 0, "legs": 0, "legs_won": 0, "matches": set(), "stake": 0.0, "payout": 0.0, "balance": 0.0})
        d["parlays"] += 1
        d["won"] += p["result"].strip().lower() == "won"
        d["stake"] += number(p["stake"])
        d["payout"] += number(p["payout"])
        d["balance"] = number(p["balance_after"])
        day_of[p["parlay_id"].strip()] = key
    for leg in as_dicts(legs):
        d = days[day_of[leg["parlay_id"].strip()]]
        result = leg["result"].strip().lower()
        if result != "void":
            d["legs"] += 1
            d["legs_won"] += result == "won"
        d["matches"].add(leg["match_id"].strip())
    return [PRO_DAILY] + [
        [date, strategy, d["parlays"], d["won"], d["legs"], d["legs_won"], len(d["matches"]), round(d["stake"], 2), round(d["payout"], 2), round(d["payout"] - d["stake"], 2), d["balance"]]
        for (date, strategy), d in sorted(days.items())
    ]


def free_daily(tips):
    """One row per day of the free channel. `settled` leaves out a void tip."""
    days = {}
    for t in as_dicts(tips):
        d = days.setdefault(t["date"].strip(), {"tips": 0, "won": 0, "settled": 0, "stake": 0.0, "payout": 0.0})
        result = t["result"].strip().lower()
        d["tips"] += 1
        d["won"] += result == "won"
        d["settled"] += result != "void"
        d["stake"] += number(t["stake"])
        d["payout"] += number(t["payout"])
    return [FREE_DAILY] + [
        [date, d["tips"], d["won"], d["settled"], round(d["stake"], 2), round(d["payout"], 2), round(d["payout"] - d["stake"], 2)]
        for date, d in sorted(days.items())
    ]


def read_all():
    """Every Sheet read and checked, then the summaries worked out. Returns (tables, problems); no tables if there are problems."""
    tables, problems = {}, []
    for name in TABLES:
        rows, found = read_table(name)
        problems += found
        if rows:
            tables[name] = rows
            print(f"{name}: {len(rows) - 1} rows")
    if "pro_parlays" in tables and "pro_parlay_legs" in tables:
        parlays = {r[0].strip() for r in tables["pro_parlays"][1:]}
        legs = {r[0].strip() for r in tables["pro_parlay_legs"][1:]}
        problems += [f"pro_parlays: {p} has no matches in pro_parlay_legs" for p in sorted(parlays - legs)]
        problems += [f"pro_parlay_legs: {p} is not in pro_parlays" for p in sorted(legs - parlays)]
    if problems:
        return {}, problems
    tables["pro_daily_summary"] = pro_daily(tables["pro_parlays"], tables["pro_parlay_legs"])
    tables["free_daily_summary"] = free_daily(tables["free_tips"])
    print(f"worked out: pro_daily_summary {len(tables['pro_daily_summary']) - 1} days, free_daily_summary {len(tables['free_daily_summary']) - 1} days")
    return tables, []


def main():
    tables, problems = read_all()
    if problems:
        print("NOTHING WAS COPIED. The site keeps the previous data. To fix in the Sheets:")
        print("\n".join(f"  - {p}" for p in problems))
        sys.exit(1)
    if "--check" in sys.argv:
        print("All pass. Nothing written (--check).")
        return
    for name, rows in tables.items():
        with open(DATA / f"{name}.csv", "w", encoding="utf-8", newline="") as f:
            csv.writer(f, lineterminator="\n").writerows(rows)
    print("All five written.")


if __name__ == "__main__":
    main()
