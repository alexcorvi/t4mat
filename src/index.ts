import { Arguments } from "./interfaces/arguments";
import { differenceCalculator } from "./difference_calculator";
import { enDictionary } from "./dictionary";
import { factory } from "./factory";

const t4mat = function ({
	time,
	base = new Date().getTime(),
	format = "{R}",
	dictionary = enDictionary
}: Arguments) {

	let Base = factory(new Date(base).getTime());
	let Time = factory(new Date(time).getTime());

	let _r = differenceCalculator(Time, Base, dictionary);
	let _r_future = _r.value > 0;
	let _r_plural = Math.abs(_r.value) > 1;

	let R = `${_r_future ? (dictionary.indicators.future + " ") : ""}${Math.abs(_r.value)} ${_r_plural ? _r.unit[3] : _r.unit[1]}${_r_future ? "" : (" " + dictionary.indicators.past)}`;
	let RR = `${_r_future ? (dictionary.indicators.future + " ") : ""}${Math.abs(_r.value)} ${_r_plural ? _r.unit[2] : _r.unit[0]}${_r_future ? "" : (" " + dictionary.indicators.past)}`;

	let d = Time.day.toString();
	let dd = Time.day < 10 ? "0" + d.toString() : d;
	let D = dictionary.names.days[Time.dayOfTheWeek][1];
	let DD = dictionary.names.days[Time.dayOfTheWeek][0];
	let m = (Number(Time.month) + 1).toString();
	let mm = Time.month < 10 ? "0" + m.toString() : m;
	let M = dictionary.names.months[Time.month][1];
	let MM = dictionary.names.months[Time.month][0];
	let YYYY = Time.year.toString();
	let YY = Time.year.toString().substr(2);

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
		.replace(/{RR}/g, RR)
};

export default t4mat;

console.log(t4mat({
	time:new Date().getTime() - 90000000,
	format: "{D} {yy} {MM} {R}"
}));