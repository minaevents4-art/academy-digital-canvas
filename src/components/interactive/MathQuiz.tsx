import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Trophy, RefreshCcw } from 'lucide-react';

const MathQuiz = () => {
  const [question, setQuestion] = useState({ a: 0, b: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setLeft] = useState(30);
  const [isGameOver, setGameOver] = useState(false);

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    setQuestion({ a, b, answer: a * b });
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === question.answer) {
      setScore(score + 10);
      toast.success('Awesome!', { description: 'Correct answer!' });
      setUserAnswer('');
      generateQuestion();
    } else {
      toast.error('Oops!', { description: 'Try again!' });
    }
  };

  const resetGame = () => {
    setScore(0);
    setLeft(30);
    setGameOver(false);
    setUserAnswer('');
    generateQuestion();
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-12">
        <div className="bg-yellow-100 p-6 rounded-full mb-6">
          <Trophy className="w-16 h-16 text-yellow-500" />
        </div>
        <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Time's Up!</h3>
        <p className="text-slate-500 mb-8">You scored <span className="text-sky-500 font-bold">{score}</span> points!</p>
        <button 
          onClick={resetGame}
          className="flex items-center gap-2 bg-sky-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-600 transition-all"
        >
          <RefreshCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Current Score</span>
          <span className="text-3xl font-extrabold text-sky-500">{score}</span>
        </div>
        <div className="bg-slate-100 px-6 py-2 rounded-2xl font-bold text-slate-600">
          ⏳ {timeLeft}s left
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold text-slate-400 mb-4">Quick Multiply!</h3>
        <div className="text-7xl md:text-8xl font-black text-slate-800 mb-12 flex items-center gap-4">
          <span>{question.a}</span>
          <span className="text-sky-400">×</span>
          <span>{question.b}</span>
          <span className="text-sky-400">=</span>
          <span className="text-slate-200">?</span>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <input
            autoFocus
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full text-center text-4xl font-bold py-4 rounded-2xl border-4 border-slate-100 focus:border-sky-500 outline-none transition-all mb-4"
            placeholder="?"
          />
          <button 
            type="submit"
            className="w-full bg-sky-500 text-white py-4 rounded-2xl font-bold text-xl hover:bg-sky-600 shadow-xl shadow-sky-100 transition-all"
          >
            Check Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default MathQuiz;