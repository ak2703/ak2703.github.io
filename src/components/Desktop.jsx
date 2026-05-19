import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
  FolderIcon, DocIcon, AppIcon, MeIcon, TrashIcon,
  MailIcon, MusicIcon, ReadmeIcon, StickyIcon, HddIcon
} from './Icons.jsx'
import {
  WelcomeWin, AboutWin, ExperienceWin, SkillsWin,
  ProjectsWin, ProjectDetailWin, WritingWin, NowWin,
  ContactWin, EducationWin, ReadmeWin, StickyWin
} from './WindowContents.jsx'
import CommandPalette from './CommandPalette.jsx'
import SnakeGame from './SnakeGame.jsx'

// ---- useBodyClass: add/remove class on body ----
function useBodyClass(cls) {
  useEffect(() => {
    document.body.classList.add(cls)
    return () => document.body.classList.remove(cls)
  }, [cls])
}

// ---- Drag hook ----
function useDrag(getPos, onChange, dragHandleRef, enabled = true) {
  useEffect(() => {
    const el = dragHandleRef.current
    if (!el || !enabled) return
    let startX, startY, origX, origY
    function onDown(e) {
      if (e.target.closest('.win-btn')) return
      e.preventDefault()
      const p = 'touches' in e ? e.touches[0] : e
      startX = p.clientX; startY = p.clientY
      const cur = getPos()
      origX = cur.x; origY = cur.y
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
      window.addEventListener('touchmove', onMove, { passive: false })
      window.addEventListener('touchend', onUp)
    }
    function onMove(e) {
      if (e.cancelable) e.preventDefault()
      const p = 'touches' in e ? e.touches[0] : e
      onChange({ x: origX + (p.clientX - startX), y: Math.max(36, origY + (p.clientY - startY)) })
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
    el.addEventListener('mousedown', onDown)
    el.addEventListener('touchstart', onDown, { passive: false })
    return () => {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('touchstart', onDown)
    }
  }, [getPos, onChange, dragHandleRef, enabled])
}

// ---- Menu component ----
function Menu({ trigger, items, align = 'left', openController }) {
  const [open, setOpen] = useState(false)
  const isOpen = openController ? openController.value === openController.id : open
  const setIsOpen = openController
    ? (v) => openController.set(v ? openController.id : null)
    : setOpen
  const ref = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    function onDoc(e) { if (!ref.current?.contains(e.target)) setIsOpen(false) }
    function onKey(e) { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  return (
    <div className="menu" ref={ref}>
      {trigger({ open: isOpen, toggle: () => setIsOpen(!isOpen) })}
      {isOpen && (
        <div className={`menu-dropdown ${align}`}>
          {items.map((it, i) => {
            if (it.divider) return <div key={i} className="menu-divider" />
            if (it.custom) return <div key={i}>{it.custom}</div>
            return (
              <div key={i}
                   className={`menu-row ${it.disabled ? 'disabled' : ''}`}
                   onClick={() => { if (it.disabled) return; it.action?.(); setIsOpen(false) }}>
                <span className="ic">{it.icon || ''}</span>
                <span className="lab">{it.label}</span>
                {it.hint && <span className="hint">{it.hint}</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ---- Window component ----
function Win({ win, focused, onFocus, onClose, onMin, onMax, onMove, children }) {
  const titleRef = useRef(null)
  const getPos = useCallback(() => ({ x: win.x, y: win.y }), [win.x, win.y])
  const handleChange = useCallback((p) => onMove(win.uid, p), [win.uid, onMove])
  useDrag(getPos, handleChange, titleRef, !win.maximized)

  const style = win.maximized
    ? { left: 0, top: 0, width: '100%', height: '100%', zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }

  return (
    <div
      className={`window ${focused ? 'focused' : ''} ${win.theme === 'sticky' ? 'sticky-note' : ''} ${win.minimized ? 'minimized' : ''} ${win.maximized ? 'maximized' : ''}`}
      style={style}
      onMouseDown={() => onFocus(win.uid)}>
      <div className="window-title striped" ref={titleRef}>
        <div className="window-buttons">
          <button className="win-btn close" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onClose(win.uid) }} title="Close">×</button>
          <button className="win-btn min"   onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onMin(win.uid) }} title="Minimize">−</button>
          <button className="win-btn max"   onMouseDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onMax(win.uid) }} title={win.maximized ? 'Restore' : 'Maximize'}>+</button>
        </div>
        <div className="window-name"><span className="ico">{win.icon}</span>{win.title}</div>
        <div style={{ width: 60 }} />
      </div>
      <div className={`window-body ${win.padded !== false ? 'padded' : ''}`}>{children}</div>
      {win.statusBar && (
        <div className="window-statusbar">
          <span>{win.statusBar.left}</span><span>{win.statusBar.right}</span>
        </div>
      )}
    </div>
  )
}

// ---- Desktop icon ----
function DesktopIcon({ icon, name, onOpen }) {
  const [selected, setSelected] = useState(false)
  const lastClick = useRef(0)
  function handleClick(e) {
    e.stopPropagation()
    const now = Date.now()
    if (now - lastClick.current < 350) { onOpen(); setSelected(false) }
    else { setSelected(true); setTimeout(() => setSelected(false), 2500) }
    lastClick.current = now
  }
  return (
    <div className={`icon ${selected ? 'selected' : ''}`} onClick={handleClick}
         onDoubleClick={(e) => { e.stopPropagation(); onOpen() }}>
      {icon}
      <div className="name">{name}</div>
    </div>
  )
}

// ---- Clock ----
function MenuClock() {
  const [t, setT] = useState(() => fmt())
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  function fmt() {
    const d = new Date()
    const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]
    const p = (n) => String(n).padStart(2, '0')
    let h = d.getHours()
    const ampm = h >= 12 ? 'PM' : 'AM'
    h = h % 12 || 12
    return `${day} ${p(h)}:${p(d.getMinutes())} ${ampm}`
  }
  return <span>{t}</span>
}

// ---- Spawn positions ----
const SPAWN_POSITIONS = [
  { x: 340, y: 80 }, { x: 400, y: 110 }, { x: 460, y: 140 },
  { x: 300, y: 170 }, { x: 520, y: 90 },  { x: 360, y: 200 },
]

// ---- Contact head ----
function ContactHead() {
  return (
    <div className="menu-contact-head">
      <div className="avatar">AV</div>
      <div className="info">
        <div className="nm">Akshay Vilekar</div>
        <div className="sub">backend.engineer · indore, in</div>
      </div>
    </div>
  )
}

// ---- Build window spec ----
function buildSpec(id, data, openProject, payload, openNote) {
  if (id === 'project' && payload) {
    return {
      uid: `project-${payload.title}`,
      title: payload.title,
      icon: '📄',
      w: 560, h: 560,
      content: <ProjectDetailWin p={payload} />
    }
  }
  if (id === 'note') {
    const num = payload?.num || 1
    const title = payload?.title || `untitled-${num}.txt`
    return {
      uid: payload?.uid || `note-${num}-${Date.now()}`,
      title,
      icon: '📄',
      w: 420, h: 320,
      statusBar: { left: '0 b · empty', right: '● unsaved' },
      content: (
        <div className="note-empty" contentEditable="true" suppressContentEditableWarning={true}
             data-placeholder="(empty note. start typing…)">
          {payload?.body || ''}
        </div>
      )
    }
  }
  const map = {
    welcome:    { uid: 'welcome',    title: 'welcome.rtf',   icon: '📄', w: 580, h: 540, statusBar: { left: '1.2 kb · text', right: '● saved' }, content: <WelcomeWin onOpenNote={openNote} /> },
    about:      { uid: 'about',      title: 'about-me.txt',  icon: '👤', w: 600, h: 540, content: <AboutWin data={data} /> },
    experience: { uid: 'experience', title: 'experience/',   icon: '📁', w: 660, h: 540, content: <ExperienceWin data={data} /> },
    skills:     { uid: 'skills',     title: 'skills.app',    icon: '⚙',  w: 480, h: 520, content: <SkillsWin data={data} /> },
    projects:   { uid: 'projects',   title: 'projects/',     icon: '📁', w: 580, h: 480, content: <ProjectsWin data={data} onOpen={(p) => openProject(p)} /> },
    writing:    { uid: 'writing',    title: 'writing/',      icon: '📁', w: 560, h: 380, content: <WritingWin data={data} onOpenNote={openNote} /> },
    now:        { uid: 'now',        title: 'now.app',       icon: '♪',  w: 480, h: 420, content: <NowWin data={data} /> },
    contact:    { uid: 'contact',    title: 'contact.app',   icon: '💌', w: 480, h: 440, content: <ContactWin data={data} /> },
    education:  { uid: 'education',  title: 'education.txt', icon: '🎓', w: 560, h: 420, content: <EducationWin data={data} /> },
    sticky:     { uid: 'sticky',     title: 'notes.sticky',  icon: '📌', w: 360, h: 280, theme: 'sticky', content: <StickyWin /> },
    readme:     { uid: 'readme',     title: 'README.md',     icon: '📄', w: 640, h: 600, padded: false, content: <ReadmeWin data={data} /> },
    hdd:        { uid: 'hdd',        title: 'akshay.os',     icon: '💾', w: 480, h: 360, padded: false, content: (
      <div className="readme">
        <pre className="ascii">{`  ╔════════════════════╗\n  ║   AKSHAY · OS v1   ║\n  ╚════════════════════╝`}</pre>
        <h2>System info</h2>
        <p>cpu · 1 brain, 2 cores (often kafka-bound)<br/>ram · ~12 tabs of stack overflow<br/>os · debian / mac / mind<br/>uptime · 9.4 yrs of shipping code<br/>locale · IST · UTC+5:30</p>
        <h2>Mounted volumes</h2>
        <ul>
          <li><code>/work</code> · Micro1 — backend</li>
          <li><code>/side</code> · reinforce-backend</li>
          <li><code>/play</code> · rust + tokio</li>
          <li><code>/idle</code> · filter coffee + podcasts</li>
        </ul>
      </div>
    ) },
    trash: { uid: 'trash', title: 'trash', icon: '🗑', w: 420, h: 260, content: (
      <div style={{ textAlign: 'center', padding: '30px 20px' }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🗑</div>
        <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 20, marginBottom: 6 }}>trash is empty.</div>
        <div style={{ fontFamily: 'var(--f-hand)', fontSize: 18, color: 'var(--mute)', lineHeight: 1.3 }}>
          (i deleted that one bad bash alias.<br/>everything else stays.)
        </div>
      </div>
    ) },
  }
  return map[id] || null
}

// ---- Main Desktop component ----
export default function Desktop({ data }) {
  useBodyClass('desktop-mode')

  const [windows, setWindows] = useState([])
  const [focusId, setFocusId] = useState(null)
  const zRef = useRef(10)
  const spawnIdx = useRef(0)
  const noteCount = useRef(0)
  const [cmd, setCmd] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmd(c => !c) }
      else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') { e.preventDefault(); openNote() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openWin = useCallback((id, payload = null) => {
    const spec = buildSpec(id, data, (p) => openWin('project', p), payload, (p) => openNote(p))
    if (!spec) return
    zRef.current += 1

    setWindows(prev => {
      const existing = prev.find(w => w.uid === spec.uid)
      if (existing) {
        setFocusId(spec.uid)
        return prev.map(w => w.uid === spec.uid ? { ...w, z: zRef.current, minimized: false } : w)
      }
      const isMobile = window.innerWidth < 760
      let pos
      if (isMobile) {
        const vw = window.innerWidth
        const vh = window.innerHeight - 34 - 56
        pos = { x: 6, y: 44, w: Math.min(spec.w || 560, vw - 12), h: Math.min(spec.h || 440, vh - 16) }
      } else {
        const sp = SPAWN_POSITIONS[spawnIdx.current % SPAWN_POSITIONS.length]
        spawnIdx.current += 1
        const vw = window.innerWidth, vh = window.innerHeight
        pos = {
          x: Math.max(8, Math.min(sp.x, vw - (spec.w || 560) - 8)),
          y: Math.max(44, Math.min(sp.y, vh - 140)),
          w: spec.w || 560, h: spec.h || 440,
        }
      }
      setFocusId(spec.uid)
      return [...prev, { ...spec, ...pos, z: zRef.current, minimized: false, maximized: false }]
    })
  }, [data])

  const openNote = useCallback((payload = null) => {
    noteCount.current += 1
    const merged = payload && payload.title
      ? { ...payload, num: noteCount.current, uid: `note-${payload.title}-${noteCount.current}` }
      : { num: noteCount.current }
    openWin('note', merged)
  }, [openWin])

  useEffect(() => { openWin('welcome') }, [openWin])

  function closeWin(uid) { setWindows(prev => prev.filter(w => w.uid !== uid)); setFocusId(null) }
  function minWin(uid)   { setWindows(prev => prev.map(w => w.uid === uid ? { ...w, minimized: !w.minimized } : w)) }
  function maxWin(uid)   { setWindows(prev => prev.map(w => w.uid === uid ? { ...w, maximized: !w.maximized } : w)) }
  function focusWin(uid) {
    zRef.current += 1
    const z = zRef.current
    setFocusId(uid)
    setWindows(prev => prev.map(w => w.uid === uid ? { ...w, z, minimized: false } : w))
  }
  function moveWin(uid, pos) {
    setWindows(prev => prev.map(w => w.uid === uid ? { ...w, x: pos.x, y: pos.y } : w))
  }

  function tileWindows() {
    setWindows(prev => {
      const visible = prev.filter(w => !w.minimized)
      const n = visible.length
      if (n === 0) return prev
      const cols = Math.ceil(Math.sqrt(n))
      const rows = Math.ceil(n / cols)
      const vw = window.innerWidth, vh = window.innerHeight - 34 - 56
      const cw = Math.floor(vw / cols), ch = Math.floor(vh / rows)
      const positions = new Map()
      visible.forEach((w, i) => {
        const r = Math.floor(i / cols)
        const c = i % cols
        positions.set(w.uid, { x: c * cw + 6, y: r * ch + 6, w: cw - 12, h: ch - 12 })
      })
      return prev.map(w => positions.has(w.uid) ? { ...w, ...positions.get(w.uid), maximized: false } : w)
    })
  }

  const menuController = { value: openMenu, set: setOpenMenu }

  const DESKTOP_ITEMS = [
    { id: 'welcome',    name: 'welcome.rtf',   icon: <DocIcon color="var(--paper)" /> },
    { id: 'about',      name: 'about-me.txt',  icon: <MeIcon /> },
    { id: 'experience', name: 'experience/',   icon: <FolderIcon color="var(--yellow)" /> },
    { id: 'projects',   name: 'projects/',     icon: <FolderIcon color="var(--mint)" /> },
    { id: 'skills',     name: 'skills.app',    icon: <AppIcon color="var(--purple)" glyph="⚙" /> },
    { id: 'writing',    name: 'writing/',      icon: <FolderIcon color="var(--pink)" /> },
    { id: 'now',        name: 'now.app',       icon: <MusicIcon /> },
    { id: 'contact',    name: 'contact.app',   icon: <MailIcon /> },
    { id: 'education',  name: 'education.txt', icon: <DocIcon color="var(--orange)" /> },
    { id: 'sticky',     name: 'notes.sticky',  icon: <StickyIcon /> },
    { id: 'readme',     name: 'README.md',     icon: <ReadmeIcon /> },
    { id: 'hdd',        name: 'akshay.os',     icon: <HddIcon /> },
    { id: 'trash',      name: 'trash',         icon: <TrashIcon /> },
  ]

  const akshayItems = [
    { custom: <ContactHead /> },
    { icon: '✉', label: 'Email me',       hint: '↗', action: () => window.location.href = `mailto:${data.email}` },
    { icon: 'in', label: 'LinkedIn',      hint: '↗', action: () => window.open(data.linkedin, '_blank') },
    { icon: '𝕏', label: 'Twitter',        hint: '↗', action: () => window.open(data.twitter, '_blank') },
    { icon: 'gh', label: 'GitHub',        hint: '↗', action: () => window.open(data.github, '_blank') },
    { divider: true },
    { icon: '👤', label: 'About me',      hint: '↵', action: () => openWin('about') },
    { icon: '💾', label: 'About this OS', hint: '↵', action: () => openWin('hdd') },
    { divider: true },
    { icon: '↗', label: 'Open contact.app', action: () => openWin('contact') },
  ]
  const fileItems = [
    { icon: '📄', label: 'New Note',      hint: '⌘N', action: () => openNote() },
    { icon: '📂', label: 'Open…',         hint: '⌘K', action: () => setCmd(true) },
    { divider: true },
    { icon: '📄', label: 'welcome.rtf',   action: () => openWin('welcome') },
    { icon: '👤', label: 'about-me.txt',  action: () => openWin('about') },
    { icon: '📁', label: 'projects/',     action: () => openWin('projects') },
    { icon: '📁', label: 'experience/',   action: () => openWin('experience') },
    { divider: true },
    { icon: '✕', label: 'Close all windows', action: () => setWindows([]) },
  ]
  const editItems = [
    { icon: '↶', label: 'Undo',  hint: '⌘Z',  disabled: true },
    { icon: '↷', label: 'Redo',  hint: '⇧⌘Z', disabled: true },
    { divider: true },
    { icon: '✄', label: 'Cut',   hint: '⌘X',  disabled: true },
    { icon: '⎘', label: 'Copy',  hint: '⌘C',  disabled: true },
    { icon: '📋', label: 'Paste', hint: '⌘V',  disabled: true },
    { divider: true },
    { icon: '🔍', label: 'Find', hint: '⌘K',  action: () => setCmd(true) },
  ]
  const viewItems = [
    { icon: '▦', label: 'Tile windows',    action: tileWindows },
    { icon: '↻', label: 'Restore desktop', action: () => { setWindows([]); openWin('welcome') } },
    { divider: true },
    { icon: '♪', label: 'Now playing',     action: () => openWin('now') },
    { icon: '📌', label: 'Sticky notes',   action: () => openWin('sticky') },
    { icon: '🗑', label: 'Trash',          action: () => openWin('trash') },
  ]
  const helpItems = [
    { icon: '?',  label: 'Welcome',           action: () => openWin('welcome') },
    { icon: '📖', label: 'README.md',         action: () => openWin('readme') },
    { icon: '💾', label: 'About akshay.os',   action: () => openWin('hdd') },
    { divider: true },
    { icon: '✉', label: 'Contact me',        action: () => openWin('contact') },
    { icon: '↗', label: 'GitHub repo',       action: () => window.open(data.github, '_blank') },
  ]

  const contactItems = [
    { custom: <ContactHead /> },
    { icon: '✉', label: 'Email',    hint: 'contact@…',          action: () => window.location.href = `mailto:${data.email}` },
    { icon: 'in', label: 'LinkedIn', hint: '/in/akshay-vilekar', action: () => window.open(data.linkedin, '_blank') },
    { icon: '𝕏', label: 'Twitter',  hint: data.twitterHandle,   action: () => window.open(data.twitter, '_blank') },
    { icon: 'gh', label: 'GitHub',  hint: '@ak2703',             action: () => window.open(data.github, '_blank') },
    { divider: true },
    { icon: '📇', label: 'Open contact.app', hint: '↵', action: () => openWin('contact') },
  ]

  // Flat list of skill names from config — becomes snake food
  const skillNames = useMemo(
    () => data.skills.flatMap(g => g.items.map(([name]) => name)),
    [data.skills]
  )

  // Open, non-minimized, non-maximized windows in screen (viewport) coords
  // win.y is desktop-relative so we add MENU_H (34px) to convert to viewport coords
  const visibleWindows = useMemo(
    () => windows
      .filter(w => !w.minimized && !w.maximized)
      .map(w => ({ x: w.x, y: w.y + 34, w: w.w, h: w.h })),
    [windows]
  )

  return (
    <>
      <SnakeGame skills={skillNames} openWindows={visibleWindows} />

      <div className="menubar">
        <div className="apple">★</div>

        <Menu openController={{ id: 'akshay', ...menuController }} align="left"
          trigger={({ open, toggle }) => <div className={`m-item bold ${open ? 'open' : ''}`} onClick={toggle}>akshay.os</div>}
          items={akshayItems}
        />
        <Menu openController={{ id: 'file', ...menuController }}
          trigger={({ open, toggle }) => <div className={`m-item ${open ? 'open' : ''}`} onClick={toggle}>File</div>}
          items={fileItems}
        />
        <Menu openController={{ id: 'edit', ...menuController }}
          trigger={({ open, toggle }) => <div className={`m-item ${open ? 'open' : ''}`} onClick={toggle}>Edit</div>}
          items={editItems}
        />
        <Menu openController={{ id: 'view', ...menuController }}
          trigger={({ open, toggle }) => <div className={`m-item ${open ? 'open' : ''}`} onClick={toggle}>View</div>}
          items={viewItems}
        />
        <Menu openController={{ id: 'help', ...menuController }}
          trigger={({ open, toggle }) => <div className={`m-item help ${open ? 'open' : ''}`} onClick={toggle}>Help</div>}
          items={helpItems}
        />

        <div className="spacer" />

        <div className="meta">
          <Menu openController={{ id: 'contact', ...menuController }} align="right"
            trigger={({ open, toggle }) => (
              <button className={`contact-button ${open ? 'open' : ''}`} onClick={toggle} aria-label="Contact menu">
                <span style={{ fontSize: 13 }}>✉</span>
                <span>contact</span>
              </button>
            )}
            items={contactItems}
          />
          <span className="hide-sm">indore, in</span>
          <span className="live">online</span>
          <MenuClock />
        </div>
      </div>

      <div className="desktop" onMouseDown={() => setOpenMenu(null)}>
        <div className="desktop-icons">
          {DESKTOP_ITEMS.map(it =>
            <DesktopIcon key={it.id} icon={it.icon} name={it.name} onOpen={() => openWin(it.id)} />
          )}
        </div>

        {windows.map(w =>
          <Win key={w.uid} win={w} focused={focusId === w.uid}
               onFocus={focusWin} onClose={closeWin} onMin={minWin} onMax={maxWin} onMove={moveWin}>
            {w.content}
          </Win>
        )}
      </div>

      <div className="dock">
        <button className="start-btn" onClick={() => setCmd(true)}>
          <span className="dot" /> start
        </button>
        <div className="open-list">
          {windows.map(w =>
            <button key={w.uid}
              className={`dock-tab ${focusId === w.uid && !w.minimized ? 'active' : ''}`}
              onClick={() => { if (focusId === w.uid && !w.minimized) minWin(w.uid); else focusWin(w.uid) }}>
              <span>{w.icon}</span><span>{w.title}</span>
            </button>
          )}
        </div>
        <div className="meta-right">
          <span className="clock hide-sm"><MenuClock /></span>
          <button className="iconbtn" onClick={() => setCmd(true)} title="Open command palette">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5 L14 14" />
            </svg>
          </button>
        </div>
      </div>

      <CommandPalette open={cmd} onClose={() => setCmd(false)} openWin={openWin} extraItems={[
        { sec: 'Actions', icon: '📄', label: 'New Note', action: () => openNote() },
        { sec: 'Actions', icon: '▦', label: 'Tile windows', action: tileWindows },
      ]} />
    </>
  )
}
