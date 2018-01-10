/**
 * Provides blocks to send events to SBricks
 */
//% color=190 weight=100 icon="\uf1ec" block="SBrick"
namespace sbrick {

    export const EVENT_SBRICK     = 12300
    export const EVENT_SBRICK_ADC = 12301

    export enum Port {
        A = 0,
        B = 2,
        C = 1,
        D = 4
    }

    export enum Direction {
        Forward = 0,
        Backward = 1
    }

    //% blockId=sbrick_connect
    //% block="Connect|Name %n"
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

    //% blockId=sbrick_drive
    //% block="Drive|Port %p|Direction %d|Power %power"
    export function sbrick_drive(p: Port, d: Direction, power: number): void
    { 
        control.raiseEvent(
            EVENT_SBRICK,
            256*(2*p+d) + power
        )
    }

    //% blockId=sbrick_brake
    //% block="Brake|Port %p"
    export function sbrick_brake(p: Port): void
    { }

    export function sbrick_start_measurement(p: Port): void
    {
    }

    export function sbrick_stop_measurement(p: Port): void
    {
    }

    //% blockId=sbrick_on_measurement
    //% block="On measurement"
    export function sbrick_on_measurement(c: () => void): void
    {
        control.onEvent(EVENT_SBRICK_ADC, 0, c)
    }
}
