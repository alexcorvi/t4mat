"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function factory(mSeconds) {
    var seconds = mSeconds / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var weeks = days / 7;
    var months = days / 31;
    var years = months / 12;
    var dateObject = new Date(mSeconds);
    var day = dateObject.getDate();
    var dayOfTheWeek = dateObject.getDay();
    var month = dateObject.getMonth();
    var year = dateObject.getFullYear();
    return { mSeconds: mSeconds, seconds: seconds, minutes: minutes, hours: hours, days: days, weeks: weeks, months: months, years: years, day: day, dayOfTheWeek: dayOfTheWeek, month: month, year: year };
}
exports.factory = factory;
