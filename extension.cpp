#include "pxt.h"
#include "SbrickControlService.h"

namespace sbrick {
    SbrickControlService* _pService = NULL;
    Action _handler;

    void updateTemperature() {
        while (NULL != _pService) {
            // run action that updates the temperature
            pxt::runAction0(_handler);
            // raise event to trigger notification
            MicroBitEvent ev(MICROBIT_ID_SENSOR_TEMPERATURE, MICROBIT_THERMOMETER_EVT_UPDATE);
            // wait period
            fiber_sleep(_pService->getPeriod());            
        }
    }

    /**
    * Starts the SBrick service.
    */
    //% blockId=sbrick_startSbrickControlService block="SBrick control service"
    void startSbrickControlService(Action handler) {
        if (NULL != _pService) return;

        _pService = new SbrickControlService(*uBit.ble);
        _handler = handler;
        pxt::incr(_handler);
        create_fiber(updateTemperature);
    }

    /**
    * Sets the current temperature value on the external temperature sensor
    */
    //% blockId=sbrick_drive block="Drive"
    void drive(int port, int power) {
    }

    //% blockId=sbrick_brake block="Brake"
    void brake(int port, int power) {
    }

    //% blockId=sbrick_measure block="Start measurement"
    void measure(int channel) {
    }

    //% blockId=sbrick_connect block="Connect to SBrick"
    void connect(char * id) {
    }
}
