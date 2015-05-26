#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')
  .option('-t, --tea [type]', 'Steep the specified type of tea [type]', 'black')
  .parse(process.argv);

console.log('Brewing a %s tea', program.tea);
