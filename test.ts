// tests go here; this will not be compiled when this package is used as a library


basic.showLeds(`
    . # . # .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)

sbrick.sbrick_connect("SBrick")

sbrick.sbrick_on_connection_established(() => {
    basic.showLeds(`
        . # # # .
        . # . . .
        . . # . .
        . . . # .
        . # # # .
        `)
})
