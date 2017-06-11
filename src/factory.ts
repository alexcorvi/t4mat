import { FactoryObject } from "./interfaces/factory_object";

export function factory(mSeconds: number): FactoryObject {
    let seconds = mSeconds / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let weeks = days / 7;
    let months = days / 31;
    let years = months / 12;
    let dateObject = new Date(mSeconds);
    let day = dateObject.getDate();
    let dayOfTheWeek = dateObject.getDay();
    let month = dateObject.getMonth();
    let year = dateObject.getFullYear();
    return { mSeconds, seconds, minutes, hours, days, weeks, months, years, day, dayOfTheWeek, month, year };
}