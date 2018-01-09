// Auto-generated. Do not edit.
declare namespace sbrick {

    /**
     * Starts the SBrick service.
     */
    //% blockId=sbrick_startSbrickControlService block="SBrick control service" shim=sbrick::startSbrickControlService
    function startSbrickControlService(handler: () => void): void;

    /**
     * Drives
     */
    //% blockId=sbrick_drive block="Drive" shim=sbrick::drive
    function drive(port: number, power: number): void;

    /**
     * Brakes
     */
    //% blockId=sbrick_brake block="Brake" shim=sbrick::brake
    function brake(port: number, power: number): void;

    /**
     * Sets up measurement
     */
    //% blockId=sbrick_measure block="Start measurement" shim=sbrick::measure
    function measure(channel: number): void;

    /**
     * Invites an SBrick to connect
     */
    //% blockId=sbrick_connect block="Connect to SBrick" shim=sbrick::connect
    function connect(id: number): void;
}

// Auto-generated. Do not edit. Really.
