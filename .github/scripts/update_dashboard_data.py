"""
Copies the five dashboard Google Sheets into data/, the files the website reads. Run every day at 4 am by
.github/workflows/update-dashboard-data.yml. --check reads and checks them without writing anything.

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

DATA = Path(__file__).resolve().parents[2] / "data"
SHEET_CSV = "https://docs.google.com/spreadsheets/d/{id}/export?format=csv&gid={gid}"
TABLES = {
    "pro_daily_summary": ("1SjZp5omv6ur2inHlogkkxtaJZ4RNar3yk_vTzb-Of1Y", 863032480, "date,strategy,parlays,parlays_won,legs,legs_won,matches,stake,payout,profit,balance"),
    "pro_parlays": ("1qnNvRu33vtqubE6mvAbq9o5x6_ZjNO4Fd4eD58QxNNg", 2122682249, "parlay_id,date,strategy,risk,legs,total_odds,fair_probability,stake_share,stake,result,payout,profit,balance_after"),
    "pro_parlay_legs": ("1avLVHtZzbDrSMeOx6TBbfD2B2dEqxe_Ati6y_iCcrlo", 1436308359, "parlay_id,leg_no,match_id,match_date,kickoff,league,home_team,away_team,market,selection,odds,odds_source,fair_probability,ht_score,final_score,result"),
    "free_daily_summary": ("1xPZCRp9WxovcyKovOzb6mWlOgs_TfZ3WbW4CvjXov_8", 450261143, "date,tips,tips_won,settled,stake,payout,profit"),
    "free_tips": ("1ovi09iHuMnZx3FLVyGNrjuZLcLbfUQ_K0Y8ALw6jHnw", 1057985856, "tip_id,date,match_id,kickoff,league,home_team,away_team,market,selection,odds,odds_source,fair_probability,ht_score,final_score,result,stake,payout,profit"),
}
# Only finished results go on the site, so every result must be one of these
RESULTS = {"won", "lost", "void"}
DATE = re.compile(r"\d{4}-\d{2}-\d{2}")
# A score typed where Google could read it as a date (1-2 becoming 2 January) fails here rather than showing on the site
SCORE = re.compile(r"\d+-\d+")


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
    for number, row in enumerate(rows[1:], start=2):
        if not any(cell.strip() for cell in row):
            continue
        kept.append(row)
        cells = dict(zip(head, row))
        for col in ("date", "match_date"):
            if col in cells and not DATE.fullmatch(cells[col].strip()):
                problems.append(f"{name} row {number}: {col} {cells[col]!r} is not yyyy-mm-dd")
        for col in ("ht_score", "final_score"):
            if cells.get(col, "").strip() and not SCORE.fullmatch(cells[col].strip()):
                problems.append(f"{name} row {number}: {col} {cells[col]!r} is not a score like 1-2")
        if "result" in cells and cells["result"].strip().lower() not in RESULTS:
            problems.append(f"{name} row {number}: result {cells['result']!r} must be won, lost or void")
    if not kept:
        problems.append(f"{name}: no rows")
    return [head] + kept, problems


def main():
    tables, problems = {}, []
    for name in TABLES:
        rows, found = read_table(name)
        problems += found
        if rows:
            tables[name] = rows
            print(f"{name}: {len(rows) - 1} rows")
    if "pro_parlays" in tables and "pro_parlay_legs" in tables:
        parlays = {r[0] for r in tables["pro_parlays"][1:]}
        legs = {r[0] for r in tables["pro_parlay_legs"][1:]}
        problems += [f"pro_parlays: {p} has no matches in pro_parlay_legs" for p in sorted(parlays - legs)]
        problems += [f"pro_parlay_legs: {p} is not in pro_parlays" for p in sorted(legs - parlays)]
    if problems:
        print("NOTHING WAS COPIED. The site keeps the previous data. To fix in the Sheets:")
        print("\n".join(f"  - {p}" for p in problems))
        sys.exit(1)
    if "--check" in sys.argv:
        print("All five pass. Nothing written (--check).")
        return
    for name, rows in tables.items():
        with open(DATA / f"{name}.csv", "w", encoding="utf-8", newline="") as f:
            csv.writer(f, lineterminator="\n").writerows(rows)
    print("All five copied.")


if __name__ == "__main__":
    main()
