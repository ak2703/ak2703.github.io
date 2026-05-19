import { useEffect, useRef } from 'react'

const GRID      = 20
const SPEED     = 150
const MENU_H    = 34
const DOCK_H    = 56
const FOOD_COUNT = 6
const PILL_FONT  = 'bold 10px "JetBrains Mono", monospace'
const PILL_PAD_X = 8   // horizontal padding inside pill
const PILL_PAD_Y = 2   // vertical padding (shrinks pill height from GRID)

const PILL_COLORS = [
  { bg: 'rgba(255,211,77,0.92)',  border: 'rgba(26,24,20,0.85)', text: '#1a1814' }, // yellow
  { bg: 'rgba(105,210,158,0.92)', border: 'rgba(26,24,20,0.85)', text: '#1a1814' }, // mint
  { bg: 'rgba(255,143,184,0.92)', border: 'rgba(26,24,20,0.85)', text: '#1a1814' }, // pink
  { bg: 'rgba(42,109,242,0.92)',  border: 'rgba(26,24,20,0.85)', text: '#ffffff' }, // blue
  { bg: 'rgba(154,107,255,0.92)', border: 'rgba(26,24,20,0.85)', text: '#ffffff' }, // purple
  { bg: 'rgba(255,147,51,0.92)',  border: 'rgba(26,24,20,0.85)', text: '#ffffff' }, // orange
  { bg: 'rgba(238,77,58,0.92)',   border: 'rgba(26,24,20,0.85)', text: '#ffffff' }, // red
  { bg: 'rgba(70,194,194,0.92)',  border: 'rgba(26,24,20,0.85)', text: '#1a1814' }, // teal
]

