import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Disc } from 'lucide-react';

const notes = [
  { id: 'C', freq: 261.63, color: 'bg-red-400', label: 'Do' },
  { id: 'D', freq: 293.66, color: 'bg-orange-400', label: 'Re' },
  { id: 'E', freq: 329.63, color: 'bg-yellow-400', label: 'Mi' },
  { id: 'F', freq: 349.23, color: 'bg-green-400', label: 'Fa' },
  { id: 'G', freq: 392.00, color: 'bg-blue-400', label: 'Sol' },
  { id: 'A', freq: 440.00, color: 'bg-indigo-400', label: 'La' },
  { id: 'B', freq: 493.88, color: 'bg-purple-400', label: 'Ti' },
  { id: 'C2', freq: 523.25, color: 'bg-pink-400', label: 'Do' },
];

const MusicPad = () => {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const playNote = (freq: number, id: string) => {
    setActiveNote(id);
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.8);

    setTimeout(() => setActiveNote(null), 200);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h3 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-widest">Virtual Piano</h3>
        <p className="text-slate-500">Click the keys to play musical notes</p>
      </div>

      <div className="flex gap-2 md:gap-4 p-4 bg-slate-900 rounded-[2rem] shadow-2xl overflow-x-auto w-full max-w-3xl">
        {notes.map((note) => (
          <motion.button
            key={note.id}
            whileTap={{ y: 10, scale: 0.95 }}
            onClick={() => playNote(note.freq, note.id)}
            className={`flex-1 min-w-[60px] h-64 rounded-xl relative overflow-hidden transition-all duration-75 ${
              note.color
            } ${activeNote === note.id ? 'brightness-125 shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'shadow-lg'}`}
          >
            <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center text-white font-black text-xl drop-shadow-md">
              <span>{note.id}</span>
              <span className="text-[10px] opacity-70">{note.label}</span>
            </div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10" />
          </motion.button>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-8">
        <div className="flex items-center gap-3 bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-sm">
          <Disc className="w-6 h-6 text-sky-500 animate-spin" />
          <span className="font-bold text-slate-700">Studio Mode Active</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Music className="w-5 h-5" />
          <span className="text-sm font-medium">8-note Polyphonic Synth</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPad;