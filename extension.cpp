#include "pxt.h"

using namespace pxt;

namespace sbrick {

    const uint16_t EVENT_SBRICK_CMD  = 0x300c;
    const uint16_t EVENT_SBRICK_FREQ = 0x300d;
    const uint16_t EVENT_SBRICK_RSP  = 0x300e;
    const uint16_t EVENT_SBRICK_ADC  = 0x300f;

    const uint16_t EVENT_VALUE_SBRICK_CONNECTED = 0x0000;

    /* e n um P ort {
        A = 0,
        B = 2,
        C = 1,
        D = 3
    };

    en u m D i r ection {
        Forward = 0,
        Backward = 1
    }; */

    int _measuredValue;
    int _measuredPort;
    Action _measurementHandler;
    Action _connectedHandler;

    //% blockId=sbrick_connect
    //% block="Connect to an SBrick|named %n"
    void connect(StringData * n)
    {
        uint8_t tx_power_level = 7;
        const int8_t CALIBRATED_POWERS[] = {-49, -37, -33, -28, -25, -20, -15, -10};

        uint32_t hash = 0;
        for (uint8_t i = 0; i < n->len; i++) {
            hash = ((hash << 5) - hash) + n->data[i];
        }

        char ns[]  = {0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x98};
        char ins[] = {0x00, 0x00, (char)((hash >> 24) & 0xff), (char)((hash >> 16) & 0xff), (char)((hash >> 8) & 0xff), (char)((hash >> 0) & 0xff)};

        uBit.bleManager.advertiseEddystoneUid(ns, ins, CALIBRATED_POWERS[tx_power_level - 1], true, MICROBIT_BLE_EDDYSTONE_ADV_INTERVAL);
        uBit.bleManager.setTransmitPower(tx_power_level);
    }

    //% blockId=sbrick_measured_value
    //% block="Measured value"
    int measuredValue()
    {
        return _measuredValue;
    }

    //% blockId=sbrick_measured_port
    //% block="Measured port"
    int measuredPort()
    {
        return _measuredPort;
    }

    void _onMeasurement(MicroBitEvent e)
    {
        //if (NULL == _measurementHandler) return;

        _measuredPort = ((e.value & 0x000f) >> 1);
        _measuredValue = e.value >> 4;

        pxt::runAction0(_measurementHandler);
    }

    //% blockId=sbrick_on_measurement
    //% block="On voltage measurement"
    void onMeasurement(Action handler)
    {
        _measurementHandler = handler;
        uBit.messageBus.listen(EVENT_SBRICK_ADC, MICROBIT_EVT_ANY, _onMeasurement);
    }

    //% blockId=sbrick_start_measurement
    //% block="Start taking measurements on|port %p"
    void startMeasurement(int p)
    {
        MicroBitEvent ev(EVENT_SBRICK_CMD, 0x2000 + 256 * (p * 2 + 1));
    }

    //% blockId=sbrick_stop_measurement
    //% block="Stop taking measurements on|channel %ch"
    void stopMeasurement(int p)
    {
        MicroBitEvent ev(EVENT_SBRICK_CMD, 0x3000 + 256 * (p * 2 + 1));
    }

    //% blockId=sbrick_brake
    //% block="Brake on|port %p"
    void brake(int p)
    {
        MicroBitEvent ev(EVENT_SBRICK_CMD, 0x0000 + 512 * p);
    }

    //% blockId=sbrick_drive
    //% block="Apply|power %power|on port %p|in the direcion: %d"
    void drive(int power, int p, int d)
    { 
        MicroBitEvent ev(EVENT_SBRICK_CMD, 0x1000 + 512 * p + 256 * d + power);
    }

    //% blockId=sbrick_set_frequency
    //% block="Set the SBrick's PWM frequency register to|%t1cc0h"
    void setFrequency(int t1cc0h)
    {
        MicroBitEvent ev(EVENT_SBRICK_FREQ, t1cc0h);
    }

    void _onConnected(MicroBitEvent e)
    {
        //if (NULL == _connectedHandler) return;
        pxt::runAction0(_connectedHandler);
    }

    //% blockId=sbrick_on_connected
    //% block="When an SBrick is successfully connected"
    void onConnected(Action handler)
    {
        _connectedHandler = handler;
        uBit.messageBus.listen(EVENT_SBRICK_RSP, EVENT_VALUE_SBRICK_CONNECTED, _onConnected);
    }

    //% blockId=sbrick_drive_from_accel
    //% block="Drive |port %p|with acceleration read across dimension %d"
    void driveFromAccel(int p , int d)
    {
        int x = 0;
        
        switch (d) {
            case 0:
                x = uBit.accelerometer.getX();
                break;
            case 1:
                x = uBit.accelerometer.getY();
                break;
            case 2:
                x = uBit.accelerometer.getZ();
                break;
        }
        x /= 4;

        if (x > 255) {
          x = 255;
        }
        if (x < -255) {
          x = -255;
        }
        if (x < 20 && x > -20) {
            x = 0;
        }

        if (x >= 0) {
            drive(x, p, 0);
        }
        if (x < 0) {
            drive(-x, p, 1);
        }
    }

}
