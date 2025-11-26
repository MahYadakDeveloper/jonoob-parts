"use client";

import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function MockBarcodeScanner({
  className,
  onDetect,
}: {
  className?: string;
  onDetect: (result: {
    data: string;
    x: number;
    y: number;
    height: number;
    width: number;
  }) => void;
}) {
  useEffect(() => {
    setInterval(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      onDetect({
        data: "1234567890",
        x,
        y,
        height: x + Math.random() * 100,
        width: y + Math.random() * 100,
      });
    }, 1000);
  }, []);

  return <div className={twMerge(className)}></div>;
}
