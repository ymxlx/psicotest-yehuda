import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';

interface QuizViewProps {
  title: string;
  questions: Question[];
  onComplete: (scores: Record<string, number>, totals: Record<string, number>) => void;
  onBack: () => void;
}

export default function QuizView({ title, questions, onComplete, onBack }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSelect = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    setDirection(1);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      handleFinish(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    } else {
      onBack();
    }
  };

  const handleFinish = (finalAnswers: Record<string, number>) => {
    setIsSubmitting(true);
    const scores: Record<string, number> = {};
    const totals: Record<string, number> = {};

    questions.forEach(q => {
      const val = finalAnswers[q.id] || 0;
      scores[q.dimension] = (scores[q.dimension] || 0) + val;
      totals[q.dimension] = (totals[q.dimension] || 0) + 1;
    });

    setTimeout(() => {
      onComplete(scores, totals);
    }, 600);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl min-h-[450px] flex flex-col relative overflow-hidden ring-1 ring-black/5">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
        <div 
          className="h-full bg-slate-900 transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      <button 
        onClick={handleBack}
        className="text-sm font-medium text-gray-500 hover:text-black self-start mt-4 mb-8 transition-colors"
      >
        &larr; Volver
      </button>

      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">Pregunta {currentIndex + 1} de {questions.length}</p>
      </div>

      <div className="flex-1 flex flex-col justify-center mb-8 relative px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            initial={(d: number) => ({ opacity: 0, x: 20 * d })}
            animate={{ opacity: 1, x: 0 }}
            exit={(d: number) => ({ opacity: 0, x: -20 * d })}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <h3 className="text-2xl font-medium text-gray-900 text-center mb-10 leading-snug">
              "{currentQuestion.text}"
            </h3>

            <div className="flex flex-col gap-3 max-w-md mx-auto">
              {currentQuestion.options.map((opt, i) => {
                const isSelected = answers[currentQuestion.id] === opt.value;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 text-sm md:text-base font-medium
                      ${isSelected 
                        ? 'border-slate-900 bg-slate-900 text-white shadow-md' 
                        : 'border-slate-200 bg-white text-gray-700 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                  >
                    {opt.text}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {isSubmitting && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-slate-900 animate-spin" />
            <p className="text-slate-900 font-medium animate-pulse">Calculando resultados...</p>
          </div>
        </div>
      )}
    </div>
  );
}
