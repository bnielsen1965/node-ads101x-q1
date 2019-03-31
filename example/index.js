'use strict';

const ADS101XQ1 = require('../lib/index.js');

let adc = new ADS101XQ1();

adc.init();

setInterval(async () => {
  let v = await adc.convert();
  console.log('Volts:', v);
}, 1000);
