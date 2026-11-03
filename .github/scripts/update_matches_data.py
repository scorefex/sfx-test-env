"""
Takes the four website Google Sheets, written by the transform project's run_website_sheets step, to the files the Matches
Schedule, Teams Performance and Players Performance pages read. Run every day by .github/workflows/update-matches-data.yml.
--check reads and checks without writing.

    data/matches/schedule.json              every fixture, the leagues and their seasons
    data/matches/perf/<league>_<season>.json   the match box's figures, opened when a match is clicked
    data/teams/<league>_<season>.json       one row per team
    data/players/<league>_<season>.json     one row per player

All or nothing: if a Sheet cannot be read or fails a check, no file is touched, the site keeps the previous day's data, and
the run fails with a message saying why. A Sheet that shrank by more than a fifth counts as a failed check. It is far more
likely to be a half-written Sheet than a fifth of the season disappearing.
"""
import csv
import io
import json
import re
import shutil
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

csv.field_size_limit(10_000_000)
DATA = Path(sys.argv[sys.argv.index("--out") + 1]) if "--out" in sys.argv else Path(__file__).resolve().parents[2] / "data"
SHEET_CSV = "https://docs.google.com/spreadsheets/d/{id}/export?format=csv&gid={gid}"
TABLES = {
    "events_schedule": ("1uBzmjLHr5BoKKcrW_7v3aUdvvBCJAwiqWeMLR7xge8I", 0),
    "match_performance": ("1irqKm0TbBX6U2Focke4Yx23NekLSSRqbjNGleskPEmE", 0),
    "teams_performance": ("1PgTFrXVf2o6GyZvCAd0q4BNXvy_3FdASs3RTZZImTOM", 0),
    "players_performance": ("1d5WaT2ahjY262HkMJQfAWgOzTtlmY8DUzUwmVR93X1g", 0),
}
SCHEDULE_NEEDS = {"date", "time", "league_name", "league_log", "round_name", "round_number", "match_id", "team_1", "team_2", "match_status", "league_id",
                  "league_rank", "season_id", "season_number", "ongoing", "team_1_id", "team_2_id", "team_1_goals", "team_2_goals", "team_1_ht", "team_2_ht",
                  "team_1_pens", "team_2_pens", "completion"}
PERF_NEEDS = {"match_id", "league_id", "season_id", "goals_list", "players_1", "players_2"}
TEAM_NEEDS = {"league_id", "season_id", "team_id", "team_name", "position", "points"}
PLAYER_NEEDS = {"league_id", "season_id", "team_id", "player_id", "player_name", "minutes_played"}
STATUS = {"Not Started": 0, "Finished": 1, "Unscheduled": 2}
DATE = re.compile(r"\d{4}-\d{2}-\d{2}")
# The columns a page never reads: they would only make the files bigger
DROP = {"league_id", "season_id", "league_name", "season_number"}


def fetch(url):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=180) as response:
                return response.read().decode("utf-8")
        except (urllib.error.URLError, TimeoutError) as e:
            if attempt == 2:
                raise
            print(f"  retrying after: {e}")
            time.sleep(20)


def read_table(name, needs):
    sheet_id, gid = TABLES[name]
    text = fetch(SHEET_CSV.format(id=sheet_id, gid=gid))
    rows = list(csv.reader(io.StringIO(text)))
    # A Sheet that stops being viewable answers with Google's login page, not with an error
    if not rows or not needs <= set(rows[0]):
        return None, [f"{name}: the columns are not the expected ones (is it still viewable by link?): {text[:80]!r}"]
    head = rows[0]
    kept = [dict(zip(head, r)) for r in rows[1:] if any(c.strip() for c in r)]
    print(f"{name}: {len(kept):,} rows")
    return kept, ([] if kept else [f"{name}: no rows"])


def whole(value):
    return int(value) if str(value).strip().lstrip("-").isdigit() else None


