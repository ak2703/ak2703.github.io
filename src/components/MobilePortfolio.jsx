import { useState } from 'react'
import MobileWallpaper from './MobileWallpaper.jsx'

export default function MobilePortfolio({ data }) {
  return (
    <>
      <MobileWallpaper />

      <div className="mobile-portfolio">
        {/* Sticky nav */}
        <nav className="mobile-nav">
          <span className="brand">akshay.os</span>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Hero */}
        <section className="m-section m-hero">
          <div className="hero-badge">available · sr / staff ic roles</div>
          <h1>{data.name}</h1>
          <div className="role-tag">{data.role} · {data.location}</div>
          <p className="tagline">
            I build <span className="hl">backend systems</span> that don't fall over.
          </p>
          <div className="m-hero-links">
            <a href={`mailto:${data.email}`} className="primary">✉ Email me</a>
            <a href={data.github} target="_blank" rel="noreferrer">gh GitHub</a>
            <a href={data.linkedin} target="_blank" rel="noreferrer">in LinkedIn</a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="m-section">
          <div className="m-section-label">★ about</div>
          <h2 className="m-section-title">a short <em>introduction</em></h2>
          <p className="m-about-lead">{data.about.lead}</p>
          {data.about.body.map((p, i) => (
            <p key={i} className="m-about-body">{p}</p>
          ))}
          <ul className="m-principles">
            {data.about.principles.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
          <div style={{ marginTop: 24 }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mute)', marginBottom: 12 }}>★ ask me about</div>
            <div className="stickers">
              {data.askMeAbout.map(s => <span key={s.t} className={`sticker ${s.c}`}>{s.t}</span>)}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="m-section">
          <div className="m-section-label">★ experience</div>
          <h2 className="m-section-title">where i've <em>built things</em></h2>
          <MobileExpList data={data} />
        </section>

        {/* Projects */}
        <section id="projects" className="m-section">
          <div className="m-section-label">★ projects</div>
          <h2 className="m-section-title">selected <em>projects</em></h2>
          <div className="m-proj-grid">
            {data.projects.map(p => (
              <MobileProjCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="m-section">
          <div className="m-section-label">★ skills</div>
          <h2 className="m-section-title">stack <em>i reach for</em></h2>
          <div className="m-skills-grid">
            {data.skills.map(g => (
              <div key={g.group} className="m-skill-group">
                <div className="m-skill-group-head">{g.group}</div>
                <ul>
                  {g.items.map(([n, lvl]) => (
                    <li key={n}><span>{n}</span><span className="lvl">{lvl}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="m-section">
          <div className="m-section-label">★ contact</div>
          <h2 className="m-section-title">say <em>hi</em></h2>
          <div className="m-contact-links">
            <a href={`mailto:${data.email}`}>
              <span className="lab">email</span>
              <span className="val">{data.email}</span>
              <span>↗</span>
            </a>
            <a href={data.linkedin} target="_blank" rel="noreferrer">
              <span className="lab">linkedin</span>
              <span className="val">/in/akshay-vilekar</span>
              <span>↗</span>
            </a>
            <a href={data.github} target="_blank" rel="noreferrer">
              <span className="lab">github</span>
              <span className="val">@ak2703</span>
              <span>↗</span>
            </a>
          </div>
          <p style={{ fontFamily: 'var(--f-hand)', fontSize: 19, color: 'var(--red)', lineHeight: 1.3 }}>
            no, i don't take recruiter spam personally —<br/>
            but a thoughtful note goes very far.
          </p>
        </section>

        {/* Footer */}
        <footer className="m-footer">
          <span>akshay vilekar · {new Date().getFullYear()}</span>
          <span>
            <a href={data.github} target="_blank" rel="noreferrer" style={{ marginRight: 12 }}>gh</a>
            <a href={data.linkedin} target="_blank" rel="noreferrer">in</a>
          </span>
        </footer>
      </div>
    </>
  )
}

function MobileExpList({ data }) {
  const [open, setOpen] = useState(0)
  return (
    <div>
      {data.experience.map((e, i) => (
        <div
          key={i}
          className="m-exp-entry"
          data-open={open === i}
          onClick={() => setOpen(open === i ? -1 : i)}
        >
          <div className="m-exp-head">
            <div>
              <div className="m-exp-role">
                {e.role} <span className="at">@ {e.company}</span>
                {e.badge && <span className="badge" style={{ marginLeft: 6 }}>{e.badge}</span>}
              </div>
              <div className="m-exp-meta">{e.place}</div>
            </div>
            <div className="m-exp-when">{e.when}</div>
          </div>
          <div className="m-exp-body">
            <div>
              <div className="m-exp-inner">
                {e.detail}
                <div className="m-exp-tags">
                  {e.tags.map((t, j) => (
                    <span key={t} className={`chip c${(j % 4) + 1}`}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function MobileProjCard({ p }) {
  return (
    <a href={p.href} target="_blank" rel="noreferrer" className="m-proj-card" style={{ textDecoration: 'none' }}>
      <div className="m-proj-card-num">{p.n}</div>
      <div className="m-proj-card-body">
        <div className="m-proj-card-title">{p.title}</div>
        <div className="m-proj-card-sub">{p.sub}</div>
        <div className="m-proj-card-caption">"{p.caption}"</div>
        <div className="m-proj-card-stack">
          {p.stack.map(s => <span key={s}>{s}</span>)}
        </div>
        <span className="m-proj-card-link">View on GitHub ↗</span>
      </div>
    </a>
  )
}
