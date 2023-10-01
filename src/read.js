import React, { useState, useEffect } from "react";
import * as pdfjs from "pdfjs-dist";
import skyFilterInfo from "./skyFilter";
import horizFilterInfo from "./horizFilter";

const PDFReader = ({ pdfUrl ,horiz}) => {
	const [text, setText] = useState("");
	const [all, setAll] = useState([]);
	//console.log(horiz)	

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
						if (horiz) {
							strings = horizFilterInfo(strings)
							//console.log(strings)
						} else {
							strings = skyFilterInfo(strings)
						}
						all.push(...strings);}
						
						
                    //console.log(all)
                })
                 
                // const strings = content.items.map((item) => item.str);
                // setText(strings.join(" "))
                
            }
            // all.filter((item) => {return /\S/.test(item)})
			// sort by date
			all.sort((a, b) => {
				let dateA = new Date(a.date.date + ' ' + a.date.time);
				let dateB = new Date(b.date.date + ' ' + b.date.time);
			
				if (dateA < dateB) return -1;
				if (dateA > dateB) return 1;
				return 0;
			});
			
			//console.log(all)
			//console.log(all)
            const txt = all.map((item,ind) => {
				let title = item.date.date
				//console.log(item.dep)
				let departure = item.dep ? 'ARV' : 'DEP'
				if (item.flight === 'departure time'){
					departure = ''
				}

				if (title === all[ind-1]?.date.date){
					return (
					<div>{item.flight} @ {item.date.time} {departure}</div>)

				}else {
					return (<>
					<div>{title}</div>
					<div>{item.flight} @ {item.date.time} {departure}</div>
					</>)
				}
			})
            setText(txt)
		};
        
        
        loadPdf()
		return () => {
            
		    URL.revokeObjectURL(pdfUrl); 
		};
	}, [pdfUrl, all]);
    
	return (
		<div>
			<div className="pdf-text">{text}</div>
		</div>
	);
};

export default PDFReader;
