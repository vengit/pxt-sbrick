#include "pxt.h"

using namespace pxt;

namespace sbrick {

    //% blockId=sbrick_connect
    //% block="Connect to an SBrick|called %n"
    void sbrick_connect(char * n)
    {
        uint8_t tx_power_level = 7;
        const int8_t CALIBRATED_POWERS[] = {-49, -37, -33, -28, -25, -20, -15, -10};

        uint32_t hash = 0;

        for (uint8_t i = 0; i < strlen(n); i++) {
            hash = ((hash << 5) - hash) + n[i];
        }

        char ns[]  = {0x98,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};
        char ins[] = {(char)(hash & 0xff), 0x00, 0x00, 0x00, 0x00, 0x00};

        uBit.bleManager.advertiseEddystoneUid(ns, ins, CALIBRATED_POWERS[tx_power_level - 1], true);
        uBit.bleManager.setTransmitPower(tx_power_level);
    }

}
