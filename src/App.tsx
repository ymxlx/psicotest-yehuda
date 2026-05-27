import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Infinity as InfinityIcon, Sparkles, Brain, ArrowRight } from 'lucide-react';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import { attachmentQuestions, loveQuestions } from './data/questions';
import { calculateAttachmentResult, calculateLoveResult } from './data/scoring';
import { QuizType, QuizResult } from './types';

export default function App() {
  const [view, setView] = useState<'home' | 'quiz' | 'result' | 'history'>('home');
  const [activeQuiz, setActiveQuiz] = useState<QuizType | null>(null);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const [history, setHistory] = useState<QuizResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('psicotest_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveToHistory = (result: QuizResult) => {
    const newHistory = [result, ...history];
    setHistory(newHistory);
    localStorage.setItem('psicotest_history', JSON.stringify(newHistory));
  };

  const currentQuestions = activeQuiz === 'attachment' ? attachmentQuestions : loveQuestions;
  const currentScoringCalc = activeQuiz === 'attachment' ? calculateAttachmentResult : calculateLoveResult;

  const handleStartQuiz = (type: QuizType) => {
    setActiveQuiz(type);
    setView('quiz');
  };

  const handleComplete = (scores: Record<string, number>, totals: Record<string, number>) => {
    if (!activeQuiz) return;
    
    const logic = currentScoringCalc(scores, totals);
    const resultLog: QuizResult = {
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString(),
      type: activeQuiz,
      scores,
      primaryType: logic.primaryType
    };
    
    saveToHistory(resultLog);
    
    // We pass extra stuff via state not just ID to avoid re-calculating if not needed, 
    // but in a real app better to just store logic. Let's just set it explicitly here.
    setCurrentResult(resultLog);
    setView('result');
  };

  const handleHome = () => {
    setView('home');
    setActiveQuiz(null);
    setCurrentResult(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-rose-200 relative overflow-hidden">
      {/* Dynamic Background Blobs */}
      <div className="fixed top-0 inset-x-0 h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-rose-300/[0.2] via-fuchsia-300/[0.1] to-transparent blur-3xl" />
        <div className="absolute top-[30%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-blue-300/[0.2] via-violet-300/[0.1] to-transparent blur-3xl" />
      </div>

      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="font-bold text-xl tracking-tight cursor-pointer flex items-center gap-2 group"
            onClick={handleHome}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-500 to-rose-500 rounded-lg flex items-center justify-center shadow-sm shadow-rose-500/20 group-hover:shadow-md transition-all">
               <Heart className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">PsicoTest</span>
          </div>
          {history.length > 0 && view === 'home' && (
            <button 
              onClick={() => setView('history')}
              className="text-sm font-bold text-fuchsia-600 hover:text-fuchsia-700 px-4 py-2 rounded-xl bg-fuchsia-50 hover:bg-fuchsia-100 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Ver Progreso ({history.length})
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 relative z-10">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12 md:py-20"
            >
              <div className="max-w-4xl mb-20 text-center md:text-left">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 text-sm font-bold mb-8 border border-rose-100 shadow-sm">
                  <Sparkles className="w-4 h-4" /> Herramienta de Autodescubrimiento
                </motion.div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  Descubre la <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500">arquitectura</span> de tus relaciones.
                </h1>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto md:mx-0 font-medium">
                  Evaluaciones psicológicas basadas en la teoría del apego de Bowlby y la teoría triangular del amor de Sternberg para entender profundamente cómo te vinculas.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Quiz Option 1 */}
                <div 
                  className="bg-white p-8 md:p-10 rounded-[2rem] border border-blue-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-200 transition-all group flex flex-col items-start cursor-pointer relative overflow-hidden" 
                  onClick={() => handleStartQuiz('attachment')}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Estilo de Apego</h3>
                  <p className="text-slate-600 mb-10 leading-relaxed flex-1 text-lg">¿Cómo reaccionas ante la intimidad y la separación? Descubre tu patrón primario (Seguro, Ansioso, Evitativo, Temeroso).</p>
                  <button className="text-sm font-bold uppercase tracking-widest text-indigo-600 flex items-center gap-2 transition-all">
                    Iniciar Test <ArrowRight className="w-5 h-5 transition-all transform opacity-50 group-hover:opacity-100 group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Quiz Option 2 */}
                <div 
                  className="bg-white p-8 md:p-10 rounded-[2rem] border border-rose-100 shadow-xl shadow-rose-900/5 hover:shadow-2xl hover:-translate-y-1 hover:border-rose-200 transition-all group flex flex-col items-start cursor-pointer relative overflow-hidden" 
                  onClick={() => handleStartQuiz('love')}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-rose-50 to-transparent rounded-bl-full opacity-50 pointer-events-none" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mb-8 shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform duration-300">
                    <InfinityIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Triángulo del Amor</h3>
                  <p className="text-slate-600 mb-10 leading-relaxed flex-1 text-lg">Basado en la teoría triangular de Sternberg. Evalúa tus niveles de intimidad, pasión y compromiso para descubrir tu tipo de amor.</p>
                  <button className="text-sm font-bold uppercase tracking-widest text-rose-600 flex items-center gap-2 transition-all">
                    Iniciar Test <ArrowRight className="w-5 h-5 transition-all transform opacity-50 group-hover:opacity-100 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'quiz' && activeQuiz && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuizView 
                title={activeQuiz === 'attachment' ? 'Test de Apego Adulto' : 'Triángulo del Amor de Sternberg'}
                questions={currentQuestions} 
                onComplete={handleComplete} 
                onBack={handleHome}
              />
            </motion.div>
          )}

          {view === 'result' && currentResult && activeQuiz && (
             <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               {(() => {
                  const totals: Record<string, number> = {};
                  currentQuestions.forEach(q => {
                    totals[q.dimension] = (totals[q.dimension] || 0) + 1;
                  });
                  const logic = currentScoringCalc(currentResult.scores, totals);
                  return (
                    <ResultsView 
                      quizType={activeQuiz}
                      scoring={logic}
                      rawScores={currentResult.scores}
                      totals={totals}
                      onHome={handleHome}
                    />
                  )
               })()}
             </motion.div>
          )}

          {view === 'history' && (
             <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8">
                <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto p-4 md:p-0">
                  <h2 className="text-3xl font-bold text-slate-900">Tu Historial de Tests</h2>
                  <button onClick={handleHome} className="text-slate-500 hover:text-slate-900 font-medium">Volver</button>
                </div>
                
                <div className="max-w-4xl mx-auto space-y-4 px-4 md:px-0">
                  {history.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                          {item.type === 'attachment' ? 'Apego' : 'Amor'} • {new Date(item.date).toLocaleDateString()}
                        </div>
                        <h4 className="text-xl font-bold text-slate-800">{item.primaryType}</h4>
                      </div>
                      <div className="flex gap-2">
                        {/* We could add an "open" button here if we wanted to view old results, but just listing them is ok for a simple dashboard */}
                      </div>
                    </div>
                  ))}
                  {history.length === 0 && (
                    <p className="text-slate-500 text-center py-12 bg-white rounded-2xl border border-slate-100">
                      Aún no has completado ningún test.
                    </p>
                  )}
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
