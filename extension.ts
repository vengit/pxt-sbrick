/**
* Provides blocks to send events to SBricks
* A micro:bit event value contains an SBrick command and parameters.
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

    //% blockId=sbrick_connect
    //% block="Connect to an SBrick|named %n" shim=sbrick::connect
    export function connect(n: string): void
    {
        return
    }

    //% blockId=sbrick_on_connected
    //% block="When an SBrick is successfully connected" shim=sbrick::onConnected
    export function onConnected(handler: () => void): void
    {
        return
    }

    //% blockId=sbrick_measured_value
    //% block="Measured value" shim=sbrick::measuredValue
    export function measuredValue(): number
    {
        return 0
    }

    //% blockId=sbrick_measured_port
    //% block="Measured port" shim=sbrick::measuredPort
    export function measuredPort(): number
    {
        return 0
    }

    //% blockId=sbrick_on_measurement
    //% block="On voltage measurement" shim=sbrick::onMeasurement
    export function onMeasurement(handler: () => void): void
    {
        return
    }

    //% blockId=sbrick_start_measurement
    //% block="Start taking measurements on|port %p"
    export function startMeasurement(p: number): void
    {
        return
    }

    //% blockId=sbrick_stop_measurement
    //% block="Stop taking measurements on|channel %ch"
    export function stopMeasurement(p: number): void
    {
        return
    }

    //% blockId=sbrick_brake
    //% block="Brake on|port %p"
    export function brake(p: number): void
    {
        return
    }

    //% blockId=sbrick_drive
    //% block="Apply|power %power|on port %p|in the direcion: %d"
    export function drive(power: number, p: number, d: number): void
    { 
        return
    }

    //% blockId=sbrick_set_frequency
    //% block="Set the SBrick's PWM frequency register to|%t1cc0h"
    export function setFrequency(t1cc0h: number): void
    {
        return
    }

    
    //% blockId=sbrick_drive_from_accel
    //% block="Drive |port %p|with acceleration read across dimension %d"
    export function driveFromAccel(p: number, d: number): void
    {
        return
    }
}
