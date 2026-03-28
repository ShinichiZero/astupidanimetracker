'use strict';

const { getTodaySchedule, getScheduleForDay, getTodayName } = require('./api');
const { renderTable } = require('./table');
const chalk = require('chalk');

const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

/**
 * Validates a day string against the known day names.
 * @param {string} day
 * @returns {string}  normalised lowercase day name
 * @throws {Error} if not a valid day
 */
function validateDay(day) {
  const normalised = day.toLowerCase().trim();
  if (!DAY_NAMES.includes(normalised)) {
    throw new Error(
      `Invalid day "${day}". Valid options: ${DAY_NAMES.join(', ')}.`,
    );
  }
  return normalised;
}

/**
 * Runs the "today" command — fetch and display anime airing today.
 */
async function runToday() {
  const todayName = getTodayName();
  const label = `Today (${capitalise(todayName)})`;
  console.log(chalk.gray(`  Fetching schedule for ${label} from Jikan API…`));

  try {
    const animeList = await getTodaySchedule();
    renderTable(animeList, label);
  } catch (err) {
    console.error(chalk.red(`  Error: ${err.message}`));
    process.exit(1);
  }
}

/**
 * Runs the "day" command — fetch and display anime airing on a specific day.
 * @param {string} day
 */
async function runDay(day) {
  const normDay = validateDay(day);
  const label = capitalise(normDay);
  console.log(chalk.gray(`  Fetching schedule for ${label} from Jikan API…`));

  try {
    const animeList = await getScheduleForDay(normDay);
    renderTable(animeList, label);
  } catch (err) {
    console.error(chalk.red(`  Error: ${err.message}`));
    process.exit(1);
  }
}

/**
 * Capitalises the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { runToday, runDay, validateDay, capitalise };
