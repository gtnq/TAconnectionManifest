const sortDate = (all) =>
	all.sort((a, b) => {
		let dateA = new Date(a.date.date + " " + a.date.time);
		let dateB = new Date(b.date.date + " " + b.date.time);

		if (dateA < dateB) return -1;
		if (dateA > dateB) return 1;
		return 0;
	});


export default sortDate