'use client'

import React, { useRef, useEffect, useState } from 'react'
import { sound } from '@/lib/audio/soundFx'

interface HubNode {
  id: string
  name: string
  country: string
  x: number // 0 to 1 normalized
  y: number // 0 to 1 normalized
  status: 'hub' | 'trending' | 'hot'
  enquiries: number
  conversion: string
  color: string
}

interface ArcPacket {
  fromIndex: number
  toIndex: number
  progress: number
  speed: number
  color: string
}

const HUBS: HubNode[] = [
  { id: 'delhi', name: 'New Delhi (HQ)', country: 'India', x: 0.44, y: 0.44, status: 'hub', enquiries: 42, conversion: '32.4%', color: '#8B2FC9' },
  { id: 'spiti', name: 'Spiti Valley', country: 'Himachal', x: 0.43, y: 0.36, status: 'hot', enquiries: 28, conversion: '38.1%', color: '#E8562A' },
  { id: 'bangkok', name: 'Bangkok / Phuket', country: 'Thailand', x: 0.58, y: 0.54, status: 'hot', enquiries: 64, conversion: '41.2%', color: '#F5A623' },
  { id: 'tokyo', name: 'Tokyo / Kyoto', country: 'Japan', x: 0.78, y: 0.42, status: 'trending', enquiries: 34, conversion: '29.5%', color: '#EC4899' },
  { id: 'vietnam', name: 'Hanoi / Da Nang', country: 'Vietnam', x: 0.62, y: 0.50, status: 'trending', enquiries: 26, conversion: '31.0%', color: '#10B981' },
  { id: 'male', name: 'Malé Atolls', country: 'Maldives', x: 0.41, y: 0.68, status: 'hot', enquiries: 31, conversion: '44.8%', color: '#00F0FF' },
  { id: 'colombo', name: 'Colombo / Galle', country: 'Sri Lanka', x: 0.45, y: 0.65, status: 'trending', enquiries: 19, conversion: '26.4%', color: '#3B82F6' },
  { id: 'cairo', name: 'Cairo / Giza', country: 'Egypt', x: 0.26, y: 0.47, status: 'trending', enquiries: 16, conversion: '22.0%', color: '#EAB308' },
  { id: 'bali', name: 'Denpasar / Ubud', country: 'Bali', x: 0.66, y: 0.70, status: 'hot', enquiries: 39, conversion: '37.5%', color: '#F97316' },
]

// Flight routes between hubs
const ROUTES: [number, number][] = [
  [0, 1], // Delhi -> Spiti
  [0, 2], // Delhi -> Thailand
  [0, 3], // Delhi -> Japan
  [0, 4], // Delhi -> Vietnam
  [0, 5], // Delhi -> Maldives
  [0, 6], // Delhi -> Sri Lanka
  [0, 7], // Delhi -> Egypt
  [0, 8], // Delhi -> Bali
  [2, 4], // Thailand -> Vietnam
  [2, 8], // Thailand -> Bali
  [3, 4], // Japan -> Vietnam
]

