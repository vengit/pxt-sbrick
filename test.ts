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
    sbrick.startMeasurement(2)
})

sbrick.onMeasurement(() => {
    if (sbrick.measuredPort() == 2) {
        led.toggle(0, 0)
        sbrick.drive(sbrick.measuredValue() / 4, 1, 0)
    }
})

basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)

sbrick.connect("SBrick")
