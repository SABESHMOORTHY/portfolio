'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Edit your pages here:
const achievementPages = [
  {
    title: "The Eshwar Tribune",
    headline: "Sabesh Moorthy L Clinches 3rd Place at Sri Eshwar Declamation",
    story: "Sabesh Moorthy L secured the third position at the prestigious declamation competition hosted by Sri Eshwar College of Engineering. Competing against outstanding talent, Sabesh delivered an exceptional, articulate, and persuasive speech, earning high accolades from the jury panel along with a cash prize of 1,000 rupees. This success showcases not only technical excellence but also powerful public speaking and communication capabilities.",
    highlights: ["3rd Place Winner", "Sri Eshwar College", "1,000 INR Cash Prize", "Communication Excellence"],
    image: "/certs/declamation-award.jpg"
  },
  {
    title: "The SKCT Chronicle",
    headline: "Sabesh Moorthy L Dominates Technical Landscape",
    story: "In a stunning display of technical prowess, Sabesh Moorthy L has been making waves across Sri Krishna College of Technology. From mastering complex algorithms to architecting full-stack solutions, the journey has been nothing short of legendary. Colleagues and mentors alike praise the dedication and innovative spirit displayed in every project.",
    highlights: ["Top 10% in GSSoC 2023", "94% Accuracy in MediScan AI", "Led ACM Technical Chapter"]
  },
  {
    title: "Innovation Weekly",
    headline: "AI-Powered Healthcare: The MediScan Breakthrough",
    story: "The medical field witnesses a significant shift as Sabesh's MediScan AI project achieves a remarkable 94% accuracy in pneumonia detection. This breakthrough highlights the potential of deep learning in early diagnostics, providing a glimpse into the future of tech-enabled healthcare.",
    highlights: ["CNN Implementation", "94% Accuracy", "REST API Deployment"]
  },
  {
    title: "Developer's Daily",
    headline: "Open Source Contributions Reach New Heights",
    story: "During the 2023 GirlScript Summer of Code, Sabesh Moorthy L emerged as a leading contributor, successfully merging 12 critical pull requests. His contributions spanned across various domains, strengthening the open-source community and demonstrating exceptional collaborative skills.",
    highlights: ["12 Merged PRs", "Top 10% Contributor", "Community Mentorship"]
  }
];

export function Magazine() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const turnPage = () => {
    if (currentPage < achievementPages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const turnBack = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  // Flip variants for the page turn animation
  const variants: Variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? -110 : 110,
      opacity: 0,
      x: direction > 0 ? '50%' : '-50%',
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
      },
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? 110 : -110,
      opacity: 0,
      x: direction > 0 ? '-50%' : '50%',
      scale: 0.95,
      transition: {
        duration: 0.7,
        ease: "easeInOut" as const,
      },
    }),
  };

  const page = achievementPages[currentPage];

  return (
    <section id="achievements" className="magazine-section">
      <div className="section-wrap !pb-12">
        <div className="section-header !mb-10 text-center flex flex-col items-center">
          <div className="section-eyebrow">Achievements & Awards</div>
          <h2 className="section-title">The <em>Digital Daily</em></h2>
          <div className="section-rule !mx-auto"></div>
        </div>

        <div className="magazine-outer-container">
          <div className="magazine-stack-1"></div>
          <div className="magazine-stack-2"></div>
          
          <div className="magazine-container">
            <div className="magazine-spine"></div>
            
            <div className="magazine-content">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="newspaper-page"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="newspaper-inner">
                    <div className="newspaper-header">
                      <div className="newspaper-meta">Edition No. {currentPage + 1} · 2024 Collection</div>
                      <h3 className="newspaper-title">{page.title}</h3>
                      <div className="newspaper-date-row">
                        <span>Established 2023</span>
                        <div className="newspaper-date-rule"></div>
                        <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>

                    <div className="newspaper-body">
                      <h4 className="newspaper-headline">{page.headline}</h4>
                      <div className="newspaper-columns">
                        <div className="newspaper-main-col">
                          <p className="newspaper-story">
                            <span className="drop-cap">{page.story.charAt(0)}</span>
                            {page.story.slice(1)}
                          </p>
                          {page.image && (
                            <div className="mt-4 border border-slate-300 p-1 bg-white shadow-sm max-w-full">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img 
                                src={page.image} 
                                alt={page.headline} 
                                className="w-full h-auto object-cover rounded-sm border border-slate-100 shadow-sm"
                                style={{ maxHeight: '200px', objectPosition: 'center 20%' }}
                              />
                              <div className="text-[10px] text-slate-500 font-sans italic text-center mt-1">
                                Fig: Sabesh Moorthy L receiving the award.
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="newspaper-side-col">
                          <div className="newspaper-highlights">
                            <h5>At a Glance</h5>
                            <ul>
                              {page.highlights.map((highlight, idx) => (
                                <li key={idx}>
                                  <span className="highlight-bullet"></span>
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="newspaper-footer">
                      <span className="footer-left">Interactive Portfolio</span>
                      <span className="footer-center">Page {currentPage + 1} / {achievementPages.length}</span>
                      <span className="footer-right">© Sabesh Moorthy L</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="magazine-controls">
              <button 
                onClick={turnBack} 
                disabled={currentPage === 0}
                className="btn-turn turn-back"
              >
                <span className="btn-icon">↩</span> Turn Back
              </button>
              
              <div className="page-pagination">
                {achievementPages.map((_, i) => (
                  <div 
                    key={i} 
                    className={`pagination-dot ${i === currentPage ? 'active' : ''}`}
                    onClick={() => {
                      setDirection(i > currentPage ? 1 : -1);
                      setCurrentPage(i);
                    }}
                  ></div>
                ))}
              </div>

              <button 
                onClick={turnPage} 
                disabled={currentPage === achievementPages.length - 1}
                className="btn-turn turn-page"
              >
                Turn Page <span className="btn-icon">↪</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
