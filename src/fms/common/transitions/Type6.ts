import { Transition } from ".";
import { AFLeg } from "../legs/AFLeg";
import { CDLeg } from "../legs/CDLeg";
import { CFLeg } from "../legs/CFLeg";
import { CILeg } from "../legs/CILeg";
import { DFLeg } from "../legs/DFLeg";
import { FALeg } from "../legs/FALeg";
import { FMLeg } from "../legs/FMLeg";
import { TFLeg } from "../legs/TFLeg";
import { VDLeg } from "../legs/VDLeg";
import { VILeg } from "../legs/VILeg";

export type Type6PreviousLeg = CDLeg | CFLeg | CILeg | DFLeg | TFLeg | VILeg | VDLeg;
export type Type6NextLeg = AFLeg | CFLeg | FALeg | FMLeg | TFLeg;

/**
 * A type VI transition is used to go to or from an AF leg
 */
export class Type6Transition extends Transition {
    constructor(
        previousLeg: Type6PreviousLeg,
        nextLeg: Type6NextLeg,
    ) {
        super()
    }
}
