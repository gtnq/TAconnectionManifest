import React, { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import skyFilterInfo from "./skyFilter";
import horizFilterInfo from "./horizFilter";
import generate from "./generate";
import sortDate from "./sortDate";

const PDFReader = ({ pdfUrl, horiz }) => {
	const [text, setText] = useState("");
	const [all, setAll] = useState([]);
	const [arv, setArv] = useState([]);
	const [dep, setDep] = useState([]);
	const [disALL, setDisALL] = useState(true);
	const [disARV, setDisARV] = useState(false);
	const [disDEP, setDisDEP] = useState(false);

	
	//console.log(horiz)

	const changeOption = (e) => {
		if (e === "ARV") {
			setDisALL(false);
			setDisARV(true);
			setDisDEP(false)

			

			let output = generate(arv)

			setText(output);
			//console.log(output)

		} else if (e === "DEP") {
			setDisALL(false);
			setDisARV(false)
			
			setDisDEP(true)
			
			let output = generate(dep)
			setText(output);
			//console.log(output)

		} else if (e === "ALL") {
			setDisALL(true);
			setDisARV(false);
			setDisDEP(false)

			let output = generate(all)
			//console.log(output)

			setText(output);
		}
	};

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
			setAll(sortDate(all))
			setArv(sortDate(all.filter((item) => item.dep === false)));
			setDep(sortDate(all.filter((item) => item.dep === true)));
			setText(generate(all));
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

	
	return (
		<div>
			<div className="output">
				<select defaultValue = "ALL" onChange={(e) => {changeOption(e.target.value)} }>
					<option value="ARV">ARV</option>
					<option value="DEP">DEP</option>
					<option value="ALL" >ALL</option>
				</select>
			</div>
			{disALL && <div className="ALL">{text}</div>}
			{disARV && <div className="ARV">{text}</div>}
			{disDEP && <div className="DEP">{text}</div>}

		</div>
	);
};

export default PDFReader;
