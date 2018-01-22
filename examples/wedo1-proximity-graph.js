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
sbrick.onMeasurement(() => {
    if (sbrick.measuredPort() == 0) {
        led.plotBarGraph(
        sbrick.measuredValue() - 200,
        250
        )
    }
})
sbrick.onConnected(() => {
    basic.showLeds(`
        . # # # .
        . # . . .
        . . # . .
        . . . # .
        . # # # .
        `)
    sbrick.startMeasurement(0)
})
basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
sbrick.connect("SBrick")
