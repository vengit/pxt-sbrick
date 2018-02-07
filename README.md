# micro:bit SBrick extension

This extension allows the micro:bit to connect to an SBrick.

## How does it work?

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

### Measured port is...

This block returns a truth value by checking the measured port. This block can
be used with if statements and inside the "on measurement" block.

## Examples

### Connecting to an SBrick

This example shows how to manage the connection lifecycle with SBrick. The
micro:bit will display different images according to the connection state:

* At startup, it shows a smiley
* When a Bluetooth connection is established, display the letter 'B'
* When the handshake with SBrick is successfully completed, display the letter 'S'
* If the connection is broken, display an 'X'

```blocks
bluetooth.onBluetoothConnected(() => {
    basic.showLeds(`
        . # # . .
        . # . # .
        . # # . .
        . # . # .
        . # # . .
        `)
})

sbrick.onConnected(() => {
    basic.showLeds(`
        . # # # .
        . # . . .
        . . # . .
        . . . # .
        . # # # .
        `)
})

bluetooth.onBluetoothDisconnected(() => {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
})

basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)

sbrick.connect("SBrick1")

```

### Stop at the wall

The example below will connect to an SBrick named "SBrick1", starts a motor on 
por D, then it receives measurement data from a WeDo infrared sensor on port C. 
The received data is displayed as a bar graph. If there is an object in front 
of the sensor, the motor is stopped. If the object is removed, the motor is 
restarted.

```blocks
let distance = 0

bluetooth.onBluetoothConnected(() => {
    basic.showLeds(`
        . # # . .
        . # . # .
        . # # . .
        . # . # .
        . # # . .
        `)
})

bluetooth.onBluetoothDisconnected(() => {
    basic.showLeds(`
        . # . # .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
})

sbrick.onConnected(() => {
    basic.showLeds(`
        . # # # .
        . # . . .
        . . # . .
        . . . # .
        . # # # .
        `)
    sbrick.setDevice(SBConnectedDevice.Wedo1Motion, SBPort.C)
})

sbrick.onMeasurement(() => {
    distance = sbrick.measuredValue() - 200
    led.plotBarGraph(
    distance,
    220
    )
    if (distance > 100) {
        sbrick.drive(255, SBPort.D, SBDirection.Forward)
    } else {
        sbrick.brake(SBPort.D)
    }
})

basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)

sbrick.connect("SBrick1")
```

## License

MIT

## Supported targets

* for PXT/microbit
