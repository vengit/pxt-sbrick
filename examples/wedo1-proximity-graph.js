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
    if (sbrick.measuredPortIs(SBPort.A)) {
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
    sbrick.setDevice(SBConnectedDevice.Wedo1Motion, SBPort.A)
})
basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
sbrick.connect("SBrick")
