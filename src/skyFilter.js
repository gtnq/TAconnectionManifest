import parseDateString from "./parseDate";

function skyFilterInfo(string) {
	//match 4 digit number either start with AS or plain 4 digit number
	//also filter out Oct 01, 2023 10:57PM format using regex

	let flightRegex = /^\d{4}$/i;
	let dateRegex =
		/[A-Za-z]+ (0?[1-9]|[12][0-9]|3[01]), [A-Za-z0-9]+ (0?[0-9]|1[0-9]|2[0-3]):[0-9]+[A-Za-z]+/i;

	string = string.filter((item) => {
		return flightRegex.test(item) || dateRegex.test(item);
	});
	//keep unique
	string = [...new Set(string)];
	let result = [],
		parsedDate;
	for (let i = 0; i < string.length; i += 2) {
		//if the string is a date, parse it
		if (dateRegex.test(string[i + 1])) {
			parsedDate = parseDateString(string[i + 1]);
		} else {
			break;
		}

		//comparing with the previous pushed flight time, if its next day, dep element is true, else is false
		let isDeparture = false;
		if (i + 3 < string.length && dateRegex.test(string[i + 3])) {
			let nextDate = parseDateString(string[i + 3]);
			//console.log(nextDate.date, parsedDate.date)
			let timeDifference =
				new Date(nextDate.date) - new Date(parsedDate.date);
			let oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
			isDeparture = timeDifference >= oneDay;
		}
		

		result.push({
			flight: "SK" + string[i],
			date: parsedDate,
			dep: isDeparture,
		});
		

        if (!isDeparture) {
            let thirtyMin = 30 * 60 * 1000;  // 30 minutes in milliseconds
            let depTime = new Date(parsedDate.date + ' ' + parsedDate.time) - thirtyMin;
        	let depTimeObj = {
                    date: new Date(depTime).toDateString(),    
                    time: new Date(depTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                }
            result[result.length-1].dep = depTimeObj;
        }
		console.log(result[result.length-1])
	}
	return result;
}

export default skyFilterInfo;
