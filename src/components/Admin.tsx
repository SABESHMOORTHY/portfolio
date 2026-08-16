'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Lock, Eye, EyeOff, Save } from 'lucide-react';
import { Section } from '@/lib/types';

interface AdminProps {
  sections: Section[];
  onUpdate: (newSections: Section[], password: string) => Promise<void>;
}

export function Admin({ sections, onUpdate }: AdminProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [localSections, setLocalSections] = useState<Section[]>(sections);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setLocalSections(sections);
  }, [sections]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      // In a real app, we'd verify with the server here.
      // For the UI state, we'll let the user enter the panel.
      // The actual update will fail if the password is wrong via API.
      setIsAuthenticated(true);
      setError('');
    }
  };

  const toggleSection = (id: string) => {
    setLocalSections(prev => 
      prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    try {
      await onUpdate(localSections, password);
      setIsSaving(false);
      setIsOpen(false);
    } catch {
      setError('Invalid password or update failed.');
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="admin-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="admin-card w-full max-w-md rounded-2xl p-8 relative overflow-hidden font-sans"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"
            >
              <X size={20} />
            </button>

            {!isAuthenticated ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-[var(--warm)] rounded-full text-[var(--accent)] mb-4">
                    <Lock size={24} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold">Admin Login</h2>
                  <p className="text-[var(--ink3)] mt-2">Enter your password to access controls.</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <input 
                    type="password"
                    placeholder="Admin Password"
                    className="w-full p-3 bg-[var(--cream)] border border-[var(--border)] focus:outline-none focus:border-[var(--gold)] text-[var(--ink)]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="btn-primary w-full"
                  >
                    Enter Panel
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col gap-1 mb-4">
                  <h2 className="text-xl font-serif font-bold text-[var(--ink)] flex items-center gap-2">
                    <Settings className="text-[var(--gold)]" size={20} /> 
                    Module Controls
                  </h2>
                  <p className="text-[var(--ink3)] text-sm">Toggle sections to show or hide them from visitors.</p>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {localSections.map((section) => (
                    <div 
                      key={section.id}
                      className="flex items-center justify-between p-3 bg-[var(--cream)] border border-[var(--border)] transition-colors"
                    >
                      <span className="font-bold text-[var(--ink2)] capitalize text-sm">{section.title}</span>
                      <button 
                        onClick={() => toggleSection(section.id)}
                        className={`p-2 transition-colors ${
                          section.isActive 
                            ? 'bg-[var(--warm)] text-[var(--accent)]' 
                            : 'bg-[#e5e5e5] text-gray-400'
                        }`}
                      >
                        {section.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                  ))}
                </div>

                {error && <p className="text-[#d9534f] text-sm text-center font-bold">{error}</p>}

                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                >
                  <Save size={18} />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
