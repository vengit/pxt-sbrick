// Auto-generated. Do not edit.
declare namespace bluetooth {

    /**
     * Starts a custom sensor service. The handler must call ``setSensorTemperature`` 
     * to update the temperature sent to the service.
     */
    //% blockId=sbrick_startSbrickControlService
    //% block="SBrick control service" shim=bluetooth::startSbrickControlService
    function startSbrickControlService(handler: () => void): void;

    /**
     * Sets the current temperature value on the external temperature sensor
     */
    //% blockId=sbrick_setTemperatureSensorValue
    //% block="Dummy block" shim=bluetooth::setTemperatureSensorValue
    function setTemperatureSensorValue(temperature: number): void;
}

// Auto-generated. Do not edit. Really.
