"use client";
import { BrowserMultiFormatReader, ResultPoint } from "@zxing/library";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import MockBarcodeScanner from "./MockScanner";
import ScannerOverlay, { ScannerOverlayHandles } from "./ScannerOverlay";

export default function Scanner({
  className,
  onDetect,
}: {
  className: string;
  onDetect?: () => Promise<void>;
}) {
  const drawBoundingBox = () => {
    // Implementation of drawBoundingBox function
  };
  const ref = useRef<ScannerOverlayHandles>({ drawBoundingBox });
  const [devices, setDevices] = useState<Array<MediaDeviceInfo>>([]);
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(
    null,
  );

  const reader = new BrowserMultiFormatReader();
  const cameraRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!cameraRef.current) return;

    // Implementation of useEffect hook
    const exec = async () => {
      await reader.listVideoInputDevices().then((devices) => {
        setDevices(devices);
        setSelectedDevice(devices[1]);
      });
    };

    exec();
  }, [cameraRef]);

  useEffect(() => {
    if (!selectedDevice) return;

    reader.decodeFromVideoDevice(
      selectedDevice.deviceId,
      cameraRef.current,
      (result) => {
        if (result) {
          console.log(result);
          const resultPoints = result.getResultPoints();
          switch (resultPoints.length) {
            case 2:
              console.log("2 result points");
              ref.current.drawBoundingBox(
                resultPoints[0].getX(),
                resultPoints[0].getY(),
                resultPoints[1].getX(),
                resultPoints[1].getY(),
              );
              break;
            case 3:
              console.log("3 result points");
              const width = ResultPoint.distance(
                resultPoints[0],
                resultPoints[2],
              );
              ref.current.drawBoundingBox(
                // resultPoints[1].getX(),
                // resultPoints[1].getY(),
                10,
                10 / 2,
                width,
                width / 2,
              );
              break;
            default:
              console.log("Unknown");
              break;
          }
        }
      },
    );
  }, [selectedDevice, ref]);
  return (
    <div className="">
      <select
        className="w-full h-full"
        onChange={(val) => {
          setSelectedDevice((prev) =>
            devices[0].deviceId === prev?.deviceId ? devices[1] : devices[0],
          );
        }}
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>

      <ScannerOverlay ref={ref}>
        <video ref={cameraRef} />
      </ScannerOverlay>
    </div>
  );

  return (
    <div className={twMerge("w-24 h-24", className)}>
      <ScannerOverlay ref={ref}>
        <MockBarcodeScanner
          onDetect={(result) =>
            ref.current.drawBoundingBox(
              result.x,
              result.y,
              result.height,
              result.width,
            )
          }
        ></MockBarcodeScanner>
      </ScannerOverlay>
    </div>
  );
}
