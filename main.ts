/**
 * Provides blocks to send events to SBricks
 */

/* A micro:bit event value contains an SBrick command and parameters.
 * The most significant 4 bit is the command, the rest are the parameters.
 *
 * Brake: EVENT_SBRICK_CMD | [4: 0] [3: Port] [9: n/a ]
 * Drive: EVENT_SBRICK_CMD | [4: 1] [3: Port] [1: direction] [8: power]
 * Set m: EVENT_SBRICK_CMD | [4: 2] [4: Channel] [8: n/a]
 * Clr m: EVENT_SBRICK_CMD | [4: 3] [4: Channel] [8: n/a]
 * Freq:  EVENT_SBRICK_CMD | [4: 4] [4: low/hi: 0/1] [8: T1CC0H value low/hi byte]
 * 
 * Conn:  EVENT_SBRICK_RSP | [1: 1] [15: n/a]
 * Meas:  EVENT_SBRICK_ADC | [4: channel] [12: value]
 * 
 */


//% color=190 weight=100 icon="\uf1ec" block="SBrick"
namespace sbrick {

    export const EVENT_SBRICK_CMD  = 12300
    export const EVENT_SBRICK_FREQ = 12300
    export const EVENT_SBRICK_RSP  = 12301
    export const EVENT_SBRICK_ADC  = 12302
    export const EVENT_VALUE_SBRICK_CONNECTED = 0x8000

    let measurement_value: number = 0;

    export enum Port {
        A = 0,
        B = 2,
        C = 1,
        D = 4
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

    //% blockId=sbrick_connect
    //% block="Connect to an SBrick|called %n"
    export function sbrick_connect(n: string): void
    {
        let hash = 0
        for (let c of n) {
            let cc = c.charCodeAt(0)
            hash = ((hash << 5) - hash) + cc
            hash = hash & hash
        }
        bluetooth.advertiseUid(0x0198, hash, 7, true)
    }

    //% blockId=sbrick_brake
    //% block="Brake on|port %p"
    export function sbrick_brake(p: Port): void
    {
        control.raiseEvent(
            EVENT_SBRICK_CMD,
            0x0000 + 256 * 2 * p
        )
    }

    //% blockId=sbrick_drive
    //% block="Apply|power %power|on port %p|in the direcion: %d"
    export function sbrick_drive(power: number, p: Port, d: Direction): void
    { 
        control.raiseEvent(
            EVENT_SBRICK_CMD,
            0x1000 + 256 * (2 * p + d) + power
        )
    }

    //% blockId=sbrick_start_measurement
    //% block="Start taking measurements on|channel %ch"
    export function sbrick_start_measurement(ch: Channel): void
    {
        control.raiseEvent(
            EVENT_SBRICK_CMD,
            0x2000 + 256*ch
        )
    }

    //% blockId=sbrick_stop_measurement
    //% block="Stop taking measurements on|channel %ch"
    export function sbrick_stop_measurement(ch: Channel): void
    {
        control.raiseEvent(
            EVENT_SBRICK_CMD,
            0x3000 + 256*ch
        )
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
            if (ch == Channel.A0) { // TODO: read port from SBrick
                measurement_value = control.eventValue() // TODO: read value from SBrick. 
                c()
            }
        })
    }
}
