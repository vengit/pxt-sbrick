let lamp = 0
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
})
input.onButtonPressed(Button.A, () => {
    lamp = 1 - lamp
    sbrick.drive(lamp * 255, 1, 0)
})
basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
sbrick.connect("SBrick4")
lamp = 0
basic.forever(() => {
    sbrick.driveFromAccel(3, 1)
    basic.pause(50)
    sbrick.driveFromAccel(2, 0)
    basic.pause(50)
})
