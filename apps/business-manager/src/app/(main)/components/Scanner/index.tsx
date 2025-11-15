import { twMerge } from "tailwind-merge"

export default function Scanner({
  className,
  onDetect
}:{
  className: string
  onDetect: () => Promise<void>
}) {

  return (<div
    className={twMerge("", className)}
  >
    <ScannerOverlay>

    </ScannerOverlay>
  </div>)
}