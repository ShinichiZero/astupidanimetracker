'use strict';

const JIKAN_BASE = 'https://api.jikan.moe/v4';

/**
 * Returns the lowercase day name for today (or the provided Date).
 * @param {Date} [date]
 * @returns {string}  e.g. "monday"
 */
function getTodayName(date) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[(date || new Date()).getDay()];
}

/**
 * Fetches the anime schedule for a given day from the Jikan API.
 * @param {string} day  e.g. "monday"
 * @param {number} [page=1]
 * @returns {Promise<{data: object[], pagination: object}>}
 */
async function fetchSchedule(day, page = 1) {
  const url = `${JIKAN_BASE}/schedules?filter=${encodeURIComponent(day)}&page=${page}&limit=25`;
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json', 'User-Agent': 'astupidanimetracker/1.0.0' },
  });

  if (!res.ok) {
    throw new Error(`Jikan API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Returns all anime airing today, paginating through all pages.
 * @returns {Promise<object[]>}
 */
async function getTodaySchedule() {
  const day = getTodayName();
  let page = 1;
  let allAnime = [];

  while (true) {
    const body = await fetchSchedule(day, page);
    allAnime = allAnime.concat(body.data || []);

    const pagination = body.pagination || {};
    if (!pagination.has_next_page) break;
    page++;
  }

  return allAnime;
}

/**
 * Returns all anime airing on the given day, paginating through all pages.
 * @param {string} day  e.g. "monday"
 * @returns {Promise<object[]>}
 */
async function getScheduleForDay(day) {
  let page = 1;
  let allAnime = [];

  while (true) {
    const body = await fetchSchedule(day, page);
    allAnime = allAnime.concat(body.data || []);

    const pagination = body.pagination || {};
    if (!pagination.has_next_page) break;
    page++;
  }

  return allAnime;
}

module.exports = { getTodayName, fetchSchedule, getTodaySchedule, getScheduleForDay };
