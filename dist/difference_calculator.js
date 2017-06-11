"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function differenceCalculator(time, base, dictionary) {
    var results = [
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
    for (var index = 0; index < results.length; index++) {
        var result = results[index];
        if (Math.abs(result.value) < result.threshold) {
            return result;
        }
    }
    return results[results.length - 1];
}
exports.differenceCalculator = differenceCalculator;
