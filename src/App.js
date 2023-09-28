import React, { useState } from 'react';
import './App.css';
import PDFReader from './read';

export default function App() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const onFileChange = (e) => {
    if (e.target.files.length === 0) return;

    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPdfUrl(objectUrl);
  }
  console.log('test')

  return (
    <div id="App">
	<h1>Flight Manifest</h1>
      <input type="file" onChange={onFileChange} accept=".pdf"/>
      {pdfUrl && <PDFReader pdfUrl={pdfUrl} />}
    </div>
  );
}



