import React, { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

export interface Marker {
  id: string
  location: [number, number]
  label: string
}

export interface Arc {
  id: string
  from: [number, number]
  to: [number, number]
  label?: string
}

export interface GlobeLiveProps {
  markers?: Marker[]
  arcs?: Arc[]
  className?: string
  markerColor?: [number, number, number]
  baseColor?: [number, number, number]
  arcColor?: [number, number, number]
  glowColor?: [number, number, number]
  dark?: number
  mapBrightness?: number
  markerSize?: number
  markerElevation?: number
  arcWidth?: number
  arcHeight?: number
  speed?: number
  theta?: number
  diffuse?: number
  mapSamples?: number
}

export function GlobeLive({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [1, 0.2, 0.2],
  baseColor = [1, 1, 1],
  arcColor = [1, 0.2, 0.2],
  glowColor = [1, 1, 1],
  dark = 0,
  mapBrightness = 4,
  markerSize = 0.05,
  markerElevation = 0.02,
  arcWidth = 0.5,
  arcHeight = 0.25,
  speed = 0.005,
  theta = 0.1,
  diffuse = 1.2,
  mapSamples = 16000,
}: GlobeLiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const velocity = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      pointerInteracting.current = { x: e.clientX, y: e.clientY }
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
      isPausedRef.current = true
    },
    []
  )

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const deltaX = e.clientX - pointerInteracting.current.x
      const deltaY = e.clientY - pointerInteracting.current.y
      dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 }
      const now = Date.now()
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1)
        const maxVelocity = 0.15
        velocity.current = {
          phi: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((e.clientX - lastPointer.current.x) / dt) * 0.3)
          ),
          theta: Math.max(
            -maxVelocity,
            Math.min(maxVelocity, ((e.clientY - lastPointer.current.y) / dt) * 0.08)
          ),
        }
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now }
    }
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
      lastPointer.current = null
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 1.2

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height: width,
      phi: 1.2,
      theta,
      dark,
      diffuse,
      mapSamples,
      mapBrightness,
      baseColor,
      markerColor,
      glowColor,
      markerElevation,
      markers: markers.map((m) => ({
        location: m.location,
        size: markerSize,
        id: m.id,
      })),
      arcs: arcs.map((a) => ({
        from: a.from,
        to: a.to,
        id: a.id,
      })),
      arcColor,
      arcWidth,
      arcHeight,
      opacity: 0.95,
    })

      function animate() {
      if (!isPausedRef.current) {
        phi += speed
        if (
          Math.abs(velocity.current.phi) > 0.0001 ||
          Math.abs(velocity.current.theta) > 0.0001
        ) {
          phiOffsetRef.current += velocity.current.phi
          thetaOffsetRef.current += velocity.current.theta
          velocity.current.phi *= 0.95
          velocity.current.theta *= 0.95
        }
        const thetaMin = -0.4,
          thetaMax = 0.4
        if (thetaOffsetRef.current < thetaMin) {
          thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1
        } else if (thetaOffsetRef.current > thetaMax) {
          thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1
        }
      }

      const currentPhi = phi + phiOffsetRef.current + dragOffset.current.phi;
      const currentTheta = theta + thetaOffsetRef.current + dragOffset.current.theta;

      globe!.update({
        phi: currentPhi,
        theta: currentTheta,
        dark,
        mapBrightness,
        markerColor,
        baseColor,
        arcColor,
        markerElevation,
        markers: markers.map((m) => ({
          location: m.location,
          size: markerSize,
          id: m.id,
        })),
        arcs: arcs.map((a) => ({
          from: a.from,
          to: a.to,
          id: a.id,
        })),
      })

      // Manual 3D-to-2D orthographic projection for markers (solves CSS Anchor cross-browser issues)
      const r = width / 2;
      markers.forEach((m) => {
        const el = document.getElementById(`cobe-marker-${m.id}`);
        if (!el) return;
        
        const lat = m.location[0] * (Math.PI / 180);
        // Note: cobe renders map slightly offset, standard alignment requires lng + phi
        // Actually, cobe's coordinate system might have a PI offset. Wait, typical geo-projection for WebGL sphere requires this exact formula:
        const lng = m.location[1] * (Math.PI / 180);
        
        const x3d = Math.cos(lat) * Math.sin(lng + currentPhi - Math.PI);
        const y3d = Math.sin(lat);
        const z3d = Math.cos(lat) * Math.cos(lng + currentPhi - Math.PI);

        // Apply theta tilt
        const yt = y3d * Math.cos(currentTheta) - z3d * Math.sin(currentTheta);
        const zt = y3d * Math.sin(currentTheta) + z3d * Math.cos(currentTheta);

        const isVisible = zt > 0;
        
        const x2d = r + x3d * r;
        const y2d = r - yt * r;

        el.style.transform = `translate(${x2d}px, ${y2d}px) translate(-50%, -100%)`;
        el.style.opacity = isVisible ? '1' : '0';
        el.style.pointerEvents = isVisible ? 'auto' : 'none';
      });

      animationId = requestAnimationFrame(animate)
    }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markers, arcs, markerColor, baseColor, arcColor, glowColor, dark, mapBrightness, markerSize, markerElevation, arcWidth, arcHeight, speed, theta, diffuse, mapSamples])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="cobe-canvas"
      />
      {markers.map((m) => (
        <div
          id={`cobe-marker-${m.id}`}
          key={m.id}
          className="cobe-marker"
        >
          {m.label}
          <span className="cobe-marker-arrow" />
        </div>
      ))}
    </div>
  )
}
