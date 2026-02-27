import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

const words = [
  { word: 'ORANGE', hint: 'A citrus fruit and a color' },
  { word: 'PIANO', hint: 'Musical instrument with keys' },
  { word: 'GALAXY', hint: 'A system of stars and planets' },
  { word: 'RAINBOW', hint: 'Colorful arc in the sky' },
  { word: 'CANVAS', hint: 'Where painters create art' },
];

const EnglishScramble = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const scramble = (word: string) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  useEffect(() => {
    setScrambled(scramble(words[currentIdx].word));
    setUserInput('');
    setIsCorrect(false);
  }, [currentIdx]);

  const handleCheck = () => {
    if (userInput.toUpperCase() === words[currentIdx].word) {
      setIsCorrect(true);
      toast.success('Perfect!', { description: 'You found the word!' });
    } else {
      toast.error('Keep trying!', { description: 'Letters are mixed up!' });
    }
  };

  const nextWord = () => {
    setCurrentIdx((currentIdx + 1) % words.length);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-widest">Word Scramble</h3>
        <p className="text-slate-500 flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4" />
          Hint: {words[currentIdx].hint}
        </p>
      </div>

      <div className="flex gap-2 mb-12 flex-wrap justify-center">
        {scrambled.split('').map((letter, i) => (
          <motion.div
            key={`${currentIdx}-${i}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center text-3xl font-black shadow-sm border border-sky-100"
          >
            {letter}
          </motion.div>
        ))}
      </div>

      <div className="w-full space-y-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
          disabled={isCorrect}
          placeholder="Unscramble here..."
          className={`w-full text-center text-2xl font-bold py-4 rounded-2xl border-4 outline-none transition-all ${
            isCorrect ? 'bg-green-50 border-green-500 text-green-600' : 'border-slate-100 focus:border-sky-500'
          }`}
        />
        
        {isCorrect ? (
          <button
            onClick={nextWord}
            className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-xl hover:bg-green-600 flex items-center justify-center gap-2"
          >
            Next Word
            <CheckCircle2 className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={handleCheck}
            className="w-full bg-sky-500 text-white py-4 rounded-2xl font-bold text-xl hover:bg-sky-600 shadow-xl shadow-sky-100"
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default EnglishScramble;