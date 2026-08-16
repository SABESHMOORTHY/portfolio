'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Profile,
  AboutData,
  SkillCategory,
  Project,
  ProjectLink,
  ExperienceData,
  Certification,
  EducationData,
  QuickFact,
  Stat
} from '@/lib/types';

const Reveal = ({ children, className = '', index = 0 }: { children: React.ReactNode, className?: string, index?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 30, y: 30, rotate: -3 }}
    whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    className={className}
  >
    {children}
  </motion.div>
);

// HERO
export function Hero({ data }: { data: Profile }) {
  return (
    <section id="hero">
      <div className="hero-text">
        <div className="hero-eyebrow">
          <span className="eyebrow-line"></span>
          <span className="eyebrow-text">{data.degree}</span>
        </div>
        <h1 className="hero-name">Hello, I&apos;m<br /><em>{data.name}</em></h1>
        <p className="hero-title">{data.role}</p>
        <p className="hero-desc">{data.bio}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#" className="btn-outline">Download CV</a>
        </div>
        <div className="hero-stats">
          {data.stats.map((stat: Stat, idx: number) => (
            <div key={idx} className="hero-stat">
              <span className="num">{stat.value}</span>
              <span className="lbl">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-portrait" style={{ overflow: 'hidden' }}>
          {/* Ensure your photo is named 'profile.jpg' and placed in the 'public' folder */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile.jpg"
            alt={data.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              // Fallback if the image doesn't exist yet
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="portrait-placeholder"><div class="portrait-icon">👤</div><span class="portrait-label">Photo Missing</span></div>';
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ABOUT
export function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="relative overflow-hidden bg-white">
      {/* Background SVGs to match the mockup */}
      <div className="absolute top-[15%] left-8 text-slate-200/50 pointer-events-none select-none z-0">
        <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M50 15L15 35v30l35 20 35-20V35L50 15z" />
          <path d="M50 15v35L15 35M50 50l35-15M50 50v35" />
          <circle cx="50" cy="15" r="2.5" fill="currentColor" />
          <circle cx="15" cy="35" r="2.5" fill="currentColor" />
          <circle cx="85" cy="35" r="2.5" fill="currentColor" />
          <circle cx="50" cy="50" r="2.5" fill="currentColor" />
          <circle cx="15" cy="65" r="2.5" fill="currentColor" />
          <circle cx="85" cy="65" r="2.5" fill="currentColor" />
          <circle cx="50" cy="85" r="2.5" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute bottom-[20%] left-16 text-slate-200/40 pointer-events-none select-none z-0">
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      </div>

      <div className="absolute top-[25%] right-8 text-slate-200/50 pointer-events-none select-none z-0">
        <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="25" y="25" width="50" height="50" rx="4" />
          <rect x="35" y="35" width="30" height="30" rx="2" />
          <path d="M10 35h15M10 50h15M10 65h15M85 35h-15M85 50h-15M85 65h-15" />
          <path d="M35 10v15M50 10v15M65 10v15M35 85v-15M50 85v-15M65 85v-15" />
        </svg>
      </div>

      <div className="absolute bottom-[15%] right-20 text-slate-200/40 pointer-events-none select-none z-0">
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        </svg>
      </div>

      <div className="section-wrap relative z-10">
        <Reveal className="section-header">
          <div className="section-eyebrow">About Me</div>
          <h2 className="section-title">The Person Behind the Code</h2>
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <div className="quote-box">
              <div className="quote-icon">&lt; &gt;</div>
              <p className="quote-text">{data.quote}</p>
            </div>
            {data.paragraphs.map((p: string, i: number) => (
              <p key={i} className="about-body">{p}</p>
            ))}
          </Reveal>
          <div>
            <Reveal className="sidebar-card">
              <div className="sidebar-card-title">Quick Facts</div>
              {data.quickFacts.map((fact: QuickFact, i: number) => {
                if (fact.label === "University") {
                  return (
                    <div key={i} className="info-row" style={{ alignItems: 'center' }}>
                      <span className="info-label">{fact.label}</span>
                      <span className="info-value flex items-center gap-1 text-slate-800 font-bold relative pr-8">
                        <svg className="w-3.5 h-3.5 text-slate-500 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className="underline cursor-pointer mr-2">{fact.value}</span>
                        <span className="university-badge">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L3 7v6c0 5.5 4 10.5 9 12 5-1.5 9-6.5 9-12V7l-9-5z" fill="#d5a36f" />
                            <path d="M12 4.5l6.5 3.5v5c0 4-3 7.5-6.5 9-3.5-1.5-6.5-5-6.5-9v-5L12 4.5z" fill="#1e293b" />
                            <circle cx="12" cy="12" r="3" fill="#d5a36f" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  );
                }
                return (
                  <div key={i} className="info-row">
                    <span className="info-label">{fact.label}</span>
                    <span className="info-value" style={fact.highlight ? { color: 'var(--accent2)' } : {}}>
                      {fact.value}
                    </span>
                  </div>
                );
              })}
            </Reveal>
            <Reveal className="sidebar-card">
              <div className="sidebar-card-title">Interests</div>
              {data.interests.map((int: string, i: number) => {
                if (int === "Full-Stack Development") {
                  return (
                    <div key={i} className="info-row" style={{ alignItems: 'center' }}>
                      <span className="info-label flex items-center">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                        </svg>
                      </span>
                      <span className="info-value flex items-center gap-1 font-normal">
                        <svg className="w-4 h-4 text-red-500 fill-current inline-block mr-1" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        {int}
                      </span>
                    </div>
                  );
                }
                return (
                  <div key={i} className="info-row">
                    <span className="info-label">→</span>
                    <span className="info-value font-normal">{int}</span>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// SKILLS
export function Skills({ data }: { data: SkillCategory[] }) {
  const [clicks, setClicks] = useState<Record<string, number>>({});

  const handleSkillClick = (skill: string) => {
    setClicks(prev => ({ ...prev, [skill]: (prev[skill] || 0) + 10 }));
  };

  return (
    <section id="skills">
      <div className="section-wrap">
        <Reveal className="section-header">
          <div className="section-eyebrow">Skills & Tools</div>
          <h2 className="section-title">What I <em>Work With</em></h2>
          <div className="section-rule"></div>
        </Reveal>
        <div className="skills-layout">
          {data.map((block: SkillCategory, idx: number) => (
            <Reveal key={idx} className="skill-block" index={idx}>
              <div className="skill-block-title">{block.category}</div>
              <ul className="skill-list">
                {block.items.map((item: string, i: number) => (
                  <li key={i} className="skill-powerup" onClick={() => handleSkillClick(item)}>
                    {item}
                    {clicks[item] && <span className="skill-counter">+{clicks[item]} XP</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// PROJECTS
export function Projects({ data }: { data: Project[] }) {
  return (
    <section id="projects">
      <div className="section-wrap">
        <Reveal className="section-header">
          <div className="section-eyebrow">Featured Projects</div>
          <h2 className="section-title">Things I&apos;ve <em>Built</em></h2>
          <div className="section-rule"></div>
        </Reveal>
        <div className="projects-grid">
          {data.map((proj: Project, idx: number) => {
            // To show projects 5 to 8 (MediScan AI, ShopFlow, AgriSense, ChatSphere) in the future,
            // simply comment out the 3 lines below:
            if (idx >= 4) {
              return null;
            }

            return (
              <Reveal key={idx} className="project-card">
                <div className="project-header">
                  <span className="project-num">{proj.id}</span>
                  <span className="project-type-badge">{proj.typeBadge}</span>
                </div>
              <div className="project-image-wrapper">
                {proj.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={proj.image} alt={proj.title} className="project-image" />
                ) : (
                  <div className="project-image-fallback">
                    <span className="fallback-pattern">{proj.title}</span>
                  </div>
                )}
              </div>
              <div className="project-body">
                <div className="project-name">{proj.title}</div>
                <p className="project-desc">{proj.description}</p>
                <div className="project-stack">
                  {proj.stack.map((t: string) => (
                    <span key={t} className="stack-pill">{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {proj.links.map((link: ProjectLink, i: number) => (
                    <a key={i} href={link.url} className="proj-link">{link.label}</a>
                  ))}
                </div>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// EXPERIENCE
export function Experience({ data }: { data: ExperienceData[] }) {
  return (
    <section id="experience">
      <div className="section-wrap">
        <Reveal className="section-header">
          <div className="section-eyebrow">Experience</div>
          <h2 className="section-title">Where I&apos;ve <em>Contributed</em></h2>
          <div className="section-rule"></div>
        </Reveal>
        <div>
          {data.map((job: ExperienceData, idx: number) => (
            <Reveal key={idx} className="exp-item">
              <div>
                <div className="exp-date">{job.period}</div>
                <div className="exp-org">{job.company}</div>
              </div>
              <div>
                <div className="exp-role">{job.role}</div>
                <p className="exp-desc">{job.description}</p>
                {job.stack && job.stack.length > 0 && (
                  <div className="project-stack" style={{ marginTop: '0.75rem' }}>
                    {job.stack.map((t: string) => (
                      <span key={t} className="stack-pill">{t}</span>
                    ))}
                  </div>
                )}
                {job.github && (
                  <a
                    href={job.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link"
                    style={{ display: 'inline-block', marginTop: '0.75rem' }}
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// CERTIFICATIONS
export function Certifications({ data }: { data: Certification[] }) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  if (!data || data.length === 0) return null;
  return (
    <section id="certifications">
      <div className="section-wrap">
        <Reveal className="section-header">
          <div className="section-eyebrow">Certifications</div>
          <h2 className="section-title">Verified <em>Credentials</em></h2>
          <div className="section-rule"></div>
        </Reveal>
        <div className="certs-grid">
          {data.map((cert: Certification, idx: number) => (
            <Reveal
              key={idx}
              className={`flip-card ${cert.image ? 'cursor-pointer' : ''}`}
              index={idx}
            >
              <div
                className="flip-card-inner"
                onClick={() => {
                  if (cert.image) {
                    setSelectedCert(cert);
                  }
                }}
              >
                <div className="flip-card-front cert-item !m-0 !h-full">
                  <div className="cert-badge">{cert.icon}</div>
                  <div>
                    <div className="cert-name">{cert.title}</div>
                    <div className="cert-by">{cert.issuer}</div>
                  </div>
                </div>
                <div className="flip-card-back animate-pulse">
                  <div className="cert-name !text-cream">{cert.title}</div>
                  <div className="text-xs mt-2 opacity-80">
                    {cert.image ? '🔍 Click to view certificate' : 'Verified Credential'}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Premium Lightbox Modal Overlay */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 md:p-6 transition-all duration-300"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#fdfbf7] rounded-2xl overflow-hidden border-2 border-[#d5a36f] shadow-2xl p-4 md:p-8 flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 text-3xl font-bold leading-none cursor-pointer transition-colors p-2"
              onClick={() => setSelectedCert(null)}
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Header info */}
            <div className="text-center px-6">
              <h3 className="font-serif text-xl md:text-2xl font-black text-slate-900 uppercase tracking-wide">
                {selectedCert.title}
              </h3>
              <p className="text-[#d5a36f] font-sans font-bold tracking-wider text-xs md:text-sm mt-1 uppercase">
                {selectedCert.issuer}
              </p>
            </div>

            {/* Certificate Image Frame */}
            <div className="w-full flex justify-center items-center bg-[#faf8f4] border border-slate-200 rounded-lg p-2 md:p-4 min-h-[300px] md:min-h-[400px]">
              {selectedCert.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[55vh] md:max-h-[60vh] max-w-full object-contain rounded-md shadow-lg border border-slate-200 transition-transform duration-300 hover:scale-[1.01]"
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-slate-400 py-16">
                  <span className="text-6xl">{selectedCert.icon || '📜'}</span>
                  <span className="text-sm font-semibold tracking-wider uppercase">Certificate Image Not Available</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center items-center w-full">
              {selectedCert.image && (
                <a
                  href={selectedCert.image}
                  download={`${selectedCert.title.replace(/\s+/g, '_')}_Certificate.png`}
                  className="px-6 py-2.5 bg-[#2c5f8a] hover:bg-[#3d7cb0] text-[#faf8f4] hover:text-[#ffffff] font-bold text-xs tracking-wider uppercase rounded-md shadow-md hover:shadow-lg border border-[#2c5f8a] transition-all duration-300"
                >
                  📥 Download Certificate
                </a>
              )}
              <button
                onClick={() => setSelectedCert(null)}
                className="px-6 py-2.5 bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-950 font-bold text-xs tracking-wider uppercase rounded-md border border-slate-300 transition-all duration-300 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// EDUCATION
export function Education({ data }: { data: EducationData[] }) {
  return (
    <section id="education">
      <div className="section-wrap">
        <Reveal className="section-header">
          <div className="section-eyebrow">Education</div>
          <h2 className="section-title">Academic <em>Background</em></h2>
          <div className="section-rule"></div>
        </Reveal>
        <div>
          {data.map((edu: EducationData, idx: number) => (
            <Reveal key={idx} className="edu-item">
              <div className="edu-badge">{edu.icon}</div>
              <div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-school">{edu.school}</div>
              </div>
              <div>
                <div className="edu-year">{edu.period}</div>
                <div className="edu-result">{edu.result}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// CONTACT
export function Contact({ data }: { data: Profile }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c79f4c', '#1a1917', '#2c5f8a']
    });
  };

  return (
    <section id="contact">
      <div className="section-wrap">
        <Reveal className="section-header">
          <div className="section-eyebrow">Get In Touch</div>
          <h2 className="section-title">Let&apos;s <em>Work Together</em></h2>
          <div className="section-rule"></div>
        </Reveal>
        <div className="contact-grid">
          <Reveal>
            <p className="contact-intro">Whether you have an internship opportunity, an interesting project, or just want to say hello — my inbox is always open. I&apos;ll get back to you promptly.</p>
            <ul className="contact-list">
              <li><span className="contact-icon">✉</span><a href={`mailto:${data.email}`}>{data.email}</a></li>
              <li><span className="contact-icon">💼</span><a href={data.linkedin} target="_blank">LinkedIn Profile</a></li>
              <li><span className="contact-icon">⚙</span><a href={data.github} target="_blank">GitHub Profile</a></li>
              <li><span className="contact-icon">📞</span><a href={`tel:${data.phone.replace(/\s+/g, '')}`}>{data.phone}</a></li>
            </ul>
          </Reveal>
          <Reveal className="contact-form quest-log">
            <div className="quest-log-bottom-left"></div>
            <div className="quest-log-bottom-right"></div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[1.5rem] w-full">
              <div className="form-row">
                <div className="form-group"><label>Name</label><input type="text" placeholder="Your name" required /></div>
                <div className="form-group"><label>Email</label><input type="email" placeholder="your@email.com" required /></div>
              </div>
              <div className="form-group"><label>Subject</label><input type="text" placeholder="Internship / Project / Collaboration" required /></div>
              <div className="form-group"><label>Message</label><textarea placeholder="Tell me about your project or opportunity..." required></textarea></div>
              <button type="submit" className="btn-send">Complete Quest</button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

