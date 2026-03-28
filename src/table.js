'use strict';

const Table = require('cli-table3');
const chalk = require('chalk');

/**
 * Truncates a string to maxLen characters, appending "…" if cut.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
function truncate(str, maxLen) {
  if (!str) return chalk.gray('N/A');
  return str.length > maxLen ? str.slice(0, maxLen - 1) + '…' : str;
}

/**
 * Formats a score value (number or null/undefined).
 * @param {number|null|undefined} score
 * @returns {string}
 */
function formatScore(score) {
  if (score == null || score === 0) return chalk.gray('N/A');
  const n = Number(score);
  if (n >= 8) return chalk.green(n.toFixed(2));
  if (n >= 6) return chalk.yellow(n.toFixed(2));
  return chalk.red(n.toFixed(2));
}

/**
 * Formats a broadcast time string.
 * @param {object|null} broadcast
 * @returns {string}
 */
function formatBroadcast(broadcast) {
  if (!broadcast || !broadcast.time) return chalk.gray('N/A');
  return `${broadcast.time} JST`;
}

/**
 * Renders an ASCII table of anime to the terminal.
 * @param {object[]} animeList  Array of Jikan anime objects
 * @param {string}   dayLabel  Human-readable day label (e.g. "Today (Saturday)")
 */
function renderTable(animeList, dayLabel) {
  console.log('');
  console.log(chalk.cyan.bold(`  ╔══════════════════════════════════════════════════════╗`));
  console.log(chalk.cyan.bold(`  ║`) + chalk.white.bold(`    🎌  Anime Airing ${dayLabel.padEnd(34)}`) + chalk.cyan.bold(`║`));
  console.log(chalk.cyan.bold(`  ╚══════════════════════════════════════════════════════╝`));
  console.log('');

  if (!animeList || animeList.length === 0) {
    console.log(chalk.yellow('  No anime found for this day. Maybe it\'s a day off? 🍵'));
    console.log('');
    return;
  }

  const table = new Table({
    head: [
      chalk.cyan.bold('#'),
      chalk.cyan.bold('Title'),
      chalk.cyan.bold('Episodes'),
      chalk.cyan.bold('Score'),
      chalk.cyan.bold('Airs At'),
      chalk.cyan.bold('Studio'),
    ],
    colWidths: [4, 42, 10, 8, 12, 22],
    style: {
      head: [],
      border: ['gray'],
    },
    wordWrap: false,
  });

  animeList.forEach((anime, i) => {
    const title = truncate(anime.title_english || anime.title, 40);
    const episodes = anime.episodes ? String(anime.episodes) : chalk.gray('?');
    const score = formatScore(anime.score);
    const airsAt = formatBroadcast(anime.broadcast);
    const studio = truncate(
      anime.studios && anime.studios.length > 0 ? anime.studios[0].name : null,
      20,
    );

    table.push([String(i + 1), title, episodes, score, airsAt, studio]);
  });

  console.log(table.toString());
  console.log('');
  console.log(chalk.gray(`  Powered by Jikan API (jikan.moe) — ${animeList.length} title(s) listed`));
  console.log('');
}

module.exports = { renderTable, truncate, formatScore, formatBroadcast };
