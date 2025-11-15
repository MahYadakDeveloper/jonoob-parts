import { createContext, ReactNode, useState } from "react"

type ScannerProxyContext = {
  drawBoundingBox: () => Promise<void>
}

export const scannerProxyContext = createContext<ScannerProxyContext | null>(null)

export default function ScannerOverlay({
  children
}: {
  children: ReactNode
}) {
  const [enabled, setEnabled] = useState(false)

  if (!enabled)
    return (
      <div>
        <button onClick={() => {setEnabled(true)}}>Enable</button>
      </div>
    )
  
  return (
    <div className="relative">
      {/* Graphic Overlay */}
      <div className="absolute w-full h-full"></div>

      {/* CAMERA with Scanning functionality */}

      <scannerProxyContext.Provider value={{
      }}>
      {children}
</scannerProxyContext.Provider>
    </div>
  )
}