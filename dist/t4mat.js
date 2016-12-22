(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.t4mat = factory());
}(this, (function () { 'use strict';

var normalizer = function (obj){
	// normalize
	// A. Normalize object => variables
	var t1 = obj.t1 || obj.time1 || obj.t || obj.time;
	var t2 = obj.t2 || obj.time2;

	// B. Normalize those variables to ms
	t1 = normalizeT(t1);
	t2 = normalizeT(t2);

	function normalizeT(t){
		if(typeof t === "string" || typeof t === "number") { t = new Date(t).getTime(); }
		else if (typeof t === "object" && t !== null) { t = t.getTime(); }
		else { t = new Date().getTime(); }
		return t;
	}

	return {
		t1:t1,
		t2:t2,
		format:typeof obj.format === "string" ? obj.format : "{R}",
	}
};

var populateDateObject = function(obj){
	obj.seconds = obj.mseconds/1000;
	obj.minutes = obj.seconds/60;
	obj.hours = obj.minutes/60;
	obj.days = obj.hours/24;
	obj.weeks = obj.days/7;
	obj.months = obj.days/31;
	obj.years = obj.months/12;

	obj.day = new Date(obj.mseconds).getDate();
	obj.dayOfTheWeek = new Date(obj.mseconds).getDay();
	obj.month = new Date(obj.mseconds).getMonth();
	obj.year = new Date(obj.mseconds).getFullYear();
	return obj;
};

var differenceCalculator = function(CurrentTimeObject,PassedTimeObject){
	return [
		{
			UU:"second",
			U:"sec",
			value: Math.round(CurrentTimeObject.seconds - PassedTimeObject.seconds),
			threshold:60,
		},
		{
			UU:"minute",
			U:"min",
			value: Math.round(CurrentTimeObject.minutes - PassedTimeObject.minutes),
			threshold:60,
		},
		{
			UU:"hour",
			U:"hr",
			value: Math.round(CurrentTimeObject.hours - PassedTimeObject.hours),
			threshold:24,
		},
		{
			UU:"day",
			U:"day",
			value: Math.round(CurrentTimeObject.days - PassedTimeObject.days),
			threshold:27,
		},
		{
			UU:"week",
			U:"week",
			value: Math.round(CurrentTimeObject.weeks - PassedTimeObject.weeks),
			threshold:4,
		},
		{
			UU:"month",
			U:"month",
			value: Math.round(CurrentTimeObject.months - PassedTimeObject.months),
			threshold:12,
		},
		{
			UU:"year",
			U:"yr",
			value: Math.round(CurrentTimeObject.years - PassedTimeObject.years),
			threshold:Infinity,
		} ];
};

var Numeral2Literal = {
	days: [
		{T:"Sunday",    TT:"Sun."},
		{T:"Monday",    TT:"Mon."},
		{T:"Tuesday",  TT:"Tue."},
		{T:"Wednesday", TT:"Wed."},
		{T:"Thursday",  TT:"Thu."},
		{T:"Friday",    TT:"Fri."},
		{T:"Saturday",  TT:"Sat."} ],
	months: [
		{T:"January",   TT:"Jan."},
		{T:"February",  TT:"Feb."},
		{T:"March",    TT:"Mar."},
		{T:"April",     TT:"Apr."},
		{T:"May",       TT:"May"},
		{T:"June",      TT:"Jun."},
		{T:"July",      TT:"Jul."},
		{T:"August",    TT:"Aug."},
		{T:"September", TT:"Sep."},
		{T:"October",   TT:"Oct."},
		{T:"November",  TT:"Nov."},
		{T:"December",  TT:"Dec."} ]
};

var index = function (obj) {
	obj = normalizer(obj);
	var PassedTimeObject = populateDateObject({mseconds:obj.t1});
	var CurrentTimeObject = populateDateObject({mseconds:obj.t2});	
	var ResultsObj = {};
	var DifferenceArr = differenceCalculator(CurrentTimeObject,PassedTimeObject);
	DifferenceArr.forEach(function (unit){
		if(Math.abs(unit.value) < unit.threshold && (!ResultsObj.R)) {
			ResultsObj.R = "" + (unit.value < 0?"in ":"") + (Math.abs(unit.value)) + " " + (unit.U) + (Math.abs(unit.value)>1?"s":"") + (unit.value > 0?" ago":"");
			ResultsObj.RR = "" + (unit.value < 0?"in ":"") + (Math.abs(unit.value)) + " " + (unit.UU) + (Math.abs(unit.value)>1?"s":"") + (unit.value > 0?" ago":"");
		}
		DifferenceArr = [];
	});

	ResultsObj.d = PassedTimeObject.day;
	ResultsObj.dd = PassedTimeObject.day < 10 ? "0" + ResultsObj.d.toString() : ResultsObj.dd = ResultsObj.d;
	ResultsObj.D = Numeral2Literal.days[PassedTimeObject.dayOfTheWeek-1].TT;
	ResultsObj.DD = Numeral2Literal.days[PassedTimeObject.dayOfTheWeek-1].T;
	ResultsObj.m = Number(PassedTimeObject.month) + 1;
	ResultsObj.mm = PassedTimeObject.month < 10 ? "0" + ResultsObj.m.toString() : ResultsObj.mm = ResultsObj.m;
	ResultsObj.M = Numeral2Literal.months[PassedTimeObject.month].TT;
	ResultsObj.MM = Numeral2Literal.months[PassedTimeObject.month].T;
	ResultsObj.YYYY = PassedTimeObject.year.toString();
	ResultsObj.YY = ResultsObj.YYYY.substr(2);
	
	return obj.format
	.split('{d}').join(ResultsObj.d)
	.split('{dd}').join(ResultsObj.dd)
	.split('{D}').join(ResultsObj.D)
	.split('{DD}').join(ResultsObj.DD)
	.split('{m}').join(ResultsObj.m)
	.split('{mm}').join(ResultsObj.mm)
	.split('{M}').join(ResultsObj.M)
	.split('{MM}').join(ResultsObj.MM)
	.split('{Y}').join(ResultsObj.YY)
	.split('{y}').join(ResultsObj.YY)
	.split('{yy}').join(ResultsObj.YY)
	.split('{YY}').join(ResultsObj.YY)
	.split('{yyy}').join(ResultsObj.YYYY)
	.split('{YYY}').join(ResultsObj.YYYY)
	.split('{yyyy}').join(ResultsObj.YYYY)
	.split('{YYYY}').join(ResultsObj.YYYY)
	.split('{r}').join(ResultsObj.R)
	.split('{R}').join(ResultsObj.R)
	.split('{rr}').join(ResultsObj.RR)
	.split('{RR}').join(ResultsObj.RR);
};

return index;

})));