export const FlightMesh3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeHub, setActiveHub] = useState<HubNode | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [viewMode, setViewMode] = useState<'flight_mesh' | 'heatmap'>('flight_mesh')
  const [fps, setFps] = useState(60)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let frameCount = 0
    let fpsTimer = performance.now()

    // Energy packets travelling on arcs
    const packets: ArcPacket[] = ROUTES.map(([fromIndex, toIndex]) => ({
      fromIndex,
      toIndex,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      color: HUBS[toIndex].color,
    }))

    // Background floating star dust particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.8 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      alpha: 0.2 + Math.random() * 0.5,
    }))

    // Resize handling with device pixel ratio for crystal sharpness
    const handleResize = () => {
      if (!canvas.parentElement) return
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseX = e.clientX - rect.left
      targetMouseY = e.clientY - rect.top
      setMousePos({ x: targetMouseX, y: targetMouseY })

      // Check hover on hubs
      const cw = rect.width
      const ch = rect.height
      let found: HubNode | null = null

      HUBS.forEach((hub) => {
        const hx = hub.x * cw
        const hy = hub.y * ch
        const dist = Math.hypot(targetMouseX - hx, targetMouseY - hy)
        if (dist < 22) {
          found = hub
        }
      })

      if (found !== activeHub) {
        if (found) sound.playBeep(920, 'sine', 0.04, 0.03)
        setActiveHub(found)
      }
    }

    canvas.addEventListener('mousemove', onMouseMove)

    // Render loop
    const render = (time: number) => {
      // FPS counter
      frameCount++
      if (time - fpsTimer > 1000) {
        setFps(Math.round((frameCount * 1000) / (time - fpsTimer)))
        frameCount = 0
        fpsTimer = time
      }

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.06
      mouseY += (targetMouseY - mouseY) * 0.06

      ctx.clearRect(0, 0, w, h)

      // 1. Grid Background Overlay (Cyber Coordinate Mesh)
      ctx.save()
      ctx.strokeStyle = 'rgba(139, 47, 201, 0.04)'
      ctx.lineWidth = 1
      const gridSize = 40
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Compass Ring in corner
      ctx.strokeStyle = 'rgba(139, 47, 201, 0.12)'
      ctx.beginPath()
      ctx.arc(w - 50, 50, 24, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(w - 50, 30)
      ctx.lineTo(w - 50, 70)
      ctx.moveTo(w - 70, 50)
      ctx.lineTo(w - 30, 50)
      ctx.stroke()
      ctx.restore()

      // 2. Star dust particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = 1
        if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1
        if (p.y > 1) p.y = 0

        const px = p.x * w
        const py = p.y * h

        ctx.fillStyle = `rgba(139, 47, 201, ${p.alpha * 0.5})`
        ctx.beginPath()
        ctx.arc(px, py, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // 3. Render Arcs & Flight Trajectories
      ROUTES.forEach(([fromIdx, toIdx]) => {
        const from = HUBS[fromIdx]
        const to = HUBS[toIdx]

        const x1 = from.x * w
        const y1 = from.y * h
        const x2 = to.x * w
        const y2 = to.y * h

        // Curvature control point (quadratic elevation arc)
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.22

        ctx.save()
        // Arc line
        const grad = ctx.createLinearGradient(x1, y1, x2, y2)
        grad.addColorStop(0, 'rgba(139, 47, 201, 0.25)')
        grad.addColorStop(0.5, 'rgba(232, 86, 42, 0.4)')
        grad.addColorStop(1, 'rgba(245, 166, 35, 0.25)')

        ctx.strokeStyle = grad
        ctx.lineWidth = viewMode === 'heatmap' ? 2.5 : 1.2
        ctx.setLineDash([4, 6])
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.quadraticCurveTo(mx, my, x2, y2)
        ctx.stroke()
        ctx.restore()
      })

      // 4. Moving Energy Packets (Live Flight Particles)
      packets.forEach((pkt) => {
        pkt.progress += pkt.speed
        if (pkt.progress >= 1) {
          pkt.progress = 0
        }

        const from = HUBS[pkt.fromIndex]
        const to = HUBS[pkt.toIndex]

        const x1 = from.x * w
        const y1 = from.y * h
        const x2 = to.x * w
        const y2 = to.y * h
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.22

        const t = pkt.progress
        // Quadratic bezier formula: B(t) = (1-t)^2*P0 + 2(1-t)t*P1 + t^2*P2
        const bx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2
        const by = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2

        ctx.save()
        ctx.shadowColor = pkt.color
        ctx.shadowBlur = 10
        ctx.fillStyle = pkt.color
        ctx.beginPath()
        ctx.arc(bx, by, 3, 0, Math.PI * 2)
        ctx.fill()

        // Comet tail
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.beginPath()
        ctx.arc(bx, by, 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // 5. Waypoint Hub Nodes
      HUBS.forEach((hub) => {
        const hx = hub.x * w
        const hy = hub.y * h
        const isHovered = activeHub?.id === hub.id

        ctx.save()

        // Pulsing radar ring
        const pulse = (time * 0.002 + hub.enquiries) % (Math.PI * 2)
        const pulseRadius = 10 + Math.sin(pulse) * 6
        const pulseAlpha = Math.max(0, 0.6 - (pulseRadius - 10) / 10)

        ctx.strokeStyle = hub.color
        ctx.lineWidth = 1
        ctx.globalAlpha = pulseAlpha
        ctx.beginPath()
        ctx.arc(hx, hy, pulseRadius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.globalAlpha = 1

        // Core Beacon
        ctx.shadowColor = hub.color
        ctx.shadowBlur = isHovered ? 18 : 8
        ctx.fillStyle = hub.color
        ctx.beginPath()
        ctx.arc(hx, hy, isHovered ? 7 : 5, 0, Math.PI * 2)
        ctx.fill()

        // Center bright dot
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(hx, hy, isHovered ? 3 : 2, 0, Math.PI * 2)
        ctx.fill()

        // Hub Label
        ctx.shadowBlur = 0
        ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        ctx.fillStyle = isHovered ? '#0f172a' : '#475569'
        ctx.fillText(hub.name, hx + 10, hy + 4)

        if (viewMode === 'heatmap') {
          ctx.font = '700 9px monospace'
          ctx.fillStyle = hub.color
          ctx.fillText(`${hub.enquiries} LEADS // ${hub.conversion}`, hx + 10, hy + 16)
        }

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', onMouseMove)
    }
  }, [viewMode, activeHub])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '380px',
        background: 'linear-gradient(180deg, #ffffff 0%, #fbf9fe 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(139, 47, 201, 0.16)',
        boxShadow: '0 8px 32px -8px rgba(139, 47, 201, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
        overflow: 'hidden',
        marginBottom: '24px',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'crosshair',
        }}
      />

      {/* Top Cyber Telemetry Bar */}
      <div
        style={{
          position: 'absolute',
          top: '14px',
          left: '16px',
          right: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              background: '#10b981',
              borderRadius: '50%',
              boxShadow: '0 0 8px #10b981',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '11px',
              fontWeight: 700,
              color: '#6b21a8',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
            }}
          >
            GEOSPATIAL REVENUE MESH // 9 GLOBAL HUBS ONLINE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'auto' }}>
          <button
            onClick={() => {
              sound.playLaserPulse()
              setViewMode((m) => (m === 'flight_mesh' ? 'heatmap' : 'flight_mesh'))
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              border: '1px solid rgba(139, 47, 201, 0.2)',
              backdropFilter: 'blur(8px)',
              color: '#8b2fc9',
              fontSize: '11px',
              fontWeight: 700,
              padding: '5px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {viewMode === 'flight_mesh' ? '🌐 View Heatmap Mode' : '✈️ View Flight Trajectories'}
          </button>
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '10px',
              color: '#94a3b8',
            }}
          >
            {fps} FPS
          </span>
        </div>
      </div>

      {/* Hover Hologram HUD Tooltip */}
      {activeHub && (
        <div
          style={{
            position: 'absolute',
            left: `${Math.min(window.innerWidth - 300, mousePos.x + 18)}px`,
            top: `${Math.max(10, mousePos.y - 40)}px`,
            background: 'rgba(255, 255, 255, 0.95)',
            border: `1px solid ${activeHub.color}`,
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
            backdropFilter: 'blur(12px)',
            pointerEvents: 'none',
            minWidth: '180px',
            zIndex: 10,
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{activeHub.name}</span>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                color: '#ffffff',
                background: activeHub.color,
                padding: '2px 6px',
                borderRadius: '8px',
                textTransform: 'uppercase',
              }}
            >
              {activeHub.status}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div>Country: <strong style={{ color: '#0f172a' }}>{activeHub.country}</strong></div>
            <div>Inbound Demand: <strong style={{ color: activeHub.color }}>{activeHub.enquiries} Live Enquiries</strong></div>
            <div>Conversion Velocity: <strong style={{ color: '#10b981' }}>{activeHub.conversion}</strong></div>
          </div>
        </div>
      )}

      {/* Bottom Coordinates & Time Ticker */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '16px',
          right: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '10px',
          color: '#94a3b8',
          pointerEvents: 'none',
        }}
      >
        <span>SYS.STATUS: SYNCHRONIZED // ORBITAL LATENCY: 14ms</span>
        <span>LAT: 28.6139° N / LON: 77.2090° E // HFT-CONCIERGE-V4</span>
      </div>
    </div>
  )
}
