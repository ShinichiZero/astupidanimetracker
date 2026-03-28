#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const { runToday, runDay } = require('../src/index');

const program = new Command();

program
  .name('anime')
  .description('A stupid but functional CLI anime tracker — see what\'s airing from your terminal.')
  .version('1.0.0')
  .option('--today', 'Show anime airing today')
  .option('--day <day>', 'Show anime airing on a specific day (e.g. monday, tuesday, ...)')
  .action((options) => {
    if (options.day) {
      runDay(options.day);
    } else {
      // default: --today flag or bare `anime` invocation
      runToday();
    }
  });

program
  .command('today')
  .description('Show anime airing today')
  .action(runToday);

program
  .command('day <day>')
  .description('Show anime airing on a specific day (e.g. monday, tuesday, ...)')
  .action(runDay);

program.parse(process.argv);
