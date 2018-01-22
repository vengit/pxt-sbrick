// Auto-generated. Do not edit.


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
declare namespace sbrick {

    /**
     * Connect to an SBrick given a name hash
     */
    //% blockId=sbrick_connect
    //% block="Connect to an SBrick|named %n" shim=sbrick::connect
    function connect(n: string): void;

    /**
     * Called when an SBrick is successfully connected
     */
    //% blockId=sbrick_on_connected
    //% block="When an SBrick is successfully connected" shim=sbrick::onConnected
    function onConnected(handler: () => void): void;
}

// Auto-generated. Do not edit. Really.
