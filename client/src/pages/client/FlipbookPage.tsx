import React, { useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import pdfData from "./explore_with_me.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface FlipBookProps {
  width: number;
  height: number;
  showCover?: boolean;
  usePortrait?: boolean;
  startPage?: number;
  className: string;
  style?: React.CSSProperties;
  size?: "fixed" | "stretch"; // Corrected type for size
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

const FlipbookPage: React.FC = () => {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  console.log("numPages", numPages);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      console.log("Document loaded successfully");
      console.log("Number of pages:", numPages);
      setNumPages(numPages);
    },
    []
  );

  const onDocumentLoadError = useCallback((error: any) => {
    console.error("Failed to load document", error);
    setError("Failed to load document");
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gray-900 overflow-hidden">
      <h1 className="text-3xl text-white text-center font-bold">FlipBook</h1>
      {numPages && (
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
            <div key={pNum} className="demoPage">
              <Document
                file={pdfData}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
              >
                <Page
                  pageNumber={pNum}
                  width={400}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
              <p>
                Page {pNum + 1} of {numPages}
              </p>
            </div>
          ))}
        </FlipBookWrapper>
      )}
    </div>
  );
};

export default FlipbookPage;
