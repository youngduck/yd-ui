import { createContext, ReactNode, useState } from 'react'

export interface OverlayConfig {
  id: number
  component: ReactNode
}

export interface OverlayContextType {
  overlays: Map<number, ReactNode>
  mount: (overlayConfig: OverlayConfig) => void
  unmount: (id: number) => void
}

export const OverlayContext = createContext<{
  overlays: Map<number, ReactNode>
  mount: (overlayConfig: OverlayConfig) => void
  unmount: (id: number) => void
}>({
  overlays: new Map(),
  mount: () => {},
  unmount: () => {},
})

export const OvelayProvider = ({ children }: { children: ReactNode }) => {
  const [overlays, setOverlays] = useState<Map<number, ReactNode>>(new Map())

  const mount = (overlayConfig: OverlayConfig) => {
    setOverlays(prev => new Map(prev).set(overlayConfig.id, overlayConfig.component))
  }

  const unmount = (id: number) => {
    setOverlays(prev => {
      const clonedMap = new Map(prev)
      clonedMap.delete(id)
      return clonedMap
    })
  }

  const contextValue: OverlayContextType = {
    overlays,
    mount,
    unmount,
  }

  return (
    <OverlayContext.Provider value={contextValue as OverlayContextType}>
      {children}
      <div>
        {Array.from(overlays.entries()).map(([id, component]) => (
          <div key={id}>{component}</div>
        ))}
      </div>
    </OverlayContext.Provider>
  )
}
