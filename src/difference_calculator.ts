import { Dictionary } from "./interfaces/dictionary";
import { FactoryObject } from "./interfaces/factory_object";
export function differenceCalculator(time: FactoryObject, base: FactoryObject, dictionary: Dictionary) {
    const results = [
        {
            unit: dictionary.units.a,
            value: Math.round(time.seconds - base.seconds),
            threshold: 60,
        },
        {
            unit: dictionary.units.b,
            value: Math.round(time.minutes - base.minutes),
            threshold: 60,
        },
        {
            unit: dictionary.units.c,
            value: Math.round(time.hours - base.hours),
            threshold: 24,
        },
        {
            unit: dictionary.units.d,
            value: Math.round(time.days - base.days),
            threshold: 27,
        },
        {
            unit: dictionary.units.e,
            value: Math.round(time.weeks - base.weeks),
            threshold: 4,
        },
        {
            unit: dictionary.units.f,
            value: Math.round(time.months - base.months),
            threshold: 12,
        },
        {
            unit: dictionary.units.g,
            value: Math.round(time.years - base.years),
            threshold: Infinity,
        },
    ];
    for (let index = 0; index < results.length; index++) {
        let result = results[index];
        if (Math.abs(result.value) < result.threshold) {
            return result;
        }
    }
    return results[results.length - 1];
}