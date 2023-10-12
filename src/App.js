import React, { useState } from "react";
import "./App.css";
import PDFReader from "./read";

export default function App() {
	const [pdfUrl, setPdfUrl] = useState(null);
	const [fileName, setFileName] = useState(null);
	let horiz;

	const onFileChange = (e) => {
		if (e.target.files.length === 0) return;

		const file = e.target.files[0];
		const objectUrl = URL.createObjectURL(file);
		setPdfUrl(objectUrl);
		setFileName(file.name); // <-- Add this line

		URL.revokeObjectURL(pdfUrl);
	};
	if (fileName) {
		if (fileName[0] === "H") {
			horiz = true;
			//console.log(horiz)
		}
	}

	//console.log('test')

	return (
		<div id="App">
			<h1>Flight Manifest</h1>
			<input
				type="file"
				onChange={onFileChange}
				accept=".pdf"
			/>
			<button onClick={() => window.print()}>Print\</button>
			{pdfUrl && (
				<PDFReader
					pdfUrl={pdfUrl}
					horiz={horiz}
				/>
			)}
			
		</div>
	);
}
