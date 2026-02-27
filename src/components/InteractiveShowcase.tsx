import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Music, Palette, Calculator, BookOpen } from 'lucide-react';
import MathQuiz from './interactive/MathQuiz';
import EnglishScramble from './interactive/EnglishScramble';
import MusicPad from './interactive/MusicPad';
import ArtCanvas from './interactive/ArtCanvas';

const InteractiveShowcase = () => {
  const [activeTab, setActiveTab] = useState<'math' | 'english' | 'music' | 'art'>('math');

  const tabs = [
    { id: 'math', label: 'Math Game', icon: <Calculator className="w-5 h-5" /> },
    { id: 'english', label: 'Word Puzzle', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'music', label: 'Music Pad', icon: <Music className="w-5 h-5" /> },
    { id: 'art', label: 'Art Canvas', icon: <Palette className="w-5 h-5" /> },
  ] as const;

  return (
    <section id="demo" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full mb-4">
            <Gamepad2 className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Interactive Demos</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Try Our Sandbox Environments</h2>
          <p className="text-slate-600 max-w-2xl">
            Don't just take our word for it. Explore our interactive tools designed to make complex concepts simple and fun.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 p-1.5 bg-white rounded-2xl shadow-sm border border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-200'
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Canvas Area */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 p-8"
              >
                {activeTab === 'math' && <MathQuiz />}
                {activeTab === 'english' && <EnglishScramble />}
                {activeTab === 'music' && <MusicPad />}
                {activeTab === 'art' && <ArtCanvas />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;