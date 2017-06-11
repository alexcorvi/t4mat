import { Dictionary } from "./interfaces/dictionary";
import { FactoryObject } from "./interfaces/factory_object";
export declare function differenceCalculator(time: FactoryObject, base: FactoryObject, dictionary: Dictionary): {
    unit: string[];
    value: number;
    threshold: number;
};
