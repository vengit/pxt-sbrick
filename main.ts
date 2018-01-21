/**
 * Provides blocks to send events to SBricks
 */

/* A micro:bit event value contains an SBrick command and parameters.
 * The most significant 4 bit is the command, the rest are the parameters.
 *
 * Brake: EVENT_SBRICK_CMD  | [4: 0] [3: Port] [9: n/a ]
 * Drive: EVENT_SBRICK_CMD  | [4: 1] [3: Port] [1: direction] [8: power]
 * Set m: EVENT_SBRICK_CMD  | [4: 2] [4: Channel] [8: n/a]
 * Clr m: EVENT_SBRICK_CMD  | [4: 3] [4: Channel] [8: n/a]
 * Freq:  EVENT_SBRICK_FREQ | [16: T1CC0H value low/hi byte]
 * 
 * Conn:  EVENT_SBRICK_RSP  | [1: 0] [15: n/a]
 * Meas:  EVENT_SBRICK_ADC  | [12: value] [4: channel]
 * 
 */

//% color=190 weight=100 icon="\uf1ec" block="SBrick"
namespace sbrick {

    export const EVENT_SBRICK_CMD  = 0x300c
    export const EVENT_SBRICK_FREQ = 0x300d
    export const EVENT_SBRICK_RSP  = 0x300e
    export const EVENT_SBRICK_ADC  = 0x300f

    export const EVENT_VALUE_SBRICK_CONNECTED = 0x0000

    let measurement_value: number = 0;

    export enum Port {
        A = 0,
        B = 2,
        C = 1,
        D = 3
    }

    export enum Channel {
        A0 = 0,
        A1 = 1,
        B0 = 4,
        B1 = 5,
        C0 = 2,
        C1 = 3,
        D0 = 6,
        D1 = 7,
        BATT = 8,
        TEMP = 9
    }

    export enum Direction {
        Forward = 0,
        Backward = 1
    }

    //% blockId=sbrick_measurement_value
    //% block="Measurement value"
    export function sbrick_measurement_value(): number
    {
        return measurement_value
    }

    //% blockId=sbrick_brake
    //% block="Brake on|port %p"
    export function sbrick_brake(p: Port): void
    {
        control.raiseEvent(
            EVENT_SBRICK_CMD,
            0x0000 + 512 * p
        )
    }

    //% blockId=sbrick_drive
    //% block="Apply|power %power|on port %p|in the direcion: %d"
    export function sbrick_drive(power: number, p: Port, d: Direction): void
    { 
        control.raiseEvent(
            EVENT_SBRICK_CMD,
            0x1000 + 512 * p + 256 * d + power
        )
    }

    //% blockId=sbrick_start_measurement
    //% block="Start taking measurements on|channel %ch"
    export function sbrick_start_measurement(ch: Channel): void
    {
        control.raiseEvent(
            EVENT_SBRICK_CMD,
            0x2000 + 256 * ch
        )
    }

    //% blockId=sbrick_stop_measurement
    //% block="Stop taking measurements on|channel %ch"
    export function sbrick_stop_measurement(ch: Channel): void
    {
        control.raiseEvent(
            EVENT_SBRICK_CMD,
            0x3000 + 256 * ch
        )
    }

    //% blockId=sbrick_set_frequency
    //% block="Set the SBrick's PWM frequency register to|%f"
    export function sbrick_set_frequency(t1cc0h: number): void
    {
        control.raiseEvent(EVENT_SBRICK_FREQ, t1cc0h)
    }

    //% blockId=sbrick_on_connection_established
    //% block="When a connection is established"
    export function sbrick_on_connection_established(c: () => void): void
    {
        control.onEvent(EVENT_SBRICK_RSP, EVENT_VALUE_SBRICK_CONNECTED, c)
    }

    //% blockId=sbrick_on_measurement
    //% block="When voltage is measured at|channel %ch"
    export function sbrick_on_measurement(ch: Channel, c: () => void): void
    {
        control.onEvent(EVENT_SBRICK_ADC, 0, () => {
            let ev = control.eventValue()
            if (ch == (ev & 0x000f)) {
                measurement_value = ev >> 4
                c()
            }
        })
    }

    //% blockId=sbrick_drive_from_accel
    //% block="Drive |port %p|with acceleration read across dimension %d"
    export function sbrick_drive_from_accel(p: Port, d: Dimension)
    {
        let x = input.acceleration(d) / 4;

        if (x > 255) {
          x = 255
        }
        if (x < -255) {
          x = -255
        }
        if (x < 20 && x > -20) {
            x = 0
        }

        if (x >= 0) {
            sbrick.sbrick_drive(x, p, sbrick.Direction.Forward)
        }
        if (x < 0) {
            sbrick.sbrick_drive(-x, p, sbrick.Direction.Backward)
        }
    }
}
