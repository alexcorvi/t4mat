"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var difference_calculator_1 = require("./difference_calculator");
var dictionary_1 = require("./dictionary");
var factory_1 = require("./factory");
var t4mat = function (_a) {
    var time = _a.time, _b = _a.base, base = _b === void 0 ? new Date().getTime() : _b, _c = _a.format, format = _c === void 0 ? "{R}" : _c, _d = _a.dictionary, dictionary = _d === void 0 ? dictionary_1.enDictionary : _d;
    var Base = factory_1.factory(new Date(base).getTime());
    var Time = factory_1.factory(new Date(time).getTime());
    var _r = difference_calculator_1.differenceCalculator(Time, Base, dictionary);
    var _r_future = _r.value > 0;
    var _r_plural = Math.abs(_r.value) > 1;
    var R = "" + (_r_future ? (dictionary.indicators.future + " ") : "") + Math.abs(_r.value) + " " + (_r_plural ? _r.unit[3] : _r.unit[1]) + (_r_future ? "" : (" " + dictionary.indicators.past));
    var RR = "" + (_r_future ? (dictionary.indicators.future + " ") : "") + Math.abs(_r.value) + " " + (_r_plural ? _r.unit[2] : _r.unit[0]) + (_r_future ? "" : (" " + dictionary.indicators.past));
    var d = Time.day.toString();
    var dd = Time.day < 10 ? "0" + d.toString() : d;
    var D = dictionary.names.days[Time.dayOfTheWeek][1];
    var DD = dictionary.names.days[Time.dayOfTheWeek][0];
    var m = (Number(Time.month) + 1).toString();
    var mm = Time.month < 10 ? "0" + m.toString() : m;
    var M = dictionary.names.months[Time.month][1];
    var MM = dictionary.names.months[Time.month][0];
    var YYYY = Time.year.toString();
    var YY = Time.year.toString().substr(2);
    return format
        .replace(/{d}/g, d)
        .replace(/{dd}/g, dd)
        .replace(/{D}/g, D)
        .replace(/{DD}/g, DD)
        .replace(/{m}/g, m)
        .replace(/{mm}/g, mm)
        .replace(/{M}/g, M)
        .replace(/{MM}/g, MM)
        .replace(/{Y}/g, YY)
        .replace(/{y}/g, YY)
        .replace(/{yy}/g, YY)
        .replace(/{YY}/g, YY)
        .replace(/{yyy}/g, YYYY)
        .replace(/{YYY}/g, YYYY)
        .replace(/{yyyy}/g, YYYY)
        .replace(/{YYYY}/g, YYYY)
        .replace(/{r}/g, R)
        .replace(/{R}/g, R)
        .replace(/{rr}/g, RR)
        .replace(/{RR}/g, RR);
};
exports.default = t4mat;
console.log(t4mat({
    time: new Date().getTime() - 90000000,
    format: "{D} {yy} {MM} {R}"
}));
