import React, { useState, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist'

const PDFReader = ({ pdfUrl }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const loadPdf = async () => {
      pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.entry';

      const loadingTask = pdfjs.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const pageNumber = 1;
      const page = await pdf.getPage(pageNumber);

      const content = await page.getTextContent();

      const strings = content.items.map(item => item.str);
      setText(strings.join(' '));
    };

    loadPdf();
    return () => {
        URL.revokeObjectURL(pdfUrl);
      };
    }, [pdfUrl]);

  return (
    <div>
      <div className="pdf-text">
        {text}
      </div>
    </div>
  );
}

export default PDFReader;