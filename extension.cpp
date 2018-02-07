#include "pxt.h"

using namespace pxt;

namespace sbrick {

    const uint16_t EVENT_SBRICK_CMD  = 0x300c;
    const uint16_t EVENT_SBRICK_FREQ = 0x300d;
    const uint16_t EVENT_SBRICK_RSP  = 0x300e;
    const uint16_t EVENT_SBRICK_ADC  = 0x300f;

    const uint16_t EVENT_VALUE_SBRICK_CONNECTED = 0x0000;

    enum class SBPort {
        A = 0,
        B = 2,
        C = 1,
        D = 3
    };

    enum class SBDirection {
        Forward = 0,
        Backward = 1
    };

    enum class SBDimension {
        X = 0,
        Y = 1,
        Z = 2
    };

    enum class SBConnectedDevice {
        //% block="Motor, Servo, or LED"
        Output                =  0,
        //% block="WeDo Motion Sensor"
        Wedo1Motion           =  1,
        //% block=" WeDo Tilt Sensor"
        Wedo1Tilt             =  2,
        //% block="Wedo 2 Motion Sensor (motion detection)"
        Wedo2MotionDetection  =  3,
        //% block="Wedo 2 Motion Sensor (counter)"
        Wedo2MotionCounter    =  4,
        //% block="WeDo 2 Tilt Sensor, X axis"
        Wedo2TiltX            =  5,
        //% block="WeDo 2 Tilt Sensor, Y axis"
        Wedo2TiltY            =  6,
        //% block="WeDo 2 Tilt Sensor, tilt"
        Wedo2Tilt             =  7,
        //% block="WeDo 2 Tilt Sensor, crash counter"
        Wedo2TiltCrash        =  8,
        //% block="NXT Touch Sensor"
        NXTTouch              =  9,
        //% block="NXT Light Sensor"
        NXTLight              = 10,
        //% block="EV3 Touch Sensor"
        EV3Touch              = 11,
        //% block="EV3 Infrared Sensor, distance"
        EV3InfraredDistance   = 12,
        //% block="EV3 Infrared Sensor, remote"
        EV3InfraredRemote     = 13,
        //% block="EV3 Ultrasonic Sensor, distance"
        EV3UltrasonicDistance = 14,
        //% block="EV3 Ultrasonic Sensor, listen"
        EV3UltrasonicListen   = 15,
        //% block="EV3 Gyroscope"
        EV3GyroAngle          = 16,
        //% block="EV3 Color Sensor, reflection"
        EV3ColorReflection    = 17,
        //% block="EV3 Color Sensor, ambient"
        EV3ColorAmbient       = 18,
        //% block="EV3 Color Sensor, color"
        EV3ColorColor         = 19,
        //% block="Boost Color Sensor"
        BoostColorColor       = 20,
        //% block="Boost Motor, position"
        BoostMotorPosition    = 21
    };

    int _measuredValue;
    SBPort _measuredPort;
    Action _measurementHandler;
    Action _connectedHandler;

    void _onConnected(MicroBitEvent e)
    {
        //if (NULL == _connectedHandler) return;
        pxt::runAction0(_connectedHandler);
    }

    void _onMeasurement(MicroBitEvent e)
    {
        //if (NULL == _measurementHandler) return;

        _measuredPort = (SBPort)((e.value & 0x000f) >> 1);
        _measuredValue = e.value >> 4;

        pxt::runAction0(_measurementHandler);
    }

    //% blockId=sbrick_connect
    //% block="connect to SBrick|%n"
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

    //% blockId=sbrick_on_connected
    //% block="on sbrick connected"
    void onConnected(Action handler)
    {
        _connectedHandler = handler;
        uBit.messageBus.listen(EVENT_SBRICK_RSP, EVENT_VALUE_SBRICK_CONNECTED, _onConnected);
    }

    //% blockId=sbrick_drive
    //% block="drive with|power %power|on port %p|in the direcion: %d"
    void drive(int power, SBPort p, SBDirection d)
    { 
        if (power < 0) {
            power = 0;
        }
        if (power > 255) {
            power = 255;
        }
        MicroBitEvent ev(EVENT_SBRICK_CMD, 0x1000 + 512 * (int)p + 256 * (int)d + power);
    }

    //% blockId=sbrick_drive_from_accel
    //% block="drive |port %p|with acceleration read across dimension %d"
    void driveFromAccel(SBPort p , SBDimension d)
    {
        int x = 0;
        
        switch (d) {
            case SBDimension::X:
                x = uBit.accelerometer.getX();
                break;
            case SBDimension::Y:
                x = uBit.accelerometer.getY();
                break;
            case SBDimension::Z:
                x = uBit.accelerometer.getZ();
                break;
        }
        x /= 2.77; // 0-1024 -> 45° -> 0-255

        if (x < 20 && x > -20) {
            x = 0;
        }

        if (x >= 0) {
            drive(x, p, SBDirection::Forward);
        }
        if (x < 0) {
            drive(-x, p, SBDirection::Backward);
        }
    }

    //% blockId=sbrick_brake
    //% block="brake on|port %p"
    void brake(SBPort p)
    {
        MicroBitEvent ev(EVENT_SBRICK_CMD, 0x0000 + 512 * (int)p);
    }

    //% blockId=sbrick_set_device
    //% block="use device|type %d|on port %p"
    void setDevice(SBConnectedDevice d, SBPort p)
    {
        if (d == SBConnectedDevice::Output) {
            MicroBitEvent ev(EVENT_SBRICK_CMD, 0x3000 + 256 * ((int)p * 2 + 1)); // Clear measurement
        } else {
            MicroBitEvent ev(EVENT_SBRICK_CMD, 0x2000 + 256 * ((int)p * 2 + 1)); // Set measurement
        }
    }

    //% blockId=sbrick_on_measurement
    //% block="on measurement"
    void onMeasurement(Action handler)
    {
        _measurementHandler = handler;
        uBit.messageBus.listen(EVENT_SBRICK_ADC, MICROBIT_EVT_ANY, _onMeasurement, MESSAGE_BUS_LISTENER_DROP_IF_BUSY);
    }

    //% blockId=sbrick_measured_value
    //% block="measured value"
    int measuredValue()
    {
        return _measuredValue;
    }

    //% blockId=sbrick_measured_port_is
    //% block="measured port is|%p"
    bool measuredPortIs(SBPort p)
    {
        return _measuredPort == p;
    }
}
