# ads101x-q1

Library for TI ADS101x-Q1 analog to digital converter.

A Node.js library that provides methods to interface with a TI ADS101x-q1 ADC
on an i2c interface.


# install

> npm install --save ads101x-q1


# usage

Load the module in your application, create an instance of the module class using
module settings that match your hardware configuration, initialize the new instance,
and then use the asynchronous convert() method to perform an analog to digital conversion.

```Javascript
const ADS101XQ1 = require('ads101x-q1');

let adc = new ADS101XQ1();

adc.init();

adc.convert()
then((voltage) => {
  console.log('Volts:', voltage);
});
```


# configuration

The module constructor accepts configuration settings to change the operation based
on the hardware configuration.

## default

```Javascript
const Defaults = {
  address: 0x48,
  config: 0b1000010010000011,
  conversionWait: 500,
  i2cDev: 1
};
```


## address

The i2c bus address for the device, default is 0x48. The ADDR pin on the chip is used
to set the i2c hardware address.

- GND = 0x48
- VDD = 0x49
- SDA = 0x4a
- SCL = 0x4b


## conversionWait

When the conversion process is started there must be a delay before the device is read.
The conversionWait setting defines the number of milliseconds to wait after a conversion
starts before reading the value. The default wait time is 500 milliseconds.


## i2cDev

The i2cDev settings defines the i2c device bus number to be used. The default is 1
for the /dev/i2c-1 device.


## config

The config settings is a 16 bit word used to configure the ADS101x-Q1 chip. The default
value is 0b1000010010000011

- disable comparator
- no latch
- ALERT/RDY active low
- traditional comparator
- 1600 samples per second
- continuous conversion
- voltage range +/-2.048V
- MUX 000

See the chip data sheet for more details on configuration options.
