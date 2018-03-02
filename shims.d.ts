// Auto-generated. Do not edit.


    /**
     * Provides blocks to send events to SBricks
     * A micro:bit event value contains an SBrick command and parameters.
     * The most significant 4 bit is the command, the rest are the parameters.
     *
     * Events sent to SBrick:
     *
     * Brake: EVENT_SBRICK_CMD  | [4: 0] [3: Port] [9: n/a ]
     * Drive: EVENT_SBRICK_CMD  | [4: 1] [3: Port] [1: direction] [8: power]
     * Set m: EVENT_SBRICK_CMD  | [4: 2] [4: Channel] [8: compensation profile]
     * Clr m: EVENT_SBRICK_CMD  | [4: 3] [4: Channel] [8: n/a]
     *
     * Events received from SBrick:
     *
     * Connection established:  EVENT_SBRICK_RSP | [4: 0] [12: 0]
     * Signal complete:         EVENT_SBRICK_RSP | [4: 1] [12: 0]
     * Measurement data:        EVENT_SBRICK_ADC | [12: value] [4: channel]
     * 
     */

declare namespace sbrick {
}

// Auto-generated. Do not edit. Really.
