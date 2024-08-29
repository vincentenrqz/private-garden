import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "./explore_with_me.pdf";
import { Box, Typography } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props: any, ref: any) => {
  return (
    <div ref={ref} style={{ padding: 0, margin: 0 }}>
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});

Pages.displayName = "Pages";

function Flipbook() {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "grey.900",
          p: 2,
        }}
      >
        {/* Text above the FlipBook */}
        <Typography
          variant="h4"
          component="h1"
          color="white"
          sx={{ fontWeight: "medium", mb: 4 }}
        >
          Glossary
        </Typography>

        {/* FlipBook in the middle */}
        <HTMLFlipBook
          width={500}
          height={700}
          style={{
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
          }}
        >
          {[...Array(numPages).keys()].map((pNum) => (
            <Pages key={pNum} number={pNum + 1}>
              <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={pNum + 1}
                  width={450}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
            </Pages>
          ))}
        </HTMLFlipBook>

        {/* Page number text below the FlipBook */}
        <Typography
          variant="body1"
          color="white"
          sx={{ textAlign: "center", mt: 2 }}
        >
          Page {Math.min(numPages, 1)} of {numPages}
        </Typography>
      </Box>
    </>
  );
}

export default Flipbook;
