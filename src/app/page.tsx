'use client';

import { useState, useEffect, useRef } from 'react';
import { Hero, About, Skills, Experience, Certifications, Projects, Education, Contact } from '@/components/Sections';
import { Magazine } from '@/components/Magazine';
import { Admin } from '@/components/Admin';
import { PortfolioData, Section } from '@/lib/types';

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('');
  const [xpPercent, setXpPercent] = useState(0);
  const discoveredAreasRef = useRef<string[]>(['hero']);
  const [toasts, setToasts] = useState<{ id: string, message: string }[]>([]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        const json = await res.json();
        if (active) {
          setData(json);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();

    const handleScroll = () => {
      // Calculate XP
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setXpPercent(scrolled);

      let cur = '';
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'education', 'contact'];
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 300) {
          cur = id;
        }
      });

      if (cur) {
        setActiveNav(cur);
        if (!discoveredAreasRef.current.includes(cur)) {
          discoveredAreasRef.current.push(cur);
          if (cur !== 'hero') {
            const sectionName = cur.charAt(0).toUpperCase() + cur.slice(1);
            const toastId = Math.random().toString(36).substring(2, 11);
            setToasts(prev => [...prev, { id: toastId, message: `New Area Discovered: ${sectionName}` }]);
            setTimeout(() => {
              setToasts(prev => prev.filter(t => t.id !== toastId));
            }, 4000);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      active = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleUpdate = async (newSections: Section[], password: string) => {
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sections: newSections, password })
    });

    if (!res.ok) {
      throw new Error("Update failed");
    }
    setData((prev) => {
      if (!prev) return null;
      return { ...prev, sections: newSections };
    });
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f4]">
        <div className="animate-pulse text-[#b8924a] font-serif text-xl tracking-widest uppercase">Loading...</div>
      </div>
    );
  }

  const isActive = (id: string) => data.sections.find((s: Section) => s.id === id)?.isActive;

  const [firstName, ...lastNameArr] = data.profile.name.split(' ');
  const lastName = lastNameArr.join(' ');

  return (
    <main>
      <div className="xp-bar-container">
        <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }}></div>
      </div>

      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast">
            <span>🗺️</span> {toast.message}
          </div>
        ))}
      </div>

      <Admin sections={data.sections} onUpdate={handleUpdate} />

      <nav>
        <a href="#hero" className="nav-logo">{firstName} <em>{lastName}</em></a>
        <ul className="nav-links">
          {isActive('about') && <li><a href="#about" className={activeNav === 'about' ? 'active-link' : ''}>About</a></li>}
          {isActive('skills') && <li><a href="#skills" className={activeNav === 'skills' ? 'active-link' : ''}>Skills</a></li>}
          {isActive('projects') && <li><a href="#projects" className={activeNav === 'projects' ? 'active-link' : ''}>Projects</a></li>}
          {isActive('experience') && <li><a href="#experience" className={activeNav === 'experience' ? 'active-link' : ''}>Experience</a></li>}
          {isActive('certifications') && <li><a href="#certifications" className={activeNav === 'certifications' ? 'active-link' : ''}>Certifications</a></li>}
          {isActive('achievements') && <li><a href="#achievements" className={activeNav === 'achievements' ? 'active-link' : ''}>Achievements</a></li>}
          {isActive('education') && <li><a href="#education" className={activeNav === 'education' ? 'active-link' : ''}>Education</a></li>}
          {isActive('contact') && <li><a href="#contact" className="nav-cta">Contact</a></li>}
        </ul>
      </nav>

      {isActive('hero') && <Hero data={data.profile} />}
      {isActive('about') && <About data={data.about} />}
      {isActive('skills') && <Skills data={data.skills} />}
      {isActive('projects') && <Projects data={data.projects} />}
      {isActive('experience') && <Experience data={data.experience} />}
      {isActive('certifications') && <Certifications data={data.certifications} />}
      {isActive('education') && <Education data={data.education} />}
      {isActive('achievements') && <Magazine />}
      {isActive('contact') && <Contact data={data.profile} />}

      <footer>
        <span className="footer-copy">© {new Date().getFullYear()} {data.profile.name}. All rights reserved.<br /><span className="opacity-30 text-[10px] mt-2 block">Press Ctrl+Shift+A for Admin</span></span>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </footer>
    </main>
  );
}

