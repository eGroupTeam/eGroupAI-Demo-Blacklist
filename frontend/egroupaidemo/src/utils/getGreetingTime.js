import moment from 'moment';

export default function getGreetingTime () {
	let gretting = '您好';
	
	const split_afternoon = 12 //24hr time to split the afternoon
	const split_evening = 17 //24hr time to split the evening
	const currentHour = parseFloat(moment().format("HH"));
	
	if(currentHour >= split_afternoon && currentHour <= split_evening) {
		gretting = "Good Afternoon";
	} else if(currentHour >= split_evening) {
		gretting = "Good Evening";
	} else {
		gretting = "Good Morning";
	}
	
	return gretting;
}