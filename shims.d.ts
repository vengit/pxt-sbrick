// Auto-generated. Do not edit.
declare namespace sbrick {

    /**
     * Starts the SBrick service.
     */
    //% blockId=sbrick_startSbrickControlService block="SBrick control service" shim=sbrick::startSbrickControlService
    function startSbrickControlService(handler: () => void): void;

    /**
     * Sets the current temperature value on the external temperature sensor
     */
    //% blockId=sbrick_drive block="Drive" shim=sbrick::drive
    function drive(port: number, power: number): void;
}

// Auto-generated. Do not edit. Really.
