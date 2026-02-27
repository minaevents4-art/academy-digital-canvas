import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Calculator, Music, Palette, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'English', icon: <BookOpen className="w-4 h-4" />, href: '#english' },
    { name: 'Math', icon: <Calculator className="w-4 h-4" />, href: '#math' },
    { name: 'Music', icon: <Music className="w-4 h-4" />, href: '#music' },
    { name: 'Art', icon: <Palette className="w-4 h-4" />, href: '#art' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-sky-500 p-2 rounded-xl">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">
              Wings<span className="text-sky-500">Academy</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 text-slate-600 hover:text-sky-500 font-medium transition-colors"
              >
                {link.icon}
                {link.name}
              </a>
            ))}
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-sky-200 hover:scale-105 active:scale-95">
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 text-slate-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
              <button className="bg-sky-500 text-white w-full py-3 rounded-xl font-bold">
                Start Learning
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;