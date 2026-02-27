import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { quizQuestions, QUIZ_CATEGORIES } from '../data/quiz';
import { Heart, Zap, Trophy, RotateCcw, ArrowRight, CheckCircle2, XCircle, Star, Brain } from 'lucide-react';

type Phase = 'intro' | 'playing' | 'result';

function shuffleArray<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function Quiz() {
    const [phase, setPhase] = useState<Phase>('intro');
    const [questions, setQuestions] = useState(quizQuestions);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<Array<{ qId: number; correct: boolean; category: string }>>([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const startQuiz = useCallback(() => {
        const shuffled = shuffleArray(quizQuestions);
        setQuestions(shuffled);
        setCurrent(0);
        setSelected(null);
        setLives(3);
        setStreak(0);
        setBestStreak(0);
        setScore(0);
        setAnswers([]);
        setShowExplanation(false);
        setPhase('playing');
    }, []);

    const q = questions[current];

    const handleAnswer = useCallback((idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        const isCorrect = idx === q.correct;
        const newAnswers = [...answers, { qId: q.id, correct: isCorrect, category: q.category }];
        setAnswers(newAnswers);

        if (isCorrect) {
            const bonus = q.difficulty;
            setScore(s => s + (10 * bonus) + (streak * 2));
            setStreak(s => {
                const newS = s + 1;
                if (newS > bestStreak) setBestStreak(newS);
                return newS;
            });
        } else {
            setStreak(0);
            setLives(l => l - 1);
        }
        setShowExplanation(true);
    }, [selected, q, answers, streak, bestStreak]);

    const nextQuestion = useCallback(() => {
        if (lives <= 0 || current >= questions.length - 1) {
            setPhase('result');
            return;
        }
        setCurrent(c => c + 1);
        setSelected(null);
        setShowExplanation(false);
    }, [lives, current, questions.length]);

    // Calculate category scores for results
    const categoryScores = useMemo(() => {
        const cats: Record<string, { correct: number; total: number }> = {};
        answers.forEach(a => {
            if (!cats[a.category]) cats[a.category] = { correct: 0, total: 0 };
            cats[a.category].total++;
            if (a.correct) cats[a.category].correct++;
        });
        return cats;
    }, [answers]);

    const totalCorrect = answers.filter(a => a.correct).length;
    const percentage = answers.length > 0 ? Math.round((totalCorrect / answers.length) * 100) : 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full min-h-screen pt-24 md:pt-32 pb-12 px-4 md:px-12 max-w-4xl mx-auto flex flex-col pointer-events-auto"
        >
            <AnimatePresence mode="wait">
                {/* === INTRO SCREEN === */}
                {phase === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="flex flex-col items-center text-center gap-8 mt-12"
                    >
                        <div className="relative">
                            <Brain className="w-24 h-24 text-violet-400 mx-auto" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-2 -right-2"
                            >
                                <Zap className="w-8 h-8 text-amber-400" />
                            </motion.div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mix-blend-difference">
                            Quanto ne sai?
                        </h1>
                        <p className="text-lg text-white/60 max-w-lg">
                            25 domande su riduzione del danno, farmacologia, interazioni pericolose, aspetti legali e emergenze.
                            Metti alla prova le tue conoscenze!
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mt-4">
                            {Object.entries(QUIZ_CATEGORIES).map(([key, cat]) => (
                                <span key={key} className="px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border border-white/10" style={{ color: cat.color }}>
                                    {cat.emoji} {cat.label}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-6 mt-4 text-sm text-white/40 font-mono">
                            <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-red-400" /> 3 vite</span>
                            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> Bonus streak</span>
                            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-violet-400" /> 3 livelli</span>
                        </div>

                        <button
                            onClick={startQuiz}
                            className="mt-8 px-12 py-4 bg-white text-black font-black text-xl uppercase tracking-tight rounded-2xl hover:bg-white/90 hover:scale-105 transition-all"
                        >
                            Inizia il Quiz →
                        </button>
                    </motion.div>
                )}

                {/* === PLAYING === */}
                {phase === 'playing' && q && (
                    <motion.div
                        key={`q-${current}`}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-6"
                    >
                        {/* Top bar: lives, progress, streak, score */}
                        <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Heart
                                        key={i}
                                        className={`w-5 h-5 transition-all ${i < lives ? 'text-red-400 fill-red-400' : 'text-white/10'}`}
                                    />
                                ))}
                            </div>

                            <div className="flex-1 mx-4">
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full"
                                        animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <p className="text-[10px] font-mono text-white/40 mt-1 text-center">{current + 1}/{questions.length}</p>
                            </div>

                            <div className="flex items-center gap-4 text-sm font-mono">
                                {streak > 1 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="flex items-center gap-1 text-amber-400"
                                    >
                                        <Zap className="w-4 h-4" />{streak}x
                                    </motion.span>
                                )}
                                <span className="text-white/60">{score} pt</span>
                            </div>
                        </div>

                        {/* Category + difficulty badge */}
                        <div className="flex items-center gap-3">
                            <span
                                className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border"
                                style={{ color: QUIZ_CATEGORIES[q.category]?.color, borderColor: QUIZ_CATEGORIES[q.category]?.color + '40' }}
                            >
                                {QUIZ_CATEGORIES[q.category]?.emoji} {QUIZ_CATEGORIES[q.category]?.label}
                            </span>
                            <span className="text-[10px] font-mono text-white/30">
                                {'★'.repeat(q.difficulty)}{'☆'.repeat(3 - q.difficulty)}
                            </span>
                        </div>

                        {/* Question */}
                        <h2 className="text-2xl md:text-3xl font-bold leading-tight">{q.question}</h2>

                        {/* Options */}
                        <div className="flex flex-col gap-3 mt-2">
                            {q.options.map((opt, i) => {
                                const isSelected = selected === i;
                                const isCorrect = i === q.correct;
                                const isRevealed = selected !== null;
                                let bg = 'bg-white/5 border-white/10 hover:bg-white/10';
                                if (isRevealed) {
                                    if (isCorrect) bg = 'bg-emerald-500/20 border-emerald-500/40';
                                    else if (isSelected && !isCorrect) bg = 'bg-red-500/20 border-red-500/40';
                                    else bg = 'bg-white/5 border-white/5 opacity-40';
                                }

                                return (
                                    <motion.button
                                        key={i}
                                        onClick={() => handleAnswer(i)}
                                        disabled={selected !== null}
                                        whileTap={selected === null ? { scale: 0.98 } : {}}
                                        className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all flex items-center gap-3 ${bg} ${selected === null ? 'cursor-pointer' : 'cursor-default'}`}
                                    >
                                        <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-sm font-bold shrink-0 opacity-50">
                                            {String.fromCharCode(65 + i)}
                                        </span>
                                        <span className="text-base md:text-lg">{opt}</span>
                                        {isRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto shrink-0" />}
                                        {isRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Explanation */}
                        <AnimatePresence>
                            {showExplanation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-2"
                                >
                                    <div className={`p-5 rounded-xl border ${selected === q.correct ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            {selected === q.correct
                                                ? <><CheckCircle2 className="w-5 h-5 text-emerald-400" /><span className="font-bold text-emerald-400">Corretto!</span></>
                                                : <><XCircle className="w-5 h-5 text-red-400" /><span className="font-bold text-red-400">Sbagliato!</span></>
                                            }
                                        </div>
                                        <p className="text-white/70 text-sm leading-relaxed">{q.explanation}</p>
                                        {q.link && (
                                            <Link to={q.link} className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider mt-3 text-blue-400 hover:text-blue-300 transition-colors">
                                                Approfondisci →
                                            </Link>
                                        )}
                                    </div>

                                    <button
                                        onClick={nextQuestion}
                                        className="mt-4 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold uppercase tracking-tight transition-colors flex items-center justify-center gap-2"
                                    >
                                        {lives <= 0 ? 'Vedi risultati' : current >= questions.length - 1 ? 'Vedi risultati' : 'Prossima domanda'}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* === RESULT SCREEN === */}
                {phase === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center text-center gap-6 mt-8"
                    >
                        <Trophy className={`w-20 h-20 ${percentage >= 70 ? 'text-amber-400' : percentage >= 40 ? 'text-white/60' : 'text-red-400'}`} />

                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            {percentage >= 80 ? 'Leggendario!' : percentage >= 60 ? 'Bravo!' : percentage >= 40 ? 'Puoi migliorare' : 'Studia di più!'}
                        </h1>

                        <div className="flex items-center gap-8 text-3xl font-black mt-2">
                            <div className="text-center">
                                <div className="text-5xl">{percentage}%</div>
                                <div className="text-xs font-mono text-white/40 mt-1">precisione</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl">{score}</div>
                                <div className="text-xs font-mono text-white/40 mt-1">punti</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl flex items-center justify-center gap-1"><Zap className="w-8 h-8 text-amber-400" />{bestStreak}</div>
                                <div className="text-xs font-mono text-white/40 mt-1">best streak</div>
                            </div>
                        </div>

                        {/* Category breakdown */}
                        <div className="w-full max-w-md mt-6">
                            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Risultati per categoria</h3>
                            <div className="flex flex-col gap-2">
                                {Object.entries(categoryScores).map(([cat, data]) => {
                                    const catInfo = QUIZ_CATEGORIES[cat];
                                    const pct = Math.round((data.correct / data.total) * 100);
                                    return (
                                        <div key={cat} className="flex items-center gap-3">
                                            <span className="text-xs font-mono w-32 text-left truncate" style={{ color: catInfo?.color }}>{catInfo?.emoji} {catInfo?.label}</span>
                                            <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ delay: 0.3, duration: 0.6 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: catInfo?.color }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono w-16 text-right text-white/60">{data.correct}/{data.total}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={startQuiz}
                                className="px-8 py-3 bg-white text-black font-bold uppercase tracking-tight rounded-xl hover:bg-white/90 hover:scale-105 transition-all flex items-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" /> Riprova
                            </button>
                            <Link
                                to="/"
                                className="px-8 py-3 border border-white/20 font-bold uppercase tracking-tight rounded-xl hover:bg-white/10 transition-all"
                            >
                                Torna alla Home
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
