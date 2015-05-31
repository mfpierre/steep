#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program  = require('commander');
var teaTimes = {
  'black': 180,
  'green': 120,
  'herbal': 240,
  'oolong': 180,
  'white': 420,
  'mate': 300,
  'rooibos': 300,
  'chai': 600,
  'darjeeling': 180
};

program
  .version('0.0.1')
  .option('-t, --tea [type]', 'Steep the specified type of tea [type]', 'black')
  .option('-s, --strong', '20% additional steep time')
  .option('-l, --light', '20% less steep time')
  .parse(process.argv);

function getTimeForType(type)
{
  for(var index in teaTimes) {
    if(type === index) return teaTimes[index];
  }

  return 180;
}

var duration = getTimeForType(program.tea);
if(program.strong) duration *= 1.2;
if(program.light) duration *= 0.8;
console.log('Brewing a %s tea for %s seconds', program.tea, duration);
