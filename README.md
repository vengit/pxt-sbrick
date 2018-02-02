# micro:bit SBrick extension

This extension allows the micro:bit to connect to an SBrick.

## How it works?

The micro:bit can not connect to other BLE devices, i.e. it cannot initiate a
connection. However it happily accepts incoming connections.

An SBrick will connect to a micro:bit if it sends out Eddystone packages with 
the manufacturer's Bluetooth Company Identifier (VENGIT kft. 0x0198) as the 
namespace, and the JavaScript hashCode() of the name of the SBrick as the 
instance. The byte order used is little endian. SBrick listens to such packages 
and decides to initiate a connection accordingly.

## Setup

The SBrick extension requires Bluetooth, and therefore conflicts with Radio.

Since SBrick hasn't got a keypad or display, you have to configure your
micro:bit to use JustWorks pairing, or use no pairing at all. This can be done
in the project settings.

## Blocks

You can use the following blocks to interact with the SBrick.

### Connect to SBrick

The single parameter is the name of the SBrick. 

### On SBrick connected

The code inside this block executes when an SBrick is successfully connected.
This is different from a successful Bluetooth connection. After the Bluetooth
connection is successfully built up, SBrick sends a special event, this block
reacts to that event. Any code inside the Bluetooth "on connected" block
executes strictly before this one.

### Drive with the given power on given port & direction

The power parameter should be in the range 0 - 255. Ports A, B, C, or D can be
choosen from the dropdown menu, along with directions Forward and Backward.

### Drive a given port based on the accelerometer

With this block you can easily configure your micro:bit to act as a kind of
joystick, and send drive signals to the SBrick based on how you tilt it along
the given axis.

### Brake

This command will cause an electrical short circuit on the given port of the
SBrick. If a motor is connected to that port, this will make it hard to turn,
and will act a brake.

### Use device

Configure a port on SBrick for a specific type of device.

### On measurement

This block of code runs whenever new measurement data arrives from the SBrick.

### Measured value

This variable contains the last measured value. It's in a range of 0 - 1000.
0 means 0 volts, or ground, 1000 means the measured voltage is equal to the
power supply voltage. This works well with WeDo 1 proximity and tilt sensors.

### Measured port

This variable contains the measured port.

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
