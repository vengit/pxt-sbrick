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
        . . . . .
        . # . # .
        . . # . .
        . # . # .
        . . . . .
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
    sbrick.setDevice(SBConnectedDevice.Wedo1Motion, SBPort.A)
})

sbrick.onMeasurement(() => {
    led.toggle(0, 0)
    sbrick.drive(sbrick.measuredValue() / 4, 1, 0)
})

basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)

sbrick.connect("SBrick")
