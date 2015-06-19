#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program     = require('commander');
var notifier    = require('node-notifier');
var ProgressBar = require('progress');
var path        = require('path');
var teaTimes    = {
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
  .version('0.0.2')
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
var bar = new ProgressBar('[:bar] :percent', {
  complete: '=',
  incomplete: ' ',
  total: duration,
  width: 20
});
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    notifier.notify({
      title: 'Steep',
      message: 'Your tea is ready!',
      icon: path.join(__dirname, '../resources/icon.png'),
      sound: 'Blow'
    });
    clearInterval(timer);
  }
}, 1000);
console.log('Brewing a %s tea for %s seconds', program.tea, duration);
