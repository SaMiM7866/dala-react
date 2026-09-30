import { useState } from 'react'

export default function Modal({ onClose }) {
  const [ok, setOk] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <div className="modal" onClick={onClose}>
      <div className="mc" onClick={(e) => e.stopPropagation()}>
        {ok ? (
          <>
            <h2>Thank you!</h2>
            <p>We’ll be in touch at {email}.</p>
            <button className="btn" onClick={onClose}>Close</button>
          </>
        ) : (
          <>
            <h2>Request access</h2>
            <p>Leave your work email and we’ll get back to you.</p>
            <input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="btn" onClick={() => /\S+@\S+\.\S+/.test(email) && setOk(true)}>Submit</button>
          </>
        )}
      </div>
    </div>
  )
}
