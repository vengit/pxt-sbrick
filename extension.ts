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

//% color=#e84a24 weight=100 icon="\uf11b" block="SBrick"
namespace sbrick {

    //% blockId=sbrick_connect
    //% block="connect to SBrick|%n" shim=sbrick::connect
    export function connect(n: string): void
    {
        return
    }

    //% blockId=sbrick_on_connected
    //% block="on sbrick connected" shim=sbrick::onConnected
    export function onConnected(handler: () => void): void
    {
        return
    }

    //% blockId=sbrick_drive
    //% block="drive with|power %power|on port %p|in the direcion: %d" shim=sbrick::drive
    export function drive(power: number, p: SBPort, d: SBDirection): void
    { 
        return
    }

    //% blockId=sbrick_drive_from_accel
    //% block="drive |port %p|with acceleration read across dimension %d" shim=sbrick::driveFromAccel
    export function driveFromAccel(p: SBPort, d: SBDimension): void
    {
        return
    }

    //% blockId=sbrick_brake
    //% block="brake on|port %p" shim=sbrick::brake
    export function brake(p: SBPort): void
    {
        return
    }

    //% blockId=sbrick_set_device
    //% block="use device|type %d|on port %p" shim=sbrick::setDevice
    export function setDevice(d: SBConnectedDevice, p: SBPort): void
    {
        return
    }

    //% blockId=sbrick_on_measurement
    //% block="on measurement" shim=sbrick::onMeasurement
    export function onMeasurement(handler: () => void): void
    {
        return
    }

    //% blockId=sbrick_measured_value
    //% block="measured value" shim=sbrick::measuredValue
    export function measuredValue(): number
    {
        return 0
    }

    //% blockId=sbrick_measured_port_is
    //% block="measured port is|%p" shim=sbrick::measuredPortIs
    export function measuredPortIs(p: SBPort): boolean
    {
        return false
    }
}
