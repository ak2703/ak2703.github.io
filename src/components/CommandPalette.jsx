import { useState, useEffect, useRef, useMemo } from 'react'

export default function CommandPalette({ open, onClose, openWin, extraItems = [] }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 30) }
  }, [open])

  const items = useMemo(() => ([
    { sec: 'Open', icon: '📄', label: 'welcome.rtf',   id: 'welcome',    hint: '↵' },
    { sec: 'Open', icon: '👤', label: 'about-me.txt',  id: 'about',      hint: '↵' },
    { sec: 'Open', icon: '📁', label: 'experience/',   id: 'experience', hint: '↵' },
    { sec: 'Open', icon: '📁', label: 'projects/',     id: 'projects',   hint: '↵' },
    { sec: 'Open', icon: '⚙',  label: 'skills.app',   id: 'skills',     hint: '↵' },
    { sec: 'Open', icon: '📁', label: 'writing/',      id: 'writing',    hint: '↵' },
    { sec: 'Open', icon: '♪',  label: 'now.app',      id: 'now',        hint: '↵' },
    { sec: 'Open', icon: '💌', label: 'contact.app',  id: 'contact',    hint: '↵' },
    { sec: 'Open', icon: '🎓', label: 'education.txt', id: 'education', hint: '↵' },
    { sec: 'Open', icon: '📌', label: 'notes.sticky', id: 'sticky',     hint: '↵' },
    { sec: 'Open', icon: '📄', label: 'README.md',    id: 'readme',     hint: '↵' },
    { sec: 'Open', icon: '💾', label: 'akshay.os',    id: 'hdd',        hint: '↵' },
    ...extraItems,
    { sec: 'Quick links', icon: '✉',  label: 'Email Akshay',  action: () => window.location.href = 'mailto:contact@akshayvilekar.me' },
    { sec: 'Quick links', icon: 'in', label: 'Open LinkedIn',  action: () => window.open('https://www.linkedin.com/in/akshay-vilekar-b25a2584/', '_blank') },
    { sec: 'Quick links', icon: '𝕏',  label: 'Open Twitter',  action: () => window.open('https://twitter.com/ak2703', '_blank') },
    { sec: 'Quick links', icon: 'gh', label: 'Open GitHub',    action: () => window.open('https://github.com/ak2703', '_blank') },
  ]), [extraItems])

  const filtered = useMemo(() => {
    if (!q.trim()) return items
    const needle = q.toLowerCase()
    return items.filter(i => i.label.toLowerCase().includes(needle) || i.sec.toLowerCase().includes(needle))
  }, [q, items])

  useEffect(() => { setActive(0) }, [q])

  function pick(it) {
    if (!it) return
    if (it.action) it.action()
    else if (it.id) openWin(it.id)
    onClose()
  }

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(filtered.length - 1, a + 1)) }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(a => Math.max(0, a - 1)) }
      else if (e.key === 'Enter')     { e.preventDefault(); pick(filtered[active]) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, filtered, active, onClose])

  if (!open) return null

  const groups = {}
  filtered.forEach((it, i) => { (groups[it.sec] ||= []).push({ ...it, _idx: i }) })

  return (
    <div className="cmdk-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="cmdk" role="dialog">
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="search files & apps…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="cmdk-list">
          {filtered.length === 0 && <div className="cmdk-empty">no matches.</div>}
          {Object.entries(groups).map(([sec, list]) => (
            <div key={sec}>
              <div className="cmdk-section-label">{sec}</div>
              {list.map(it => (
                <div key={it.label} className="cmdk-item" data-active={it._idx === active}
                     onMouseEnter={() => setActive(it._idx)} onClick={() => pick(it)}>
                  <span className="ico">{it.icon}</span>
                  <span>{it.label}</span>
                  <span className="meta">{it.hint || ''}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
