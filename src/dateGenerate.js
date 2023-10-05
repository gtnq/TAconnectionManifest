const dateGenerate = (data) => {
	let arr = [],
		dup,
		today,
		title;
	data.map((item, ind) => {
		if (dup) {
			dup = false;
		} else {
			title = item.date.date;

			if (ind + 1 < data.length) {
				if (
					(item.flight === data[ind + 1]?.flight &&
						item.dep === data[ind + 1]?.dep) ||
					item.flight === data[ind - 1]?.flight
				) {
					dup = true;
				}
			}
			if (title === data[ind - 1]?.date.date) {
				if (ind) {
					//console.log(today)
					today.flights.push(item);

					if (ind + 1 >= data.length) {
						arr.push(today);
					}
				}
			} else {
					if (ind) {
						arr.push(today);
					}
					today = {
						date: title,
						flights: [],
					};
					today.flights.push(item);
			}
            console.log(arr)
        }
	});
    return arr;
};


export default dateGenerate;