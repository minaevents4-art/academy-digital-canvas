import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, RefreshCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const englishQuestions: Question[] = [
  {
    id: 1,
    question: "Which of these is a synonym for 'Vibrant'?",
    options: ["Dull", "Energetic", "Quiet", "Heavy"],
    correct: 1,
  },
  {
    id: 2,
    question: "Identify the noun in: 'The eagle flies high.'",
    options: ["Flies", "High", "Eagle", "The"],
    correct: 2,
  },
  {
    id: 3,
    question: "Which sentence is grammatically correct?",
    options: [
      "She don't like apples.",
      "They was going home.",
      "We are studying now.",
      "He have a big dog."
    ],
    correct: 2,
  }
];

const mathQuestions: Question[] = [
  {
    id: 1,
    question: "What is 12 x 8?",
    options: ["86", "94", "96", "104"],
    correct: 2,
  },
  {
    id: 2,
    question: "Solve: 25 + (15 ÷ 3)",
    options: ["30", "20", "40", "13"],
    correct: 0,
  },
  {
    id: 3,
    question: "What is the square root of 144?",
    options: ["10", "12", "14", "16"],
    correct: 1,
  }
];

interface QuizProps {
  type: 'English' | 'Math';
  onScore: (points: number) => void;
  onExit: () => void;
}

export default function QuizModule({ type, onScore, onExit }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [localScore, setLocalScore] = useState(0);

  const questions = type === 'English' ? englishQuestions : mathQuestions;
  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    if (idx === currentQ.correct) {
      setLocalScore(prev => prev + 1);
      onScore(50);
      toast.success("Brilliant! +50 XP");
    } else {
      toast.error("Not quite! Keep trying.");
    }

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelected(null);
      } else {
        setIsFinished(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 1500);
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-12 text-center shadow-2xl border border-indigo-100"
      >
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl text-slate-600 mb-8">
          You scored <span className="text-indigo-600 font-bold">{localScore}/{questions.length}</span> correct.
          Total points earned: <span className="text-indigo-600 font-bold">{localScore * 50} XP</span>
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={onExit}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
          >
            Go to Menu
          </button>
          <button 
            onClick={() => {
              setCurrentIdx(0);
              setSelected(null);
              setIsFinished(false);
              setLocalScore(0);
            }}
            className="flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
          >
            <RefreshCcw className="w-5 h-5" /> Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{type} Quest</h2>
          <p className="text-slate-500">Question {currentIdx + 1} of {questions.length}</p>
        </div>
        <div className="bg-indigo-100 px-4 py-2 rounded-xl">
          <span className="font-bold text-indigo-600">{localScore * 50} XP</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-8">
        <h3 className="text-2xl font-semibold mb-8 text-slate-800">{currentQ.question}</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {currentQ.options.map((opt, idx) => {
            const isCorrect = idx === currentQ.correct;
            const isSelected = selected === idx;
            
            return (
              <button
                key={idx}
                disabled={selected !== null}
                onClick={() => handleSelect(idx)}
                className={`
                  p-5 rounded-2xl text-left font-semibold text-lg transition-all flex items-center justify-between border-2
                  ${selected === null ? 'border-slate-100 hover:border-indigo-400 hover:bg-indigo-50' : ''}
                  ${isSelected && isCorrect ? 'border-green-500 bg-green-50 text-green-700' : ''}
                  ${isSelected && !isCorrect ? 'border-red-500 bg-red-50 text-red-700' : ''}
                  ${selected !== null && isCorrect && !isSelected ? 'border-green-500/50 bg-green-50/50 text-green-700' : ''}
                `}
              >
                {opt}
                {selected !== null && isCorrect && (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                )}
                {isSelected && !isCorrect && (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIdx) / questions.length) * 100}%` }}
        />
      </div>
    </div>
  );
}