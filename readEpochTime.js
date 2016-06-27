    function readableDate(t,format) {
        
        var defaultFormat = "auto:[s]+[D] [m]/[yyyy]"
        
        /**
         * 
         * The format
         * 
         * Things that are decided here:
         * - Order of units
         *      Just by placing the d before the m or the D before the M you decide the order
         * 
         * - Seperator between units
         *      Using the forward slash (/) between the D and the M will make it as a seperator
         * 
         * - format (formal like 1/1/1970 or social like 9 seconds ago)
         *      by using the Ds and the Ms you make it formal, but by placing the S you will make it social
         *      both formats can also be mixed like ([D]/[mm]/[YYYY] (S)) => will give you Sat. May 05/1996 (20 yrs ago) 
         * 
         * - whether you want units to be short or long (explanation below)
         * - whether you want units to be literal on numerical (explanation below)
         * 
         * incase 1/1/2016
         * 
         * [d]: 1
         * [dd]: 01
         * [D]: Fri.
         * [DD]: Friday.
         * [m]: 1
         * [mm]: 01
         * [M]: Jan.
         * [MM]: January
         * [Y]: 16
         * [y]: 16 (same)
         * [YY]: 16 (same)
         * [yy]: 16 (same)
         * [YYY]: 2016 (same)
         * [YYYY]:2016 (same)
         * [yyy]: 2016 (same)
         * [yyyy]: 2016 (same)
         * [s]: 6 mins ago
         * [S]: 6 mins ago
         * [ss]: 6 minutes ago
         * [SS]: 6 minutes ago
         * 
         * Note that the letters has to be enclosed in brackets
         * 
         * 
         * Note: you can also set the format to be "auto", which means it will automatically
         * decide whether the result will be expressed in social or formal format.
         * This can be done like this: (auto:ss+d/M/yy)
         * if the time difference between now and the
         * value passed is less than one day, then
         * the social format will be used, otherwise
         * the formal format will be used.
         * 
        **/
        
        // if no format has been passed then use the default one
        if (typeof format !== "string") format = defaultFormat;
        
        
        // current time data
        var CTD = {};
        
        // how may time units has passed (ends with S)
        CTD.mseconds    = new Date().getTime();
        CTD.seconds     = CTD.mseconds/1000;
        CTD.minutes     = Math.round(CTD.seconds/60);
        CTD.hours       = Math.round(CTD.minutes/60);
        CTD.days        = Math.round(CTD.hours/24);
        CTD.weeks       = Math.round(CTD.days/7);
        CTD.months      = Math.round(CTD.days/31);
        CTD.years      = Math.round(CTD.months/12);
        
        // passed time data (passed to this function)
        var PTD = {};
        // how may time units has passed (ends with S)
        PTD.mseconds    = t;
        PTD.seconds     = PTD.mseconds/1000;
        PTD.minutes     = Math.round(PTD.seconds/60);
        PTD.hours       = Math.round(PTD.minutes/60);
        PTD.days        = Math.round(PTD.hours/24);
        PTD.weeks       = Math.round(PTD.days/7);
        PTD.months      = Math.round(PTD.days/31);
        PTD.years      = Math.round(PTD.months/12);
        // passed date (month, day, year) (doesn't end with S)
        PTD.day = new Date(PTD.mseconds).getDate();
        PTD.dayOfTheWeek = new Date(PTD.mseconds).getDay();
        PTD.month = new Date(PTD.mseconds).getMonth();
        PTD.year = new Date(PTD.mseconds).getFullYear();
        
        // differnce between the two, as an array
        var DArr = [
            {
                U:"second",
                TU:"sec",
                value: CTD.seconds - PTD.seconds,
                threshold:60,
            },
            {
                U:"minute",
                TU:"min",
                value: CTD.minutes - PTD.minutes,
                threshold:60,
            },
            {
                U:"hour",
                TU:"hr",
                value: CTD.hours - PTD.hours,
                threshold:24,
            },
            {
                U:"day",
                TU:"day",
                value: CTD.days - PTD.days,
                threshold:27,
            },
            {
                U:"week",
                TU:"week",
                value: CTD.weeks - PTD.weeks,
                threshold:4,
            },
            {
                U:"month",
                TU:"month",
                value: CTD.months - PTD.months,
                threshold:12,
            },
            {
                U:"year",
                TU:"yr",
                value: CTD.years - PTD.years,
                threshold:9999999999999999999,
            },
        ];
        
        // Numeral to literal
        var N2L = {
            days: [
                {T:"Sunday",    TT:"Sun."},
                {T:"Monday",    TT:"Mon."},
                {T:"Tuesday.",  TT:"Tue."},
                {T:"Wednesday", TT:"Wed."},
                {T:"Wednesday", TT:"Wed."},
                {T:"Thursday",  TT:"Thu."},
                {T:"Friday",    TT:"Fri."},
                {T:"Saturday",  TT:"Sat."},
            ],
            months: [
                {T:"January",   TT:"Jan."},
                {T:"February",  TT:"Feb."},
                {T:"March.",    TT:"Mar."},
                {T:"April",     TT:"Apr."},
                {T:"May",       TT:"May"},
                {T:"June",      TT:"Jun."},
                {T:"July",      TT:"Jul."},
                {T:"August",    TT:"Aug."},
                {T:"September", TT:"Sep."},
                {T:"October",   TT:"Oct."},
                {T:"November",  TT:"Nov."},
                {T:"December",  TT:"Dec."},
            ]
        };
        
        // result object
        var RO = {
            S:"",
            SS:"",
            d:"",
            dd:"",
            D:"",
            DD:"",
            m:"",
            mm:"",
            M:"",
            MM:"",
            YY:"",
            YYYY:"",
        };
        
        
        // getting the social values (long and short versions)
        for (var i = 0; i < DArr.length; i++) {
            if(DArr[i]["value"] < DArr[i]["threshold"]) {
                RO.SS = DArr[i]["value"] + " ";
                RO.SS = RO.SS + DArr[i]["U"];
                if(DArr[i]["value"] > 1) {
                    RO.SS = RO.SS + "s";
                }
                RO.SS = RO.SS + " ago";
                RO.S = RO.SS.replace(DArr[i]["U"],DArr[i]["TU"]);
                break;
            }
        }
        
        // the formal values
        RO.d = PTD.day;
        if (PTD.day < 10) RO.dd = "0" + RO.d.toString();
        else RO.dd = RO.d;
        
        RO.m = Number(PTD.month) + 1;
        if (PTD.month < 10) RO.mm = "0" + RO.m.toString();
        else RO.mm = RO.m;
        
        RO.D = N2L.days[PTD.dayOfTheWeek].TT;
        RO.DD = N2L.days[PTD.dayOfTheWeek].T;
        
        RO.M = N2L.months[PTD.month].TT;
        RO.MM = N2L.months[PTD.month].T;
        
        RO.YYYY = PTD.year.toString();
        RO.YY = RO.YYYY.substr(2);
        
        
        if(format.indexOf("auto:") === 0) {
            var S_StartingIndex = format.indexOf(":");
            var F_StartingIndex = format.indexOf("+");
            
            if(S_StartingIndex > -1 && F_StartingIndex > -1) {
                if(DArr[3]["value"] === 0) format = format.substring(S_StartingIndex+1,F_StartingIndex);
                else format = format.substring(F_StartingIndex+1);
            } else {
                format = defaultFormat;
            }
        }
        
        // do the replacements, starting from more lengthy ones
        format = format.replace("[yyyy]",RO.YYYY);
        format = format.replace("[YYYY]",RO.YYYY);
        format = format.replace("[yyy]",RO.YYYY);
        format = format.replace("[YYY]",RO.YYYY);
        
        format = format.replace("[YY]",RO.YY);
        format = format.replace("[yy]",RO.YY);
        format = format.replace("[Y]",RO.YY);
        format = format.replace("[y]",RO.YY);
        
        format = format.replace("[ss]",RO.SS);
        format = format.replace("[SS]",RO.SS);
        format = format.replace("[S]",RO.S);
        format = format.replace("[s]",RO.S);
        
        format = format.replace("[MM]",RO.MM);
        format = format.replace("[mm]",RO.mm);
        format = format.replace("[M]",RO.M);
        format = format.replace("[m]",RO.m);
        
        format = format.replace("[DD]",RO.DD);
        format = format.replace("[dd]",RO.dd);
        format = format.replace("[D]",RO.D);
        format = format.replace("[d]",RO.d);
        
        return format;
    }