import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "./explore_with_me.pdf";
import { Box, Button, Typography } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface FlipBookProps {
  width: number;
  height: number;
  showCover?: boolean;
  usePortrait?: boolean;
  startPage?: number;
  className: string;
  style?: React.CSSProperties;
  size?: "fixed" | "stretch";
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  drawShadow?: boolean;
  flippingTime?: number;
  startZIndex?: number;
  autoSize?: boolean;
  maxShadowOpacity?: number;
  mobileScrollSupport?: boolean;
  clickEventForward?: boolean;
  useMouseEvents?: boolean;
  swipeDistance?: number;
  showPageCorners?: boolean;
  disableFlipByClick?: boolean;
  children: React.ReactNode;
  ref?: any;
}

const FlipBookWrapper: React.FC<FlipBookProps> = React.forwardRef(
  (props, ref) => {
    const {
      width,
      height,
      showCover = false,
      usePortrait = false,
      startPage = 1,
      className,
      style,
      size = "fixed",
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      drawShadow,
      flippingTime,
      startZIndex,
      autoSize,
      maxShadowOpacity,
      mobileScrollSupport,
      clickEventForward,
      useMouseEvents,
      swipeDistance,
      showPageCorners,
      disableFlipByClick,
      children,
    } = props;

    return (
      <HTMLFlipBook
        width={width}
        height={height}
        showCover={showCover}
        usePortrait={usePortrait}
        startPage={startPage}
        className={className}
        style={style}
        size={size}
        minWidth={minWidth}
        maxWidth={maxWidth}
        minHeight={minHeight}
        maxHeight={maxHeight}
        drawShadow={drawShadow}
        flippingTime={flippingTime}
        startZIndex={startZIndex}
        autoSize={autoSize}
        maxShadowOpacity={maxShadowOpacity}
        mobileScrollSupport={mobileScrollSupport}
        clickEventForward={clickEventForward}
        useMouseEvents={useMouseEvents}
        swipeDistance={swipeDistance}
        showPageCorners={showPageCorners}
        disableFlipByClick={disableFlipByClick}
        ref={ref}
      >
        {children}
      </HTMLFlipBook>
    );
  }
);

const Pages = React.forwardRef((props: any, ref: any) => {
  return (
    <div ref={ref} style={{ padding: 0, margin: 0 }}>
      <p>{props.children}</p>
    </div>
  );
});

Pages.displayName = "Pages";

function Flipbook() {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const flipbookRef = useRef<any>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Go to the previous page
  const goToPreviousPage = () => {
    if (flipbookRef.current && currentPage > 1) {
      flipbookRef.current.pageFlip().flipPrev();
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Go to the next page
  const goToNextPage = () => {
    if (flipbookRef.current && currentPage < numPages!) {
      flipbookRef.current.pageFlip().flipNext();
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          overflowY: "auto",
        }}
        style={{
          backgroundImage: `url(resources/backgroundMap.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Text above the FlipBook */}
        <Typography
          variant="h3"
          component="h3"
          sx={{ fontWeight: "medium", mb: 4, color: "#647c64" }}
        >
          Glossary
        </Typography>

        {/* FlipBook in the middle */}
        <FlipBookWrapper
          width={600}
          height={770}
          showCover={true}
          usePortrait={true}
          startPage={1}
          className="flipbook"
          style={{ overflow: "hidden" }}
          size="fixed"
          minWidth={200}
          maxWidth={600}
          minHeight={300}
          maxHeight={800}
          drawShadow={true}
          flippingTime={500}
          startZIndex={10}
          autoSize={true}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={50}
          showPageCorners={true}
          disableFlipByClick={false}
          ref={flipbookRef}
        >
          {[...Array(numPages).keys()].map((pNum) => {
            return (
              <Pages key={pNum} number={pNum + 2}>
                <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page
                    pageNumber={pNum + 2}
                    width={600}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </Document>
              </Pages>
            );
          })}
        </FlipBookWrapper>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          mt={2}
        >
          <Button
            variant="contained"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          {/* Page number text */}
          <Typography
            variant="body1"
            color="black"
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            Page {currentPage} of {numPages}
          </Typography>
          <Button
            variant="contained"
            onClick={goToNextPage}
            disabled={currentPage === numPages}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Flipbook;
