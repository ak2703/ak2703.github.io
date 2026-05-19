import { useState } from 'react'
import { DocIcon } from './Icons.jsx'

export function WelcomeWin({ onOpenNote }) {
  return (
    <div className="welcome">
      <div className="hi">hi, i'm akshay 👋</div>
      <h1>
        I build <span className="hl">backend systems</span> that <span className="scribble">don't fall over</span>.
      </h1>
      <p>
        Eight years shipping the parts of software most people never see — <strong>data models</strong>,
        event flows, the contract between services. Currently building backend tooling for
        <strong> RLHF &amp; prompt-engineering workflows</strong> at <strong>Micro1</strong>.
      </p>
      <p style={{ marginTop: 16, fontFamily: 'var(--f-mono)', fontSize: 13 }}>
        ↓ <strong>tip:</strong> double-click any folder/file on the desktop to open it.
        Or hit <span className="kbd">⌘K</span> to jump anywhere.
      </p>
      <div className="arrows">
        <div className="row"><span className="k">currently</span><span className="v"><strong>Sr. Backend Engineer @ Micro1</strong></span></div>
        <div className="row"><span className="k">based in</span><span className="v">Indore, India · IST</span></div>
        <div className="row"><span className="k">stack</span><span className="v">java · spring · kafka · postgres · aws</span></div>
        <div className="row"><span className="k">open to</span><span className="v">Senior / Staff IC roles</span></div>
      </div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1.5px dashed var(--mute)' }}>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--mute)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>★ scratch pad</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['thoughts.txt', 'todo.md', 'kafka-notes.md', 'untitled.txt'].map((nm) => (
            <button key={nm}
              style={{ background: 'transparent', textAlign: 'left', padding: '4px 6px', borderRadius: 4, fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--ink)', cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center' }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'var(--paper-2)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
              onClick={() => onOpenNote?.({ title: nm, body: '' })}>
              <span style={{ color: 'var(--mute)' }}>📄</span>
              <span style={{ flex: 1 }}>{nm}</span>
              <span style={{ fontSize: 10, color: 'var(--mute)' }}>0 b</span>
            </button>
          ))}
        </div>
        <div style={{ fontFamily: 'var(--f-hand)', fontSize: 16, color: 'var(--mute)', marginTop: 8 }}>
          ↑ click to open as an empty note
        </div>
      </div>
    </div>
  )
}

