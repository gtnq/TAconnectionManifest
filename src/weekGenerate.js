const weekGenerate = (data) => {
	let arr = [],
		weekday = [],
		week = [];

	data.map((item, ind) => {
        const dayName = item.date.date.split(' ')[0];
        if (!(weekday.includes(dayName))) {
            weekday.push(dayName);
            week.push(item);
        } else {
            //verify if the previous pushed item's item.date.date is the same as the current one
            //if it is, then push the current item to the previous item's array
            //if not, then push the current item to the week array
            if (week[week.length - 1].date.date === item.date.date) {
                week.push(item);
            } else if (weekday.length === 7) {
                arr.push(week);
                week = [];
                week.push(item);
                weekday = [];
                weekday.push(dayName);
            } 
        }
        if (ind + 1 >= data.length) {
            arr.push(week)
    }

        //console.log(week, 'week')
        //console.log(weekday, 'weekday')

	});
	//console.log(arr, "arr");
	return arr;
};

export default weekGenerate;
