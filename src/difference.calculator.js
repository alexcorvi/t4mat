export default function(CurrentTimeObject,PassedTimeObject){
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
		},
	];
}