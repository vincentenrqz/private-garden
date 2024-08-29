import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "./explore_with_me.pdf";
import { Box, Typography } from "@mui/material";

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
}

const FlipBookWrapper: React.FC<FlipBookProps> = (props) => {
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
    >
      {children}
    </HTMLFlipBook>
  );
};

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
        <FlipBookWrapper
          width={400}
          height={570}
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
        </FlipBookWrapper>

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
