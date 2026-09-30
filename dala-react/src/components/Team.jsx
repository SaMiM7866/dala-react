import { useState } from 'react'
import { TEAM } from '../data.js'

export default function Team() {
  const [i, setI] = useState(1)
  const n = TEAM.length, m = TEAM[i]
  const go = (d) => setI((i + d + n) % n)
  const [first, last] = m.n.split(' ')
  return (
    <div className="team">
      <div className="txt">
        <h2 className="big">Our team</h2>
        <h2 style={{ fontSize: 20, fontWeight: 500 }}>Build with us.</h2>
        <p style={{ fontSize: 12 }}>
          We are actively hiring intentional, empathetic and curious people who thrive on creating delightful
          experiences. If you’d like to be a part of the journey, email{' '}
          <a className="in" href="mailto:careers@dala.ai">careers@dala.ai</a> with your CV or portfolio, and a thoughtful note.
        </p>
        <p style={{ fontSize: 12 }}>Read more about our values <a className="in" href="#">here</a>.</p>
      </div>
      <div className="car">
        <div className="track">
          {TEAM.map((t, k) => (
            <div key={k} className={'card' + (k === i ? ' act' : '')} style={{ background: t.g }} onClick={() => setI(k)}>
              {t.i}
            </div>
          ))}
          <div className="who"><small>{m.r}</small><b>{first}</b><b>{last}</b></div>
        </div>
        <div className="arrows">
          <button className="btn" onClick={() => go(-1)}>←</button>
          <button className="btn" onClick={() => go(1)}>→</button>
        </div>
      </div>
    </div>
  )
}
