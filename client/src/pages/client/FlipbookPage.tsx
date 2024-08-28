import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import samplePDF from "../../test.pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <div>
        <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess}>
          {[...Array(numPages)].map((_, index) => (
            <Page key={index} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <div>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            style={{
              backgroundColor: "#2196F3",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              cursor: pageNumber >= numPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
