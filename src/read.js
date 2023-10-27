import React, { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import skyFilterInfo from "./skyFilter";
import horizFilterInfo from "./horizFilter";
import generate from "./generate";
import sortDate from "./sortDate";
import ByDate from "./bydate";
import ByStatus from "./bystatus";
import options from "./options";
import filterArvDep from "./arrivalDepart";
import dateGenerate from "./dateGenerate";
import weekGenerate from "./weekGenerate";
import ByWeek from "./byWeek";

const PDFReader = ({ pdfUrl, horiz }) => {
	const [text, setText] = useState("");

	const [all, setAll] = useState([]);
	const [arv, setArv] = useState([]);
	const [dep, setDep] = useState([]);

	const [disALL, setDisALL] = useState(true);
	const [disARV, setDisARV] = useState(false);
	const [disDEP, setDisDEP] = useState(false);

	const [viaStatus, setViaStatus] = useState(true);
	const [viaDate, setViaDate] = useState(false);
	const [viaWeek, setViaWeek] = useState(false);

	const [byDate, setbyDate] = useState([]);
	const [byDateARV, setbyDateARV] = useState([]);
	const [byDateDEP, setbyDateDEP] = useState([]);

	const [week, setWeek] = useState([]);
	const [weekArv, setWeekArv] = useState([]);
	const [weekDep, setWeekDep] = useState([]);

	const display = {
		text: text,
		setText: setText,

		disALL: disALL,
		disARV: disARV,
		disDEP: disDEP,
		setDisALL: setDisALL,
		setDisARV: setDisARV,
		setDisDEP: setDisDEP,

		all: all,
		arv: arv,
		dep: dep,

		byDate: byDate,
		setbyDateARV: setbyDateARV,
		setbyDateDEP: setbyDateDEP,
		byDateARV: byDateARV,
		byDateDEP: byDateDEP,

		week: week,
		weekArv: weekArv,
		weekDep: weekDep,
		setWeekArv: setWeekArv,
		setWeekDep: setWeekDep,
		setWeek: setWeek,

	};

	const changeDisplay = (choice) => {
		let current = all
		if (choice === "status") {
			setViaStatus(true);
			setViaDate(false);
			setViaWeek(false)
			current = all
		} else if (choice === "date") {
			setViaStatus(false);
			setViaDate(true);
			setViaWeek(false)
			current = byDate[0].flights
		} else if (choice === "week") {
			setViaStatus(false);
			setViaDate(false);
			setViaWeek(true)
			current = week[0]
		}
		options(
			"ALL",
			setDisALL,
			setDisARV,
			setDisDEP,
			setText,
			current,
			arv,
			dep
		);
	};

	useEffect(() => {
		const loadPdf = async () => {
			pdfjs.GlobalWorkerOptions.workerSrc =
				"//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js";

			const loadingTask = pdfjs.getDocument(pdfUrl);
			const pdf = await loadingTask.promise;
			let steps;
			for (let i = 1; i < pdf.numPages+1; i++) {
				const page = await pdf.getPage(i);

				await page.getTextContent().then((content) => {
					let strings = content.items
						.map((item) => item.str)
						.filter((item) => {
							return /\S/.test(item);
						});
					// console.log(strings)

					//console.log(strings)
					console.log(strings)
					// if (strings){
					// 	steps = strings[0].split(' ')
					// }
					console.log(strings[0])
					if (strings[0] === "Folio" || strings[0] === "DATE" ) {
						
						if (horiz) {
							strings = horizFilterInfo(strings);
							//console.log(strings)
						} else {
							console.log()
							strings = skyFilterInfo(strings);
						}
						// all.push(...strings);
					}

					//console.log(all)
				});

				// const strings = content.items.map((item) => item.str);
				// setText(strings.join(" "))
			}
			
			setArv(sortDate(filterArvDep(all, true)));
			setDep(sortDate(filterArvDep(all, false)));
			setAll(sortDate(all));
			setText(generate(all));
			setbyDate(dateGenerate(all));
			setWeek(weekGenerate(all));
			//console.log(week)
			
			//console.log(byDate)
			// all.filter((item) => {return /\S/.test(item)})
			// sort by date

			//console.log(all)
			//console.log(all)
		};

		loadPdf();
		return () => {
			URL.revokeObjectURL(pdfUrl);
		};
	}, [pdfUrl, all, horiz]);
	//console.log(byDate);

	return (
		<div>
			{!viaStatus && (
				<button className="column-to-hide" onClick={(e) => changeDisplay("status")}>
					By Status
				</button>
			)}
			{!viaDate && (
				<button className="column-to-hide" onClick={(e) => changeDisplay("date")}>By Date</button>
			)}

			{!viaWeek && (
				<button onClick={(e) => changeDisplay("week")}>By Week</button>
			)}
			<div className="viStatus">
				{viaStatus && <ByStatus item={display} />}
			</div>
			<div className="viaDate">
				{viaDate && <ByDate byDates={display} />}
			</div>
			<div className="viaWeek">
				{viaWeek && <ByWeek byWeeks={display} />}
			</div>
		</div>
	);
};

export default PDFReader;
