import { useEffect, useState } from 'react'
import Particles from './components/Particles.jsx'
import Team from './components/Team.jsx'
import Modal from './components/Modal.jsx'
import { SECTIONS, INVESTORS } from './data.js'

const Tri = ({ c }) => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke={c} strokeWidth="2.4" strokeLinejoin="round">
    <path d="M17 4L31 29H3z" />
  </svg>
)

export default function App() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      let best = 0, bd = 1e9
      SECTIONS.forEach((s, k) => {
        const r = document.getElementById(s.id).getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - innerHeight / 2)
        if (d < bd) { bd = d; best = k }
      })
      setActive(best)
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  const cur = SECTIONS[active]
  const Req = () => <button className="btn" onClick={() => setOpen(true)}>Request access</button>

  return (
    <div>
      <Particles shape={cur.shape} cx={cur.cx} scale={cur.scale} />

      <nav>
        <a className="logo" href="#hero"><i />Dala</a>
        <div className="links">
          <a href="#manifesto" className={active >= 2 && active < 5 ? 'on' : ''}>Manifesto</a>
          <a href="#team" className={active >= 5 && active < 7 ? 'on' : ''}>Team</a>
          <a href="#">Blog</a>
          <Req />
        </div>
      </nav>

      <section id="hero">
        <div className="wide">
          <h1>Unlock collective wisdom.</h1>
          <div className="eyebrow">Stop managing knowledge. Start using it.</div>
          <p style={{ maxWidth: 330, fontSize: 12 }}>
            Plug into your team’s shared brainpower. Ask Dala to instantly find anything or anyone from any workplace
            system. Focus on doing your best work with context, conviction and clarity.
          </p>
          <Req />
        </div>
      </section>

      <section id="decide" className="r">
        <div className="box">
          <h2>Make decisions with confidence</h2>
          <p>Dala’s bleeding-edge AI search tool automates extracting knowledge from across your organisation so that you can take the guesswork out of your work.</p>
        </div>
      </section>

      <section id="today" className="c">
        <div className="wide">
          <p className="lg">This is your workplace today. Countless fragments of critical knowledge scattered across hundreds of disparate systems.</p>
          <p className="lg">30% of your time is spent trying to organise and find the information and expertise you need to do your job.</p>
          <p className="lg" style={{ marginTop: 60 }}>Traditional tools are just another decaying system that requires continuous maintenance.</p>
          <p className="lg">They fail to understand what you need from the vast amounts of information that your team creates every day.</p>
        </div>
      </section>

      <section id="manifesto" className="r">
        <div className="box">
          <h2>Spark lightbulb moments</h2>
          <p>Dala is your intelligent, real-time source of truth that eliminates the cultural, financial and operational struggles of splintered tools.</p>
          <p>We connect your systems behind the scenes and pull together exactly the knowledge you require into an elegant contextual view.</p>
          <p>Just ask Dala for the answer that advances your work, and helps you make better decisions with more confidence.</p>
        </div>
      </section>

      <section id="mission">
        <div className="box">
          <h2>Build a better world of work</h2>
          <p>Our mission is to make work more coherent and delightful—reframing productivity from <i>doing more</i> to <em>being better</em>.</p>
          <p>Your happiest and most purposeful moments at work are when you’re in flow, intellectually stimulated, and creating value for customers.</p>
          <p>We want to recreate that every time you experience Dala. A tool that is completely integrated with how you think, feel and work.</p>
        </div>
      </section>

      <section id="team"><Team /></section>

      <section id="investors" className="r">
        <div className="inv">
          {INVESTORS.map(([name, sub, left, top, color], k) => (
            <div key={k} className="t" style={{ left: left + '%', top: top + '%', animationDelay: k * 0.7 + 's' }}>
              <Tri c={color} />
              <div>{name}{sub && <small>{sub}</small>}</div>
            </div>
          ))}
          <div style={{ position: 'absolute', right: 0, top: '18%', maxWidth: 300 }}>
            <h2 className="big">Our investors</h2>
            <p>We are supported by some of the world’s most pioneering operators and progressive funds to fuel our growth.</p>
          </div>
        </div>
      </section>

      <section id="cta" className="c">
        <div>
          <h2 className="big" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400 }}>
            Your workplace has the answer. Ask Dala to find it.
          </h2>
          <Req />
        </div>
      </section>

      <footer>
        <span>© 2026 Dala Technologies Limited. All rights reserved.</span>
        <div>{['Manifesto', 'Team', 'Blog', 'Privacy', 'Terms'].map((x) => <a key={x} href="#">{x}</a>)}</div>
      </footer>

      {open && <Modal onClose={() => setOpen(false)} />}
    </div>
  )
}
