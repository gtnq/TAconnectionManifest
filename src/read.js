import React, { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import skyFilterInfo from "./skyFilter";
import horizFilterInfo from "./horizFilter";
import generate from "./generate";
import sortDate from "./sortDate";
import ByDate from "./bydate";
import ByStatus from "./bystatus";



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

	const [byDate, setbyDate] = useState([]);
	const [byDateARV, setbyDateARV] = useState([]);
	const [byDateDEP, setbyDateDEP] = useState([]);

	

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


	}


	const changeDisplay = (choice) => {	
		if (choice === 'status') {
			setViaStatus(true);
			setViaDate(false);
		} else if (choice === 'date') {
			setViaStatus(false);
			setViaDate(true);
		}
	}


	useEffect(() => {
		const loadPdf = async () => {
			pdfjs.GlobalWorkerOptions.workerSrc =
				"//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js";

			const loadingTask = pdfjs.getDocument(pdfUrl);
			const pdf = await loadingTask.promise;
			for (let i = 1; i < pdf.numPages; i++) {
				const page = await pdf.getPage(i);

				await page.getTextContent().then((content) => {
					let strings = content.items
						.map((item) => item.str)
						.filter((item) => {
							return /\S/.test(item);
						});

					//console.log(strings)
					if (strings[0] === "Folio") {
						if (horiz) {
							strings = horizFilterInfo(strings);
							//console.log(strings)
						} else {
							strings = skyFilterInfo(strings);
						}
						all.push(...strings);
					}

					//console.log(all)
				});

				// const strings = content.items.map((item) => item.str);
				// setText(strings.join(" "))
			}

			setArv(sortDate(all.filter((item) => item.dep === true)));
			setDep(sortDate(all.filter((item) => item.dep === false)));
			setAll(sortDate(all));
			setText(generate(all, setbyDate));
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
			{!viaStatus && <button onClick={(e) => changeDisplay('status')}>By Status</button>}
			{!viaDate && <button onClick={(e) => changeDisplay('date')}>By Date</button>}
			<div className="viStatus">
				{viaStatus && <ByStatus item={display}/>}
			</div>
			<div className="viaDate">
				
				{viaDate && <ByDate byDates={display} />}
			</div>


		</div>
	);
};

export default PDFReader;
