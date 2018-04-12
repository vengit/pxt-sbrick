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
    if (distance <= 100) {
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

sbrick.connect("SBrick")
