import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music as MusicIcon, Volume2, Info, Star } from 'lucide-react';
import { toast } from 'sonner';

interface PianoModuleProps {
  onScore: (points: number) => void;
}

const NOTES = [
  { note: 'C', key: 'A', color: 'white' },
  { note: 'C#', key: 'W', color: 'black' },
  { note: 'D', key: 'S', color: 'white' },
  { note: 'D#', key: 'E', color: 'black' },
  { note: 'E', key: 'D', color: 'white' },
  { note: 'F', key: 'F', color: 'white' },
  { note: 'F#', key: 'T', color: 'black' },
  { note: 'G', key: 'G', color: 'white' },
  { note: 'G#', key: 'Y', color: 'black' },
  { note: 'A', key: 'H', color: 'white' },
  { note: 'A#', key: 'U', color: 'black' },
  { note: 'B', key: 'J', color: 'white' },
  { note: 'C2', key: 'K', color: 'white' },
];

export default function PianoModule({ onScore }: PianoModuleProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const playNote = (note: string) => {
    setActiveKey(note);
    onScore(5);
    // In a real app, we'd use an AudioContext or a sound library
    // For this UI demo, we simulate the interaction
    setTimeout(() => setActiveKey(null), 200);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Virtual Piano</h2>
          <p className="text-slate-500">Explore melodies and earn 5 XP per note!</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-xl">
            <Volume2 className="w-5 h-5" />
            <span className="font-bold">Sound ON</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl relative border-8 border-slate-800">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-500 font-mono text-sm uppercase tracking-widest">
          <MusicIcon className="w-4 h-4" /> Wings Academy Pro-Series
        </div>

        <div className="flex justify-center items-start h-64 mt-8 relative">
          {NOTES.map((n, i) => (
            <motion.button
              key={n.note}
              whileTap={{ scale: 0.98 }}
              onClick={() => playNote(n.note)}
              className={`
                relative transition-colors rounded-b-xl
                ${n.color === 'white' 
                  ? 'w-16 h-full bg-white border-x border-slate-200 z-0 hover:bg-slate-100' 
                  : 'w-10 h-36 bg-slate-800 -mx-5 z-10 hover:bg-slate-700'}
                ${activeKey === n.note ? (n.color === 'white' ? 'bg-indigo-100' : 'bg-indigo-400') : ''}
              `}
            >
              <span className={`absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-sm ${n.color === 'white' ? 'text-slate-400' : 'text-slate-500'}`}>
                {n.key}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h4 className="font-bold mb-1">How to play</h4>
            <p className="text-sm text-slate-500">Click the keys or use your keyboard (A-K) to play notes.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
            <MusicIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h4 className="font-bold mb-1">Theory Mode</h4>
            <p className="text-sm text-slate-500">Unlock scale overlays to learn chords and patterns.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h4 className="font-bold mb-1">XP Bonus</h4>
            <p className="text-sm text-slate-500">Complete a 30-second melody to earn a 100 XP bonus!</p>
          </div>
        </div>
      </div>
    </div>
  );
}