export function AboutWin({ data }) {
  return (
    <div className="win-body">
      <h2 className="win-h">a short <em>introduction</em></h2>
      <div className="win-sub">~/about-me.txt · 1.2k</div>
      <p style={{ fontFamily: 'var(--f-display)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.3, color: 'var(--ink)', marginBottom: 16 }}>
        {data.about.lead}
      </p>
      {data.about.body.map((p, i) => <p key={i}>{p}</p>)}

      <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 13, margin: '26px 0 12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>★ things i believe</h4>
      <ul style={{ paddingLeft: 18, margin: 0, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.7 }}>
        {data.about.principles.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <h4 style={{ fontFamily: 'var(--f-display)', fontSize: 13, margin: '26px 0 12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mute)' }}>★ ask me about</h4>
      <div className="stickers">
        {data.askMeAbout.map(s => <span key={s.t} className={`sticker ${s.c}`}>{s.t}</span>)}
      </div>
    </div>
  )
}

export function ExperienceWin({ data }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="win-body">
      <h2 className="win-h">where i've <em>built things</em></h2>
      <div className="win-sub">~/experience/ · {data.experience.length} entries</div>
      <div className="exp-list">
        {data.experience.map((e, i) => (
          <div key={i} className="exp-entry" data-open={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <div className="exp-entry-head">
              <div>
                <div className="role">
                  {e.role} <span className="at">@ {e.company}</span>
                  {e.badge && <span className="badge">{e.badge}</span>}
                </div>
                <div className="place">{e.place}</div>
              </div>
              <div className="when">{e.when}</div>
            </div>
            <div className="tags">
              {e.tags.map((t, j) => <span key={t} className={`chip c${(j % 4) + 1}`}>{t}</span>)}
            </div>
            <div className="detail"><div><p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>{e.detail}</p></div></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkillsWin({ data }) {
  return (
    <div className="win-body">
      <h2 className="win-h">stack <em>i reach for</em></h2>
      <div className="win-sub">~/skills.app · 4 groups</div>
      <div className="stack-list">
        {data.skills.map(g => (
          <div key={g.group} className="stack-group">
            <h4>{g.group}</h4>
            <ul>
              {g.items.map(([n, lvl]) => <li key={n}><span>{n}</span><span className="lvl">{lvl}</span></li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjVis({ kind }) {
  if (kind === 'rlhf') return (
    <svg viewBox="0 0 400 300">
      <rect width="400" height="300" fill="var(--paper)"/>
      {[0,1,2,3,4].map(i => <circle key={i} cx="60" cy={60+i*40} r="10" fill="var(--blue)" stroke="var(--ink)" strokeWidth="1.5"/>)}
      {[0,1,2,3,4].map(i => <line key={i} x1="70" y1={60+i*40} x2="170" y2="150" stroke="var(--ink)" strokeWidth="1"/>)}
      <rect x="170" y="125" width="80" height="50" rx="6" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2"/>
      <text x="210" y="155" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="11" fill="var(--ink)" fontWeight="600">queue</text>
      <line x1="250" y1="150" x2="310" y2="150" stroke="var(--ink)" strokeWidth="2" strokeDasharray="4 3"/>
      <polygon points="310,150 304,146 304,154" fill="var(--ink)"/>
      <rect x="312" y="115" width="70" height="70" rx="8" fill="var(--red)" stroke="var(--ink)" strokeWidth="2"/>
      <text x="347" y="155" textAnchor="middle" fontFamily="var(--f-mono)" fontSize="11" fill="#fff" fontWeight="600">model</text>
      <text x="20" y="285" fill="var(--mute)" fontFamily="var(--f-mono)" fontSize="10">annotators → queue → train</text>
    </svg>
  )
  if (kind === 'erp') return (
    <svg viewBox="0 0 400 300">
      <rect width="400" height="300" fill="var(--paper)"/>
      {Array.from({length: 9}).map((_, i) => {
        const colors = ['var(--blue)', 'var(--mint)', 'var(--yellow)', 'var(--pink)']
        return <rect key={i} x="30" y={36 + i*26} width={110 + Math.sin(i*1.3)*60 + 60} height="14" rx="3" fill={colors[i%4]} stroke="var(--ink)" strokeWidth="1.5"/>
      })}
      <text x="30" y="285" fill="var(--mute)" fontFamily="var(--f-mono)" fontSize="10">sonis · reporting · p95 ↓ 80%</text>
    </svg>
  )
  if (kind === 'graph') return (
    <svg viewBox="0 0 400 300">
      <rect width="400" height="300" fill="var(--paper)"/>
      {[[80,80,'var(--red)'],[200,60,'var(--blue)'],[320,90,'var(--yellow)'],[110,180,'var(--mint)'],[210,200,'var(--pink)'],[310,200,'var(--blue)'],[200,260,'var(--red)']].map(([x,y,c], i) =>
        <circle key={i} cx={x} cy={y} r="11" fill={c} stroke="var(--ink)" strokeWidth="1.5"/>
      )}
      {[[80,80,200,60],[200,60,320,90],[80,80,110,180],[200,60,210,200],[320,90,310,200],[110,180,210,200],[210,200,310,200],[210,200,200,260]].map(([x1,y1,x2,y2], i) =>
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth="1.5"/>
      )}
      <text x="20" y="285" fill="var(--mute)" fontFamily="var(--f-mono)" fontSize="10">cross-brand referral graph</text>
    </svg>
  )
  if (kind === 'search') return (
    <svg viewBox="0 0 400 300">
      <rect width="400" height="300" fill="var(--paper)"/>
      <text x="30" y="50" fill="var(--mute)" fontFamily="var(--f-mono)" fontSize="11">BEFORE</text>
      <rect x="30" y="60" width="320" height="20" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.5"/>
      <rect x="30" y="60" width="280" height="20" fill="var(--mute)" stroke="var(--ink)" strokeWidth="1.5"/>
      <text x="30" y="120" fill="var(--red)" fontFamily="var(--f-mono)" fontSize="11" fontWeight="700">AFTER</text>
      <rect x="30" y="130" width="320" height="20" fill="var(--paper-2)" stroke="var(--ink)" strokeWidth="1.5"/>
      <rect x="30" y="130" width="40" height="20" fill="var(--red)" stroke="var(--ink)" strokeWidth="1.5"/>
      <text x="30" y="225" fill="var(--ink)" fontFamily="var(--f-display)" fontWeight="800" fontSize="58">8×</text>
      <text x="115" y="225" fill="var(--ink)" fontFamily="var(--f-hand)" fontSize="26">faster.</text>
      <text x="30" y="285" fill="var(--mute)" fontFamily="var(--f-mono)" fontSize="10">walkover · search re-arch</text>
    </svg>
  )
  return null
}

export function ProjectsWin({ data, onOpen }) {
  return (
    <div className="win-body">
      <h2 className="win-h">selected <em>projects</em></h2>
      <div className="win-sub">~/projects/ · {data.projects.length} items · click to open</div>
      <div className="proj-list">
        {data.projects.map(p => (
          <button key={p.title} className="proj-item" onClick={() => onOpen(p)}>
            <div className="ic">
              <DocIcon color="var(--mint)" glyph={
                <>
                  <rect x="11" y="22" width="30" height="3" fill="var(--ink)"/>
                  <rect x="11" y="29" width="26" height="3" fill="var(--ink)"/>
                  <rect x="11" y="36" width="20" height="3" fill="var(--red)"/>
                </>
              }/>
            </div>
            <div className="info">
              <div className="nm">{p.title}</div>
              <div className="sub">{p.sub}</div>
            </div>
            <div className="meta">{p.n}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function ProjectDetailWin({ p }) {
  return (
    <div className="win-body proj-detail">
      <div className="vis"><ProjVis kind={p.vis}/></div>
      <h2 className="win-h">{p.title}</h2>
      <div className="win-sub">{p.sub}</div>
      <p className="caption">"{p.caption}"</p>
      <p>{p.desc}</p>
      <div className="tags">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
      <div className="links">
        <a href={p.href} target="_blank" rel="noreferrer">View on GitHub ↗</a>
      </div>
    </div>
  )
}

export function WritingWin({ data, onOpenNote }) {
  return (
    <div className="win-body">
      <h2 className="win-h">notes, <em>in progress</em></h2>
      <div className="win-sub">~/writing/ · 0 published · 3 drafts · click to open</div>
      <div className="writing-list">
        {data.writing.map((w, i) => (
          <div key={i} className="write-row"
               onClick={() => onOpenNote?.({
                 title: w.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) + '.md',
                 body: `# ${w.title}\n\ntag: ${w.tag}\nstatus: ${w.when}\n\n(empty draft — start typing…)`
               })}>
            <span className="ic">✎</span>
            <span className="nm">{w.title}</span>
            <span className="tg">{w.tag}</span>
            <span className="st">→ {w.when}</span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 18, fontFamily: 'var(--f-hand)', fontSize: 18, color: 'var(--mute)' }}>
        i write slowly. it's a feature.
      </p>
    </div>
  )
}

export function NowWin({ data }) {
  return (
    <div className="win-body">
      <div className="now-card">
        <div className="lab">★ now playing</div>
        <div className="h">currently shipping...</div>
        <div className="list">
          {data.now.map((n, i) => (
            <div key={i}>
              <span style={{ color: 'var(--yellow)', marginRight: 6 }}>{n.k} ·</span>
              <span className="b">{n.v}</span>
              {n.em && <span style={{ color: 'var(--pink)', fontFamily: 'var(--f-hand)', fontSize: 18, marginLeft: 4 }}> {n.em}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ContactWin({ data }) {
  return (
    <div className="win-body">
      <h2 className="win-h">say <em>hi</em></h2>
      <div className="win-sub">3 ways to reach me · responses in IST</div>
      <div className="contact-card">
        <div className="row"><a href={`mailto:${data.email}`}>
          <span className="lab">email</span><span className="val">{data.email}</span><span>↗</span>
        </a></div>
        <div className="row"><a href={data.linkedin} target="_blank" rel="noreferrer">
          <span className="lab">linkedin</span><span className="val">/in/akshay-vilekar</span><span>↗</span>
        </a></div>
        <div className="row"><a href={data.github} target="_blank" rel="noreferrer">
          <span className="lab">github</span><span className="val">@ak2703</span><span>↗</span>
        </a></div>
      </div>
      <p style={{ marginTop: 20, fontFamily: 'var(--f-hand)', fontSize: 19, color: 'var(--red)', lineHeight: 1.3 }}>
        no, i don't take recruiter spam personally —<br/>
        but a thoughtful note goes very far.
      </p>
    </div>
  )
}

export function EducationWin({ data }) {
  const e = data.education
  return (
    <div className="win-body">
      <h2 className="win-h">where i <em>started</em></h2>
      <div className="win-sub">~/education.txt · est. 2017</div>
      <div style={{ border: 'var(--border)', borderRadius: 10, padding: 20, background: 'var(--paper-2)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.018em', lineHeight: 1.15, marginBottom: 6 }}>{e.school}</div>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 13, color: 'var(--mute)', marginBottom: 2 }}>{e.degree}</div>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--mute)' }}>{e.years}</div>
      </div>
      <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)' }}>
        <strong>Coursework</strong> — {e.blurb}
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)' }}>{e.extras}</p>
    </div>
  )
}

export function ReadmeWin({ data }) {
  return (
    <div className="window-body padded">
      <div className="readme">
        <pre className="ascii">{`  ___  _  __ ___ _  _   _ __   __
 / _ \\| |/ /' __/ |/_ \\ / _\\\\ \\ / /
| (_) | ' <\\__ \\ _  __// _\\ \\ V /
 \\___/|_|\\_\\___/_||_| \\___/ |_|  `}</pre>
        <h1>README.md</h1>
        <p># akshay vilekar · backend.engineer</p>
        <h2>$ whoami</h2>
        <p>Backend engineer based in <code>Indore, IN</code>. 8 years writing Java/Spring services that need to stay online, accurate, and not wake me at 3am. Currently building RLHF data infra at <code>Micro1</code>.</p>
        <h2>$ ls -la skills/</h2>
        <ul>
          <li><code>java/</code> — 8 yrs, daily driver</li>
          <li><code>spring-boot/</code> — core</li>
          <li><code>kafka/</code> — core; partition-tuning therapy</li>
          <li><code>postgres/</code> — core; explain plans are my love language</li>
          <li><code>aws/</code> — VPC → IAM → Route53 → CodePipeline</li>
        </ul>
        <h2>$ cat principles.txt</h2>
        <ul>
          <li>Boring tech, novel problems.</li>
          <li>Make the wrong thing hard to do.</li>
          <li>Observe, then optimize — never the other way around.</li>
          <li>Idempotency is a love language.</li>
        </ul>
        <h2>$ contact</h2>
        <p>email · <code>{data.email}</code><br/>github · <code>@ak2703</code><br/>linkedin · <code>/in/akshay-vilekar</code></p>
      </div>
    </div>
  )
}

export function StickyWin() {
  return (
    <div className="window-body padded">
      <div className="note-h">notes 📌</div>
      <div className="note-body">
        <p>open to <strong>senior / staff</strong> backend roles —<br/>esp. <strong>data infra, RLHF tooling,</strong> high-throughput Java.</p>
        <p style={{ marginTop: 14, fontSize: 18 }}>↓ click <strong>contact.app</strong> if interested ↓</p>
      </div>
    </div>
  )
}
