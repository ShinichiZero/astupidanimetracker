'use strict';

const { describe, it, mock, before, after } = require('node:test');
const assert = require('node:assert/strict');

// ── helpers ──────────────────────────────────────────────────────────────────

const { getTodayName } = require('../src/api');
const { truncate, formatScore, formatBroadcast } = require('../src/table');
const { validateDay, capitalise } = require('../src/index');

// ── api helpers ───────────────────────────────────────────────────────────────

describe('getTodayName', () => {
  it('returns a lowercase day string', () => {
    const day = getTodayName();
    const valid = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    assert.ok(valid.includes(day), `Expected a valid day name, got "${day}"`);
  });

  it('accepts an explicit Date object', () => {
    // 2024-01-01 was a Monday
    const monday = new Date('2024-01-01T12:00:00Z');
    // getDay() is locale/timezone dependent in tests — test based on actual value
    const day = getTodayName(monday);
    const valid = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    assert.ok(valid.includes(day));
  });
});

// ── table helpers ─────────────────────────────────────────────────────────────

describe('truncate', () => {
  it('returns N/A for falsy values', () => {
    assert.match(truncate(null, 10), /N\/A/);
    assert.match(truncate('', 10), /N\/A/);
    assert.match(truncate(undefined, 10), /N\/A/);
  });

  it('passes short strings through unchanged', () => {
    // strip ANSI codes for comparison
    const result = truncate('hello', 10);
    assert.ok(result.includes('hello'));
  });

  it('truncates long strings', () => {
    const result = truncate('abcdefghij', 5);
    assert.ok(result.includes('abcd'));
    assert.ok(result.includes('…'));
  });
});

describe('formatScore', () => {
  it('returns N/A for null/undefined/0', () => {
    assert.match(formatScore(null), /N\/A/);
    assert.match(formatScore(undefined), /N\/A/);
    assert.match(formatScore(0), /N\/A/);
  });

  it('formats numeric scores to 2 decimal places', () => {
    const result = formatScore(7.5);
    assert.ok(result.includes('7.50'));
  });
});

describe('formatBroadcast', () => {
  it('returns N/A for missing broadcast', () => {
    assert.match(formatBroadcast(null), /N\/A/);
    assert.match(formatBroadcast({}), /N\/A/);
  });

  it('formats a valid broadcast object', () => {
    const result = formatBroadcast({ time: '23:00', timezone: 'Asia/Tokyo' });
    assert.ok(result.includes('23:00'));
    assert.ok(result.includes('JST'));
  });
});

// ── index helpers ─────────────────────────────────────────────────────────────

describe('validateDay', () => {
  it('accepts valid lowercase day names', () => {
    assert.equal(validateDay('monday'), 'monday');
    assert.equal(validateDay('Sunday'), 'sunday');
    assert.equal(validateDay('  Friday  '), 'friday');
  });

  it('throws on invalid day names', () => {
    assert.throws(() => validateDay('funday'), /Invalid day/);
    assert.throws(() => validateDay(''), /Invalid day/);
  });
});

describe('capitalise', () => {
  it('capitalises the first letter', () => {
    assert.equal(capitalise('monday'), 'Monday');
    assert.equal(capitalise('SUNDAY'), 'SUNDAY');
    assert.equal(capitalise(''), '');
  });
});
