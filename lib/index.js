'use strict';

const I2CBus = require('i2c-bus');

const REGISTER_CONVERSION = 0x00;
const REGISTER_CONFIG = 0x01;
const REGISTER_THRESHOLD_LO = 0x10;
const REGISTER_THRESHOLD_HI = 0x11;

const Defaults = {
  address: 0x48,
  config: 0b1000010010000011,
  conversionWait: 500,
  i2cDev: 1
};

class ADS101xQ1 {
  // class constructor, use settings to override i2c device and chip address
  constructor (settings) {
    this.settings = Object.assign({}, Defaults, settings);

    this.autoExport();
  }

  // auto export class methods
  autoExport () {
    let self = this;
    Object.getOwnPropertyNames(Object.getPrototypeOf(self)).forEach(function (name) {
      if (/^_[^_]+/.test(name)) {
        self[name.replace(/^_/, '')] = self[name].bind(self);
      }
    });
  }

  _init () {
    this.settings.i2cWire = I2CBus.openSync(this.settings.i2cDev);
  }

  // execute an ADC conversion process
  async _convert () {
    this.settings.i2cWire.writeWordSync(this.settings.address, REGISTER_CONFIG, this.swapEndian(this.settings.config | 0x8000));
    await this.sleep(this.settings.conversionWait);
    return await this.readValue();
  }

  // read the value from the ADC
  async _readValue () {
    let word = this.swapEndian(this.settings.i2cWire.readWordSync(this.settings.address, REGISTER_CONVERSION));
    let voltage = 5 * (0x8000 & word ? (0x7fff & word) - 0x8000 : word) / 0x8000;
    voltage = (Math.round(voltage * 100))/100;
    return voltage;
  }

  _sleep (milliseconds) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, milliseconds);
    });
  }

  _swapEndian(word) {
    return ((word & 0xFF) << 8) | ((word >> 8) & 0xFF);
  }


}

module.exports = ADS101xQ1;