export default function SnakeGame({ skills = [], openWindows = [] }) {
  const canvasRef  = useRef(null)
  const windowsRef = useRef(openWindows)
  const skillsRef  = useRef(skills)

  useEffect(() => { windowsRef.current = openWindows }, [openWindows])
  useEffect(() => { skillsRef.current  = skills       }, [skills])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W, H, cols, rows
    let snake, dir, nextDir, foods, score, intervalId

    // ── size helpers ─────────────────────────────────────────────────────────
    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      cols = Math.floor(W / GRID)
      rows = Math.floor(H / GRID)
    }

    // How many grid cells does this skill label need?
    // Pill pixel width = text width + 2 * PILL_PAD_X  →  ceil to nearest cell
    function cellSpanFor(skill) {
      ctx.font = PILL_FONT
      const pixelW = ctx.measureText(skill).width + PILL_PAD_X * 2
      return Math.max(1, Math.ceil(pixelW / GRID))
    }

    // ── forbidden-cell check ─────────────────────────────────────────────────
    function isForbidden(gx, gy) {
      const px = gx * GRID, py = gy * GRID
      if (py < MENU_H)            return true   // menu bar
      if (py + GRID > H - DOCK_H) return true   // dock
      for (const win of windowsRef.current) {
        if (
          px + GRID > win.x - GRID &&
          px        < win.x + win.w + GRID &&
          py + GRID > win.y - GRID &&
          py        < win.y + win.h + GRID
        ) return true
      }
      return false
    }

    // ── occupied cell sets ───────────────────────────────────────────────────
    function snakeCellSet() {
      return new Set(snake.map(s => `${s.x},${s.y}`))
    }

    // All cells currently covered by food pills (multi-cell aware)
    function foodCellSet() {
      const s = new Set()
      foods.forEach(f => {
        for (let dx = 0; dx < f.span; dx++) s.add(`${f.x + dx},${f.y}`)
      })
      return s
    }

    // ── find valid start positions for a pill of given span ──────────────────
    function validStartCells(span) {
      const sc = snakeCellSet()
      const fc = foodCellSet()
      const valid = []

      // Pill occupies cells x … x+span-1 — don't let it run off the right edge
      for (let x = 0; x <= cols - span; x++) {
        for (let y = 0; y < rows; y++) {
          let ok = true
          for (let dx = 0; dx < span; dx++) {
            const key = `${x + dx},${y}`
            if (isForbidden(x + dx, y) || sc.has(key) || fc.has(key)) {
              ok = false
              break
            }
          }
          if (ok) valid.push({ x, y })
        }
      }
      return valid
    }

    // ── place one food item ──────────────────────────────────────────────────
    function pickSkill() {
      const s = skillsRef.current
      return s.length ? s[Math.floor(Math.random() * s.length)] : 'skill'
    }

    function placeOneFood() {
      const skill = pickSkill()
      const span  = cellSpanFor(skill)
      const cells = validStartCells(span)
      if (!cells.length) return null

      const cell = cells[Math.floor(Math.random() * cells.length)]
      return {
        x:     cell.x,
        y:     cell.y,
        skill,
        span,                                         // grid cells wide
        color: Math.floor(Math.random() * PILL_COLORS.length),
      }
    }

    function scatterFoods() {
      foods = []
      for (let i = 0; i < FOOD_COUNT; i++) {
        const f = placeOneFood()
        if (f) foods.push(f)
      }
    }

    // ── init ─────────────────────────────────────────────────────────────────
    function init() {
      resize()
      const cx = Math.floor(cols / 2)
      const cy = Math.floor(rows / 2)
      snake   = [{ x: cx, y: cy }, { x: cx - 1, y: cy }, { x: cx - 2, y: cy }]
      dir     = { x: 1, y: 0 }
      nextDir = { x: 1, y: 0 }
      score   = 0
      foods   = []
      scatterFoods()
    }

    // ── draw a single pill (left-aligned at pixel px, py) ───────────────────
    function drawPill(f) {
      const c    = PILL_COLORS[f.color % PILL_COLORS.length]
      const px   = f.x * GRID
      const py   = f.y * GRID
      const boxW = f.span * GRID - 4          // fills its cells minus a 2px gap each side
      const boxH = GRID - PILL_PAD_Y * 2
      const bx   = px + 2
      const by   = py + PILL_PAD_Y

      // hard ink shadow
      ctx.fillStyle = 'rgba(26,24,20,0.55)'
      ctx.beginPath()
      ctx.roundRect(bx + 2, by + 2, boxW, boxH, 4)
      ctx.fill()

      // body
      ctx.fillStyle = c.bg
      ctx.beginPath()
      ctx.roundRect(bx, by, boxW, boxH, 4)
      ctx.fill()

      // border
      ctx.strokeStyle = c.border
      ctx.lineWidth   = 1.5
      ctx.beginPath()
      ctx.roundRect(bx, by, boxW, boxH, 4)
      ctx.stroke()

      // label — centred inside the pill
      ctx.fillStyle    = c.text
      ctx.font         = PILL_FONT
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(f.skill, bx + boxW / 2, py + GRID / 2 + 0.5)
    }

    // ── game step ────────────────────────────────────────────────────────────
    function step() {
      dir = nextDir
      const head = {
        x: (snake[0].x + dir.x + cols) % cols,
        y: (snake[0].y + dir.y + rows) % rows,
      }

      // Collision: head lands on ANY cell covered by the pill
      const eatenIdx = foods.findIndex(f =>
        head.y === f.y && head.x >= f.x && head.x < f.x + f.span
      )
      const ate      = eatenIdx !== -1
      const newSnake = [head, ...snake]

      if (!ate) {
        newSnake.pop()
      } else {
        score++
        foods.splice(eatenIdx, 1)
        const fresh = placeOneFood()
        if (fresh) foods.push(fresh)
      }
      snake = newSnake
    }

    // ── draw everything ──────────────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Snake body
      snake.forEach(({ x, y }, i) => {
        ctx.fillStyle = i === 0 ? 'rgba(26,24,20,0.28)' : 'rgba(26,24,20,0.13)'
        ctx.beginPath()
        ctx.roundRect(x * GRID + 2, y * GRID + 2, GRID - 4, GRID - 4, 3)
        ctx.fill()
      })

      // Food pills
      foods.forEach(drawPill)

      // Score
      ctx.fillStyle    = 'rgba(26,24,20,0.2)'
      ctx.font         = '11px "JetBrains Mono", monospace'
      ctx.textAlign    = 'right'
      ctx.textBaseline = 'bottom'
      ctx.fillText(`🐍 ${score}`, W - 14, H - DOCK_H - 6)
    }

    // ── keyboard ─────────────────────────────────────────────────────────────
    function onKey(e) {
      const a = document.activeElement
      if (a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' ||
                a.getAttribute('contenteditable') === 'true')) return
      switch (e.key) {
        case 'ArrowUp':    if (dir.y === 0) { nextDir = { x: 0, y: -1 }; e.preventDefault() } break
        case 'ArrowDown':  if (dir.y === 0) { nextDir = { x: 0, y:  1 }; e.preventDefault() } break
        case 'ArrowLeft':  if (dir.x === 0) { nextDir = { x: -1, y: 0 }; e.preventDefault() } break
        case 'ArrowRight': if (dir.x === 0) { nextDir = { x:  1, y: 0 }; e.preventDefault() } break
      }
    }

    function tick() { step(); draw() }

    init()
    draw()
    intervalId = setInterval(tick, SPEED)
    window.addEventListener('keydown', onKey)
    const ro = new ResizeObserver(() => { resize(); draw() })
    ro.observe(document.body)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener('keydown', onKey)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
