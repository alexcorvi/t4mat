import { Dictionary } from "./interfaces/dictionary";

export const enDictionary: Dictionary = {
    units: {
        a: ["second", "sec", "seconds", "secs"],
        b: ["minute", "min", "minutes", "mins"],
        c: ["hour", "hr", "hours", "hrs"],
        d: ["day", "day", "days", "days"],
        e: ["week", "week", "weeks", "weeks"],
        f: ["month", "month", "months", "months"],
        g: ["year", "yr", "years", "yrs"]
    },
    names: {
        days: [
            ["Sunday", "Sun"],
            ["Monday", "Mon"],
            ["Tuesday", "Tue"],
            ["Wednesday", "Wed"],
            ["Thursday", "Thu"],
            ["Friday", "Fri"],
            ["Saturday", "Sat"],
        ],
        months: [
            ["January", "Jan"],
            ["February", "Feb"],
            ["March", "Mar"],
            ["April", "Apr"],
            ["May", "May"],
            ["June", "Jun"],
            ["July", "Jul"],
            ["August", "Aug"],
            ["September", "Sep"],
            ["October", "Oct"],
            ["November", "Nov"],
            ["December", "Dec"],
        ]
    },
    indicators: {
        past: "ago",
        future: "in"
    }
};