let dup = false;

const generate = (all) => all.map((item, ind) => {
		if (!dup) {
			let title = item.date.date;
			//console.log(item.dep)
			let departure = item.dep ? "ARV" : "DEP";
			if (item.flight === "departure time") {
				departure = "";
			}
			if (ind + 1 < all.length) {
				if (
					(item.flight === all[ind + 1]?.flight &&
						item.dep === all[ind + 1]?.dep) ||
					item.flight === all[ind - 1]?.flight
				) {
					dup = true;
				}
			}

			if (item.dep === true && all[ind + 1]?.dep === true && !dup) {
				//merge the two arrivials that are smaller then 15 mins apart
				if (ind + 1 < all.length) {
					let time1 = item.date.time.split(":");
					let time2 = all[ind + 1]?.date.time.split(":");
					let time1Num = parseInt(time1[0]) * 60 + parseInt(time1[1]);
					let time2Num = parseInt(time2[0]) * 60 + parseInt(time2[1]);
					if (Math.abs(time1Num - time2Num) < 10) {
						dup = true;
						return (
							<div>
								{item.flight} @ {item.date.time} and{" "}
								{all[ind + 1]?.flight} @{" "}
								{all[ind + 1]?.date.time} {departure}
							</div>
						);
					}
				}
			}

			if (title === all[ind - 1]?.date.date) {
				return (
					<div>
						{item.flight} @ {item.date.time} {departure}
					</div>
				);
			} else {
				return (
					<>
						<div>{title}</div>
						<div>
							{item.flight} @ {item.date.time} {departure}
						</div>
					</>
				);
			}
		} else {
			dup = false;
		}
	});

export default generate;
