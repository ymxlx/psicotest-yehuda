import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import html2canvas from 'html2canvas';
import { QuizType, ScoringLogic } from '../types';

interface ResultsViewProps {
  quizType: QuizType;
  scoring: ScoringLogic;
  rawScores: Record<string, number>;
  totals: Record<string, number>;
  onHome: () => void;
}

export default function ResultsView({ quizType, scoring, rawScores, totals, onHome }: ResultsViewProps) {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportedImage, setExportedImage] = useState<string | null>(null);

  const handleExport = async () => {
    if (!resultRef.current || isExporting) return;
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      const canvas = await html2canvas(resultRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      const dataUrl = canvas.toDataURL('image/png');
      setExportedImage(dataUrl);
    } catch (e) {
      console.error("Failed to export image", e);
    } finally {
      setIsExporting(false);
    }
  };

  const loveData = quizType === 'love' 
    ? Object.keys(rawScores).map(k => ({
        subject: k,
        A: Number((rawScores[k] / totals[k]).toFixed(2)),
        fullMark: 5
      }))
    : [];

  const attachmentData = quizType === 'attachment'
    ? Object.keys(rawScores).map(k => ({
        name: k === 'avoidance' ? 'Evitación' : 'Ansiedad',
        score: Number((rawScores[k] / totals[k]).toFixed(2))
      }))
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 flex flex-col items-center">
      <div 
        ref={resultRef}
        className="w-full bg-slate-50 shadow-2xl rounded-3xl overflow-hidden ring-1 ring-slate-200"
      >
        <div className="bg-slate-900 text-white p-8 md:p-12 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold tracking-widest text-slate-400 uppercase mb-3"
          >
            Tu Resultado Principal
          </motion.h3>
          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            {scoring.primaryType}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-slate-300 md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {scoring.explanation}
          </motion.p>
        </div>

        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 bg-white">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h4 className="text-xl font-semibold text-slate-800 mb-6">Mapeo de tu Perfil</h4>
            <div className="h-[300px] w-full bg-slate-50/50 rounded-2xl border border-slate-100 p-4">
              {quizType === 'love' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={loveData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                    <Radar name="Tu Estilo" dataKey="A" stroke="#0f172a" fill="#0f172a" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attachmentData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 5]} tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#334155', fontWeight: 500 }} width={80} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={32}>
                      {attachmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === 'Ansiedad' ? '#334155' : '#64748b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h4 className="text-xl font-semibold text-slate-800 mb-6">Recomendaciones</h4>
            <ul className="space-y-4">
              {scoring.recommendations.map((rec, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">{rec}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 border-t border-slate-200 text-center text-xs font-medium text-slate-400">
          PsicoTest • Herramienta de Autoconocimiento
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button
          onClick={onHome}
          className="px-6 py-3 rounded-xl font-medium text-slate-700 bg-white border border-slate-200 shadow-sm hover:shadow hover:bg-slate-50 hover:text-slate-900 transition-all"
        >
          Volver al Inicio
        </button>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-6 py-3 rounded-xl font-medium text-white bg-slate-900 shadow-lg shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isExporting ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          )}
          {isExporting ? 'Generando imagen...' : 'Exportar Imagen'}
        </button>
      </div>

      <AnimatePresence>
        {exportedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900">Tu Resultado</h3>
                <button onClick={() => setExportedImage(null)} className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
              <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg mb-6 font-medium border border-amber-200">
                ¿Estás en modo incógnito, usando Safari o en un móvil? <strong>Mantén presionada la imagen</strong> para guardarla en tus fotos.
              </p>
              
              <div className="rounded-xl overflow-hidden border border-slate-200 mb-6 bg-slate-50 shadow-inner">
                <img src={exportedImage} alt="Resultado PsicoTest" className="w-full h-auto block" />
              </div>
              
              <div className="flex gap-4">
                <a
                  href={exportedImage}
                  download={`psicotest-${quizType}.png`}
                  className="flex-1 py-3 px-4 bg-slate-900 text-white rounded-xl font-medium text-center hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                >
                  Descargar Imagen
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
