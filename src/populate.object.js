export default function(obj){
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
}