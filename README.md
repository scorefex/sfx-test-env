# SFX test env

Test copy of the ScoreFex website (v10.4), published with GitHub Pages at https://scorefex.github.io/sfx-test-env/ so it can be opened on any device.

This folder holds the built site only. The source lives in `scorefex_website_v10_4`; it is built with `vite build --base=/sfx-test-env/`. Not indexed by search engines (noindex). The live site stays at scorefex.com.

`data/matches`, `data/teams` and `data/players` are written by `.github/workflows/update-matches-data.yml`, live every day at 5:30 am Amman time, from four Google Sheets the transform project fills: the Matches Schedule, Teams Performance and Players Performance pages read them.

The five dashboard tables in `data/` are the exception: live every day at 5:30 am Amman time, `.github/workflows/update-dashboard-data.yml` copies `pro_parlays`, `pro_parlay_legs` and `free_tips` from the Google Sheets in `website_v2_dev_sheets` and works out the two daily summaries from them. If a Sheet fails its checks, nothing is copied and the failed run says which row is wrong.
