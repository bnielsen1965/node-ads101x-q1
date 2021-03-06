

```
Configuration settings for ADS1014-Q1 battery voltage monitor.

The voltage module takes an object as a parameter in the contructor. This parameter
holds the settings used to configure and communicate with the ADS1014-Q1 analog
to digital converter. The settings object includes the following fields...

i2cBus: an instance of the i2c-bus module pre-configured for i2c communication.


addr: the i2c address used by the ADC device. Determined by the hardware
connection on the ADDR pin.
GND = 0x48
VDD = 0x49
SDA = 0x4a
SCL = 0x4b


config: the 16 bit config register used to control the operating mode of the ADC.
bit 15 = OS (0x8000)
 write 1 to start single conversion when in power down state
 read 0 = conversion busy, 1 = not busy
bits 14-12 = MUX, input multiplexer on supported devices
  000 = (0x0000)
  001 = (0x1000)
  010 = (0x2000)
  011 = (0x3000)
  100 = (0x4000)
  101 = (0x5000)
  110 = (0x6000)
  111 = (0x7000)
bits 11-9 = PGA, set voltage range
  000 = +/-6.144V (0x0000)
  001 = +/-4.096V (0x0200)
  010 = +/-2.048V (0x0400)(default)
  011 = +/-1.024V (0x0600)
  100 = +/-0.512V (0x0800)
  101, 110, 111 = +/-0.256V (0x0a00)(0x0c00)
bit 8 = MODE, 0 = continuous (0x0000), 1 = single-shot or power down state (0x0100)(default)
bit 7-5 = DR, data rate in samples per second
  000 = 128 sps (0x0000)
  001 = 250 sps (0x0020)
  010 = 490 sps (0x0040)
  011 = 920 sps (0x0060)
  100 = 1600 sps (0x0080) (default)
  101 = 2400 sps (0x00a0)
  110, 111 = 3300 sps (0x00c0)(0x00e0)
bit 4 = COMP_MODE, 0 = traditional comparator (0x0000)(default), 1 = window comparator (0x0010)
bit 3 = COMP_POL, 0 = ALERT/RDY active low (0x0000), 1 = ALERT/RDY active high (0x0008)
bit 2 = COMP_LAT, 0 = No latch on ALERT/RDY, 1 = Latch ALERT/RDY (0x0004)
bit 1-0 = COMP_QUE, comparator disable or set number of conversions before comp
  00 = assert after one conversion (0x0000)
  01 = assert after two conversions (0x0001)
  10 = assert after four conversions (0x0002)
  11 = disable comparator, ALERT/RDY to high impeadance state (0x0003)


The following is an example of a settings object...

var i2cBus = require('i2c-bus').openSync(1); // open i2c bus 1
var addr = "0x48"; // ADDR pin is connected to GND, so we need 0x48 address
// config register set to no mux, 6.144V, single shot, 3300 sps, traditional comparator, ALERT active low, no latch, comparator disable
var config = 0x0000 | 0x0400 | 0x00c0 | 0x0000 | 0x0000 | 0x0000 | 0x0003; // = 0x8483 or 0b1000010010000011
var settings = {
  i2cBus: i2cBus,
  addr: addr,
  config: config
};
var voltage = require('./voltage/voltage')(settings); // create the voltage monitor with our settings
```
