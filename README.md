# astupidanimetracker

A stupid but functional CLI anime tracker — see what's airing today, directly from your terminal.

## Features

- **`anime --today`** — Shows every anime airing today in a clean ASCII table
- **`anime today`** — Same as above (subcommand form)
- **`anime day <day>`** — Shows the schedule for any day of the week
- Powered by the free [Jikan API](https://jikan.moe/) (MyAnimeList data, no key required)
- Score colour-coding: 🟢 8+, 🟡 6–8, 🔴 below 6

## Requirements

- [Node.js](https://nodejs.org/) v18 or later (native `fetch` is used)

## Installation

```bash
# Clone the repo
git clone https://github.com/ShinichiZero/astupidanimetracker.git
cd astupidanimetracker

# Install dependencies
npm install

# Link the `anime` command globally (optional)
npm link
```

## Usage

```bash
# Show what's airing today
anime --today

# Subcommand form
anime today

# Show a specific day's schedule
anime day saturday
anime day monday

# Help
anime --help
```

## Example Output

```
  ╔══════════════════════════════════════════════════════╗
  ║    🎌  Anime Airing Today (Saturday)                  ║
  ╚══════════════════════════════════════════════════════╝

┌────┬──────────────────────────────────────────┬──────────┬────────┬────────────┬──────────────────────┐
│ #  │ Title                                    │ Episodes │ Score  │ Airs At    │ Studio               │
├────┼──────────────────────────────────────────┼──────────┼────────┼────────────┼──────────────────────┤
│ 1  │ Demon Slayer                             │ 12       │  8.50  │ 23:00 JST  │ ufotable             │
│ 2  │ One Piece                                │  ?       │  7.80  │ 09:30 JST  │ Toei Animation       │
│ 3  │ Bocchi the Rock!                         │ 12       │  9.10  │ 22:00 JST  │ CloverWorks          │
└────┴──────────────────────────────────────────┴──────────┴────────┴────────────┴──────────────────────┘

  Powered by Jikan API (jikan.moe) — 3 title(s) listed
```

## Development

```bash
# Run tests
npm test

# Run the CLI directly
node bin/anime.js --today
```

## Tech Stack

- **Runtime**: Node.js
- **CLI framework**: [Commander.js](https://github.com/tj/commander.js/)
- **Table renderer**: [cli-table3](https://github.com/cli-table/cli-table3)
- **Colors**: [chalk](https://github.com/chalk/chalk)
- **Anime data**: [Jikan API v4](https://docs.api.jikan.moe/)