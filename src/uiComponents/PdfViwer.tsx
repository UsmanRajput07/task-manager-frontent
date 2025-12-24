import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useLocation } from "react-router";

// worker config
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewer() {
  const { pathname } = useLocation();
  const { state } = useLocation();
  const folderName = state?.folder ?? "document";
  const pdfUrl = pathname.split("/").at(-1)?.replaceAll("%20", " ");
  const [numPages, setNumPages] = useState<number>(0);
  const [width, setWidth] = useState<number>(800);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // 👉 Detect container width for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth - 20); // padding
      }
    };

    handleResize(); // run initially
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div
      ref={containerRef}
      className="w-full md:max-w-7xl mx-auto overflow-hidden rounded-lg p-2 h-full"
    >
      <Document
        file={`${import.meta.env.VITE_CLOUDFRONT}/${folderName}/${pdfUrl}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={index}
            pageNumber={index + 1}
            width={width} // 🟢 fully responsive
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}
