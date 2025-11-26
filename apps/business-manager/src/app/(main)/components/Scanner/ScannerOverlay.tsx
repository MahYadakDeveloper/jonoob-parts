import {
  ReactHTMLElement,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export type ScannerOverlayHandles = {
  drawBoundingBox: (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => void;
};

export default function ScannerOverlay({
  children,
  ref,
}: {
  children: ReactHTMLElement<HTMLHtmlElement>;
  ref: RefObject<ScannerOverlayHandles>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  const drawBoundingBox = (
    x: number,
    y: number,
    width: number,
    height: number,
  ) => {
    clearCanvas();
    console.log("Drawing bounding box");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
    return;
  };

  useImperativeHandle(ref, () => ({ drawBoundingBox }), [canvasRef]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      canvas.width = parseInt(children.props.width?.toString() || "0");
      canvas.height = parseInt(children.props.height?.toString() || "0");
    });
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Graphic Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute w-full h-full bg-green-900/25"
      ></canvas>

      {/* CAMERA with Scanning functionality */}
      {children}
    </div>
  );
}
