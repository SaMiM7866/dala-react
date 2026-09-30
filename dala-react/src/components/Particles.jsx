import { useEffect, useRef } from 'react'

const rnd = (a, b) => a + Math.random() * (b - a)
const COLS = ['#f5c542', '#f5c542', '#ffffff', '#b9a3ff', '#7c5cff', '#4de0c0', '#ff8fa3', '#e6e6e6']

const SHAPES = {
  brain() {
    const a = rnd(0, 6.283), b = Math.acos(rnd(-1, 1)), r = 1 + 0.06 * Math.sin(a * 9) * Math.sin(b * 7)
    return [1.25 * r * Math.sin(b) * Math.cos(a), 0.85 * r * Math.cos(b) - 0.05, 0.85 * r * Math.sin(b) * Math.sin(a)]
  },
  bulb() {
    if (Math.random() < 0.78) {
      const a = rnd(0, 6.283), b = Math.acos(rnd(-1, 1))
      return [0.72 * Math.sin(b) * Math.cos(a), -0.35 - 0.72 * Math.cos(b), 0.72 * Math.sin(b) * Math.sin(a)]
    }
    const a = rnd(0, 6.283), y = rnd(0.35, 0.95)
    return [0.28 * Math.cos(a), y, 0.28 * Math.sin(a)]
  },
  globe() {
    const a = rnd(0, 6.283), b = Math.acos(rnd(-1, 1))
    return [Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a)]
  },
  swirl() {
    const t = rnd(0, 3), arm = ((Math.random() * 3) | 0) * 2.094, r = 0.15 + t * 0.3, a = arm + t * 1.6
    return [r * Math.cos(a), r * Math.sin(a), rnd(-0.2, 0.2)]
  },
  scatter() {
    return [rnd(-2.6, 2.6), rnd(-1.6, 1.6), rnd(-1, 1)]
  },
}

export default function Particles({ shape, cx, scale }) {
  const ref = useRef(null)
  const state = useRef({})
  state.current = { shape, cx, scale }

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d'), N = 1100
    let W, H, raf, rot = 0, mx = -999, my = -999, last = ''
    const P = Array.from({ length: N }, () => ({
      x: rnd(0, innerWidth), y: rnd(0, innerHeight), t: [0, 0, 0],
      c: COLS[(Math.random() * COLS.length) | 0], s: rnd(1.5, 4.5), ph: rnd(0, 6.28),
    }))
    const size = () => {
      const d = devicePixelRatio || 1
      W = innerWidth; H = innerHeight
      cv.width = W * d; cv.height = H * d
      ctx.setTransform(d, 0, 0, d, 0, 0)
    }
    size()
    const move = (e) => { mx = e.clientX; my = e.clientY }
    addEventListener('resize', size)
    addEventListener('pointermove', move)

    const tri = (x, y, s, a) => {
      ctx.beginPath()
      for (let k = 0; k < 3; k++) {
        const q = a + k * 2.094
        ctx[k ? 'lineTo' : 'moveTo'](x + s * Math.cos(q), y + s * Math.sin(q))
      }
      ctx.closePath()
    }

    const loop = () => {
      const c = state.current
      if (c.shape !== last) { last = c.shape; P.forEach((p) => (p.t = SHAPES[c.shape]())) }
      ctx.clearRect(0, 0, W, H)
      rot += 0.004
      const R = Math.min(W, H) * (c.scale || 0.42)
      const ox = W / 2 + c.cx * W * 0.5, oy = H / 2
      const cs = Math.cos(rot), sn = Math.sin(rot)
      for (const p of P) {
        const [x, y, z] = p.t
        const rx = x * cs + z * sn, rz = -x * sn + z * cs
        const persp = 1 / (1.6 - rz * 0.35)
        p.x += (ox + rx * R * persp - p.x) * 0.05
        p.y += (oy + y * R * persp - p.y) * 0.05
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy)
        if (d < 110) { p.x += (dx / d) * (110 - d) * 0.08; p.y += (dy / d) * (110 - d) * 0.08 }
        const sz = p.s * persp * (c.shape === 'scatter' ? 1.1 : 0.8)
        ctx.globalAlpha = Math.min(1, 0.35 + persp * 0.5)
        ctx.strokeStyle = p.c
        ctx.lineWidth = 1
        tri(p.x, p.y + (c.shape === 'scatter' ? Math.sin(rot * 3 + p.ph) * 3 : 0), sz, rot * 2 + p.ph)
        ctx.stroke()
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', size)
      removeEventListener('pointermove', move)
    }
  }, [])

  return <canvas ref={ref} />
}