def build_schedule(rows, problems):
    leagues, seasons, teams, matches, seen = {}, {}, {}, [], set()
    for n, r in enumerate(rows, start=2):
        if not DATE.fullmatch(r["date"].strip()):
            problems.append(f"events_schedule row {n}: date {r['date']!r} is not yyyy-mm-dd")
        if r["match_status"] not in STATUS:
            problems.append(f"events_schedule row {n}: status {r['match_status']!r} is not one the page knows")
        if r["match_id"] in seen:
            problems.append(f"events_schedule row {n}: match {r['match_id']} is there twice")
        seen.add(r["match_id"])
        league = leagues.setdefault(r["league_id"], {
            "id": r["league_id"], "name": r["league_name"], "logo": r["league_log"].split("/")[0], "rank": whole(r["league_rank"]) or 999, "seasons": []})
        key = (r["league_id"], r["season_id"])
        if key not in seasons:
            seasons[key] = {"id": r["season_id"], "label": r["season_number"], "ongoing": r["ongoing"] == "Yes", "start": r["date"]}
            league["seasons"].append(seasons[key])
        seasons[key]["start"] = min(seasons[key]["start"], r["date"])
        for tid, name in ((r["team_1_id"], r["team_1"]), (r["team_2_id"], r["team_2"])):
            teams.setdefault(tid, name)
    ordered = sorted(leagues.values(), key=lambda l: l["rank"])
    for league in ordered:
        league["seasons"].sort(key=lambda s: s["start"], reverse=True)
    league_at = {l["id"]: i for i, l in enumerate(ordered)}
    team_ids = sorted(teams)
    team_at = {t: i for i, t in enumerate(team_ids)}
    for r in rows:
        season_at = next(i for i, s in enumerate(ordered[league_at[r["league_id"]]]["seasons"]) if s["id"] == r["season_id"])
        row = [r["match_id"], league_at[r["league_id"]], season_at, r["date"], r["time"], r["round_name"], r["round_number"],
               team_at[r["team_1_id"]], team_at[r["team_2_id"]], STATUS.get(r["match_status"], 2)]
        if r["match_status"] == "Finished" and r["team_1_goals"] != "":
            row += [whole(r["team_1_goals"]), whole(r["team_2_goals"]), whole(r["team_1_ht"]), whole(r["team_2_ht"]),
                    whole(r["team_1_pens"]), whole(r["team_2_pens"]), r["completion"]]
        matches.append(row)
    to_come = sum(1 for r in rows if r["match_status"] == "Not Started" and r["date"] >= datetime.now(timezone.utc).strftime("%Y-%m-%d"))
    return {"leagues": ordered, "teams": [[t, teams[t]] for t in team_ids], "matches": matches, "to_come": to_come}


def by_season(rows):
    groups = {}
    for r in rows:
        groups.setdefault(f"{r['league_id']}_{r['season_id']}", []).append(r)
    return groups


def compact(rows):
    """{columns, rows}: the column names once, not on every row."""
    columns = [c for c in rows[0] if c not in DROP]
    return {"columns": columns, "rows": [[r[c] for c in columns] for r in rows]}


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


def main():
    problems = []
    schedule_rows, found = read_table("events_schedule", SCHEDULE_NEEDS)
    problems += found
    perf_rows, found = read_table("match_performance", PERF_NEEDS)
    problems += found
    team_rows, found = read_table("teams_performance", TEAM_NEEDS)
    problems += found
    player_rows, found = read_table("players_performance", PLAYER_NEEDS)
    problems += found

    schedule = build_schedule(schedule_rows, problems) if schedule_rows else None
    previous_path = DATA / "matches" / "schedule.json"
    previous = json.loads(previous_path.read_text(encoding="utf-8")) if previous_path.exists() else None
    if schedule and previous and len(schedule["matches"]) < 0.8 * len(previous["matches"]):
        problems.append(f"events_schedule: {len(schedule['matches'])} matches where there were {len(previous['matches'])}")
    if schedule and perf_rows:
        known = {m[0] for m in schedule["matches"]}
        strays = [r["match_id"] for r in perf_rows if r["match_id"] not in known]
        if strays:
            problems.append(f"match_performance: {len(strays)} match(es) not in events_schedule, e.g. {strays[:3]}")

    if problems:
        print("NOTHING WAS COPIED. The site keeps the previous data. To fix:")
        print("\n".join(f"  - {p}" for p in problems))
        sys.exit(1)
    if "--check" in sys.argv:
        print("All pass. Nothing written (--check).")
        return

    # The date moves only when the figures do, so a day with no new data makes no commit
    same = previous and {k: v for k, v in previous.items() if k not in ("generated", "to_come")} == {k: v for k, v in schedule.items() if k != "to_come"}
    schedule["generated"] = previous["generated"] if same else datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%MZ")
    write_json(previous_path, schedule)
    for folder, rows in (("matches/perf", perf_rows), ("teams", team_rows), ("players", player_rows)):
        target = DATA / folder
        if target.exists():
            shutil.rmtree(target)
        for name, group in by_season(rows).items():
            write_json(target / f"{name}.json", compact(group))
    print("Written.")


if __name__ == "__main__":
    main()
