import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "./explore_with_me2.pdf";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import FloatingButton from "../components/FloatingButton";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
  onFlip?: any;
  renderOnlyPageLengthChange?: boolean;
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
      onFlip,
      renderOnlyPageLengthChange,
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
        onFlip={onFlip}
        renderOnlyPageLengthChange={renderOnlyPageLengthChange}
      >
        {children}
      </HTMLFlipBook>
    );
  }
);

const Pages = React.forwardRef((props: any, ref: any) => {
  return (
    <div
      ref={ref}
      style={{
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <p>{props.children}</p>
    </div>
  );
});

Pages.displayName = "Pages";

function Flipbook() {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(2);
  const flipbookRef = useRef<any>(null);

  // Responsive breakpoints
  const isXs = useMediaQuery("(max-width: 480px)");
  const isSm = useMediaQuery("(max-width: 768px)");
  const isMd = useMediaQuery("(max-width: 1024px)");
  const isLg = useMediaQuery("(min-width: 1025px)");
  const isXl = useMediaQuery("(max-width: 1200px)");

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

  const onFlipPage = (pageIndex: number) => {
    setCurrentPage(pageIndex + 2);
  };

  // Determine the size of the flipbook based on screen size
  const flipbookWidth = isXs ? 300 : isSm ? 400 : isMd ? 500 : 600;
  const flipbookHeight = isXs ? 400 : isSm ? 500 : isMd ? 700 : 770;

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <IconButton onClick={() => zoomIn()}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={() => zoomOut()}>
          <RemoveIcon />
        </IconButton>
        <IconButton onClick={() => resetTransform()}>
          <RotateLeftIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        overflowY: "auto",
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

      {/* FlipBook */}

      <BookLayer3>
        <BookLayer2>
          <BookLayer1>
            <Box
              sx={{
                backgroundColor: "white",
                padding: 2,
                borderRadius: "15px",
                boxShadow: `
            0 10px 20px rgba(0, 0, 0, 0.2),  /* Soft shadow around the book */
            inset 0 0 20px rgba(0, 0, 0, 0.1),  /* Inner shadow for book depth */
            0 0 20px rgba(0, 0, 0, 0.1)  /* Outer shadow for a slight lift effect */
          `,
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            >
              <TransformWrapper>
                <Controls />
                <TransformComponent>
                  <FlipBookWrapper
                    width={flipbookWidth}
                    height={flipbookHeight}
                    showCover={true}
                    usePortrait={isXl}
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
                    onFlip={(e: any) => onFlipPage(e.data)}
                    renderOnlyPageLengthChange={true}
                  >
                    {[...Array(numPages).keys()].map((pNum) => (
                      <Pages key={pNum} number={pNum + 1}>
                        <Document
                          file={pdf}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page
                            pageNumber={pNum + 1}
                            width={flipbookWidth}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                          />
                        </Document>
                      </Pages>
                    ))}
                  </FlipBookWrapper>
                </TransformComponent>
              </TransformWrapper>
            </Box>
          </BookLayer1>
        </BookLayer2>
      </BookLayer3>

      {/* Pagination and buttons */}
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
          disabled={currentPage <= 2}
          sx={{
            backgroundColor: "#647c64 !important",
            "&:hover": {
              backgroundColor: "#647c64 !important",
            },
          }}
        >
          Prev
        </Button>

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
          sx={{
            backgroundColor: "#647c64 !important",
            "&:hover": {
              backgroundColor: "#647c64 !important",
            },
          }}
        >
          Next
        </Button>
      </Box>
      <FloatingButton />
    </Box>
  );
}

export default React.memo(Flipbook);

function BookLayer1({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 1,
        borderRadius: "15px",
        boxShadow: `
            0 10px 20px rgba(0, 0, 0, 0.2),  /* Soft shadow around the book */
            inset 0 0 20px rgba(0, 0, 0, 0.1),  /* Inner shadow for book depth */
            0 0 20px rgba(0, 0, 0, 0.1)  /* Outer shadow for a slight lift effect */
          `,
        border: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </Box>
  );
}

function BookLayer2({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 1,
        borderRadius: "15px",
        boxShadow: `
            0 10px 20px rgba(0, 0, 0, 0.2),  /* Soft shadow around the book */
            inset 0 0 20px rgba(0, 0, 0, 0.1),  /* Inner shadow for book depth */
            0 0 20px rgba(0, 0, 0, 0.1)  /* Outer shadow for a slight lift effect */
          `,
        border: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </Box>
  );
}

function BookLayer3({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        backgroundColor: "#647c64",
        padding: 1,
        borderRadius: "15px",
        boxShadow: `
            0 10px 20px rgba(0, 0, 0, 0.2),  /* Soft shadow around the book */
            inset 0 0 20px rgba(0, 0, 0, 0.1),  /* Inner shadow for book depth */
            0 0 20px rgba(0, 0, 0, 0.1)  /* Outer shadow for a slight lift effect */
          `,
        border: "1px solid rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </Box>
  );
}
