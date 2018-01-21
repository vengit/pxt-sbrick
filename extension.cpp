#include "pxt.h"

using namespace pxt;

//% color=190 weight=100 icon="\uf1ec" block="SBrick"
namespace sbrick {

    /**
    * Connect to an SBrick given a name hash
    */
    //% blockId=sbrick_connect
    //% block="Connect to an SBrick|named %n"
    void sbrick_connect(StringData * n)
    {
        uint8_t tx_power_level = 7;
        const int8_t CALIBRATED_POWERS[] = {-49, -37, -33, -28, -25, -20, -15, -10};

        uint32_t hash = 0;

        /*for (uint8_t i = 0; i < n->len; i++) {
            hash = ((hash << 5) - hash) + n->data[i];
        }*/

        char ns[]  = {0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x98};
        char ins[] = {0x00, 0x00, (char)(hash & 0xff), (char)((hash >> 8) & 0xff), (char)((hash >> 16) & 0xff), (char)((hash >> 24) & 0xff)};

        uBit.bleManager.advertiseEddystoneUid(ns, ins, CALIBRATED_POWERS[tx_power_level - 1], true, MICROBIT_BLE_EDDYSTONE_ADV_INTERVAL);
        uBit.bleManager.setTransmitPower(tx_power_level);
    }

}
