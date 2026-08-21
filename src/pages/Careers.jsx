import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCheck, FiArrowUpRight, FiBriefcase, FiMapPin } from 'react-icons/fi'
import PageHero from './PageHero'
import { jobs, benefits } from '../data/careers'

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState('ALL')

  const departments = ['ALL', 'ENGINEERING', 'DESIGN', 'ART', 'INFRASTRUCTURE', 'AUDIO']

  const filteredJobs = selectedDept === 'ALL'
    ? jobs
    : jobs.filter((job) => job.department.toUpperCase() === selectedDept.toUpperCase())

  return (
    <main>
      <PageHero
        label="JOIN THE STUDIO / 04"
        title={
          <>
            BRING YOUR<br />
            <em>PASSION.</em>
          </>
        }
        copy="Work alongside industry pioneers creating iconic franchise experiences that connect millions of players globally."
        visual="careers"
      />

      {/* Benefits section */}
      <section className="section-pad" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <p className="eyebrow">LIFE AT ACTIVISION STUDIO</p>
        <h2 style={{ marginBottom: '40px' }}>
          PERKS &<br />
          <em>BENEFITS.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {benefits.map((b) => (
            <div key={b.title} style={{ padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red)', marginBottom: '8px' }}>
                <FiCheck />
                <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#fff' }}>{b.title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Openings */}
      <section className="section-pad">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
          <div>
            <p className="eyebrow">OPEN OPPORTUNITIES</p>
            <h2 style={{ margin: 0 }}>
              AVAILABLE<br />
              <em>POSITIONS.</em>
            </h2>
          </div>
          <div className="filter-bar" style={{ margin: 0, padding: 0, border: 'none' }}>
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                className={selectedDept === dept ? 'active' : ''}
                onClick={() => setSelectedDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="careers-grid">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div>
                <div className="job-dept">{job.department}</div>
                <h3>{job.title}</h3>
                <div className="job-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiMapPin /> {job.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiBriefcase /> {job.type}
                  </span>
                </div>
                <p>{job.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <Link to="/contact" className="button button-red" style={{ flex: 1 }}>
                  APPLY NOW <FiArrowUpRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
