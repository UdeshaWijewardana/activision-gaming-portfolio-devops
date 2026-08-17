import { useState } from 'react'
import PageHero from './PageHero'

const initial = { name: '', email: '', subject: '', category: '', message: '' }

export default function Contact() {
  const [fields, setFields] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const change = (e) => setFields({ ...fields, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!fields.name.trim()) next.name = 'Tell us your name.'
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) next.email = 'Enter a valid email address.'
    if (!fields.subject.trim()) next.subject = 'Add a subject.'
    if (!fields.category) next.category = 'Select a category.'
    if (fields.message.trim().length < 20) next.message = 'Your message needs at least 20 characters.'
    setErrors(next)
    if (!Object.keys(next).length) setSent(true)
  }

  if (sent) {
    return (
      <main>
        <PageHero
          label="MESSAGE RECEIVED"
          title={
            <>
              THANK<br />
              <em>YOU.</em>
            </>
          }
          copy="Your inquiry has been received. Our studio team will get back to you shortly."
          visual="blackops"
        >
          <button className="button button-red" onClick={() => { setSent(false); setFields(initial) }}>
            SEND ANOTHER MESSAGE
          </button>
        </PageHero>
      </main>
    )
  }

  return (
    <main>
      <PageHero
        label="CONTACT / 06"
        title={
          <>
            START A<br />
            <em>CONVERSATION.</em>
          </>
        }
        copy="Have a project, partnership, or career opportunity worth building? Reach out to our global team."
        visual="sekiro"
      />
      <section className="section-pad">
        <div className="contact-section">
          <aside>
            <p className="eyebrow">CONTACT CHANNELS</p>
            <h2>
              LET’S MAKE<br />
              <em>IT REAL.</em>
            </h2>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <b>GENERAL INQUIRIES</b>
                <span>studio@activision-portfolio.example</span>
              </div>
              <div className="contact-info-item">
                <b>STUDIO PARTNERSHIPS</b>
                <span>partners@activision-portfolio.example</span>
              </div>
              <div className="contact-info-item">
                <b>PRESS & MEDIA</b>
                <span>press@activision-portfolio.example</span>
              </div>
              <div className="contact-info-item">
                <b>TALENT & RECRUITING</b>
                <span>careers@activision-portfolio.example</span>
              </div>
            </div>
          </aside>
          <form noValidate onSubmit={submit}>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                value={fields.name}
                onChange={change}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                placeholder="Your full name"
              />
              {errors.name && (
                <p id="name-error" className="form-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={fields.email}
                onChange={change}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                placeholder="name@domain.com"
              />
              {errors.email && (
                <p id="email-error" className="form-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                value={fields.subject}
                onChange={change}
                aria-invalid={!!errors.subject}
                placeholder="Topic of discussion"
              />
              {errors.subject && (
                <p className="form-error" role="alert">
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-category">Category</label>
              <select id="contact-category" name="category" value={fields.category} onChange={change} aria-invalid={!!errors.category}>
                <option value="">Select a category</option>
                <option>General inquiry</option>
                <option>Partnership</option>
                <option>Press</option>
                <option>Careers</option>
              </select>
              {errors.category && (
                <p className="form-error" role="alert">
                  {errors.category}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={fields.message}
                onChange={change}
                aria-invalid={!!errors.message}
                placeholder="Tell us about your project or inquiry (minimum 20 characters)..."
              />
              {errors.message && (
                <p className="form-error" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button className="button button-red" type="submit" style={{ alignSelf: 'flex-start', marginTop: '12px' }}>
              SEND MESSAGE <i>↗</i>
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
