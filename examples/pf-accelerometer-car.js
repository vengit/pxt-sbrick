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
})
basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
sbrick.connect("SBrick")
basic.forever(() => {
    sbrick.driveFromAccel(3, 0)
    basic.pause(50)
    sbrick.driveFromAccel(1, 1)
    basic.pause(50)
})