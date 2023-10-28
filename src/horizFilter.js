import parseDate from "./parseDate.js";

function horizFilterInfo(data) {
	// console.log(data)
	// Regular expressions
	const flightRegex = /^AS\d{4}$/;
	const dateRegex =
		/((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}, \d{4})/
	const timeRegex = /\d{1,2}:\d{2}(AM|PM)$/i;
	const fullDateRegex =
		/[A-Za-z]+ (0?[1-9]|[12][0-9]|3[01]), [A-Za-z0-9]+ (0?[0-9]|1[0-9]|2[0-3]):[0-9]+[A-Za-z]+/i;

	// Filter data based on regex patterns
	const filteredData = data.filter(
		(item) =>
			flightRegex.test(item) ||
			dateRegex.test(item) ||
			timeRegex.test(item) ||
			fullDateRegex.test(item)
	);

	//console.log(filteredData)
    let info = {
        flight: null,
        date: null,
        dep: true
    }
    let parsedDate,
			date,
			time,
			forfix,
			convertDate,
			convertTime;
	let result = [];
	for (let i = 0; i < filteredData.length; i++) {
		
		//console.log(flightRegex.test(filteredData[i]))
		if (flightRegex.test(filteredData[i])) {
			info.flight = filteredData[i];
		} else if (fullDateRegex.test(filteredData[i])) {
			convertDate = filteredData[i].match(dateRegex);
			convertTime = filteredData[i].match(timeRegex);
			//console.log(convertDate, convertTime, 'full date regex check')

			convertTime = convertTo24Hour(convertTime[0]);

			forfix = convertDate[0] + " " + convertTime;

			parsedDate = parseDate(forfix);
			info.date = parsedDate;
		} else if (dateRegex.test(filteredData[i])) {
			// console.log(filteredData[i],'date regex check')
            //console.log('date added')
			date = filteredData[i];
		} else if (timeRegex.test(filteredData[i])) {
            //console.log('time added')
			// console.log(filteredData[i],'time regex check')

			time = filteredData[i];
		}
        // console.log(date, time, 'after check')
		if (date && time) {
			//console.log(time)
			time = convertTo24Hour(time);
			//console.log(time,'updated')
			forfix = date + " " + time;
			parsedDate = parseDate(forfix);
			info.date = parsedDate;
			date = null;
			time = null;
			// console.log(info)
		}
		//console.log(info.flight, info.date);
        //console.log(info)
		if (info.flight && info.date ) {
			result.push(info);
			//console.log("pushed");
			info = {
				flight: null,
				date: null,
                dep: true
			};
		} else if (info.date) {
            
            result[result.length-1].dep = info.date
			info = {
				flight: null,
				date: null,
                dep: true
			};
            
        }
	}
    const seen = new Set();
    

    return result.filter(item => {
        const signature = `${item.flight}-${item.date.date}-${item.date.time}`;

        if (!seen.has(signature)) {
            seen.add(signature);
            return true;
        }

        return false;
    });
}

function convertTo24Hour(timeStr) {
    const timeParts = timeStr.trim().split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1].substr(0, 2), 10);

    if (timeStr.endsWith('PM') && hours < 12) {
        hours += 12;
    } else if (timeStr.endsWith('AM') && hours === 12) {
        hours = 0;
    }

    // Formatting the hours and minutes to always have two digits
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export default horizFilterInfo;
