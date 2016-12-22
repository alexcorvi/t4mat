import normalizer from "./argument.normalize.js";
import populateDateObject from "./populate.object.js";
import differenceCalculator from "./difference.calculator.js";
import Numeral2Literal from "./numeral2literal.js";

export default function (obj) {
	obj = normalizer(obj);
	var PassedTimeObject = populateDateObject({mseconds:obj.t1});
	var CurrentTimeObject = populateDateObject({mseconds:obj.t2});	
	var ResultsObj = {};
	var DifferenceArr = differenceCalculator(CurrentTimeObject,PassedTimeObject);
	DifferenceArr.forEach((unit)=>{
		if(Math.abs(unit.value) < unit.threshold && (!ResultsObj.R)) {
			ResultsObj.R = `${unit.value < 0?"in ":""}${Math.abs(unit.value)} ${unit.U}${Math.abs(unit.value)>1?"s":""}${unit.value > 0?" ago":""}`;
			ResultsObj.RR = `${unit.value < 0?"in ":""}${Math.abs(unit.value)} ${unit.UU}${Math.abs(unit.value)>1?"s":""}${unit.value > 0?" ago":""}`;
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