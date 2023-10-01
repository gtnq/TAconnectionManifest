import parseDate from "./parseDate.js";

function horizFilterInfo(data) {
	// Regular expressions
	const flightRegex = /^AS\d{4}$/;
	const dateRegex =
		/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}, \d{4}$/;
	const timeRegex = /^\d{1,2}:\d{2}(AM|PM)$/;
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
			forfix;
	let result = [];
	for (let i = 0; i < filteredData.length; i++) {
		
		//console.log(flightRegex.test(filteredData[i]))
		if (flightRegex.test(filteredData[i])) {
			info.flight = filteredData[i];
		} else if (fullDateRegex.test(filteredData[i])) {
			parsedDate = parseDate(filteredData[i]);
			info.date = parsedDate;
		} else if (dateRegex.test(filteredData[i])) {
            //console.log('date added')
			date = filteredData[i];
		} else if (timeRegex.test(filteredData[i])) {
            //console.log('time added')
			time = filteredData[i];
		}
        //console.log(date, time)
		if (date && time) {
			forfix = date + " " + time;
			parsedDate = parseDate(forfix);
			info.date = parsedDate;
			date = null;
			time = null;
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
            info.flight = 'departure time'
            result[result.length-1].dep = false
            result.push(info);
            info = {
                flight: null,
                date: null,
                dep: true
            };
        }
	}
    const seen = new Set();
    

    return result.filter(item => {
        const signature = `${item.flight}-${item.date.time}`;

        if (!seen.has(signature)) {
            seen.add(signature);
            return true;
        }

        return false;
    });
}

export default horizFilterInfo;
