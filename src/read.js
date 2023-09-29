import React, { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import filterInfo from "./filter.js";

const PDFReader = ({ pdfUrl }) => {
	const [text, setText] = useState("");
	const [all, setAll] = useState([]);

	useEffect(() => {
		const loadPdf = async () => {
			pdfjs.GlobalWorkerOptions.workerSrc =
				"//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js";

			const loadingTask = pdfjs.getDocument(pdfUrl);
			const pdf = await loadingTask.promise;
            for (let i = 1; i < pdf.numPages; i ++) {
                const page = await pdf.getPage(i);

                await page.getTextContent().then((content) => {
                    let strings = content.items.map((item) => item.str).filter((item) => {return /\S/.test(item)});
                    
                    //console.log(strings)
					if (strings[0] === "Folio"){
						strings = filterInfo(strings)
						
                    	all.push(strings);}
						
                    //console.log(all)
                })
                 
                // const strings = content.items.map((item) => item.str);
                // setText(strings.join(" "))
                
            }
            // all.filter((item) => {return /\S/.test(item)})
			
			
			console.log(all)
            const txt = all.map((item) => (
                <div>{item}</div>
            ))
            setText(txt)
		};
        
        
        loadPdf()
		return () => {
            
		    URL.revokeObjectURL(pdfUrl);
		};
	}, [pdfUrl]);
    
	return (
		<div>
			<div className="pdf-text">{text}</div>
		</div>
	);
};

export default PDFReader;
