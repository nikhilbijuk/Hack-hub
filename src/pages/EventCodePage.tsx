import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/ui/Button';
import { ArrowRight, Lock, Unlock, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function EventCodePage() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { joinEvent } = useApp();
    const navigate = useNavigate();
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input on mount
        if (inputRefs.current[0]) inputRefs.current[0].focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-advance
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        setError('');
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.every(char => !isNaN(Number(char)))) {
            const newCode = [...code];
            pastedData.forEach((char, i) => {
                if (i < 6) newCode[i] = char;
            });
            setCode(newCode);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join('');

        if (fullCode.length !== 6) {
            setError('INCOMPLETE_SEQUENCE');
            return;
        }

        setLoading(true);

        // Simulated Decryption Delay
        setTimeout(() => {
            const success = joinEvent(fullCode);
            if (success) {
                setLoading(false);
                setIsSuccess(true);
                // Navigate after animation
                setTimeout(() => navigate('/preview'), 2000);
            } else {
                setError('ACCESS_DENIED // INVALID_TOKEN');
                setLoading(false);
                setCode(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        }, 1200);
    };

    const isComplete = code.every(digit => digit !== '');

    return (
        <AuthLayout>
            <div className="text-center mb-10 relative">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-primary"
                            >
                                <Unlock size={24} />
                            </motion.div>
                        ) : loading ? (
                            <motion.div
                                key="loading"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            >
                                <Loader2 className="text-primary" size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="lock"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className="relative z-10"
                            >
                                <Lock className="text-white/30" size={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Scanner Effect */}
                    {!isSuccess && !loading && (
                        <motion.div
                            animate={{ top: ['100%', '-100%'] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 1 }}
                            className="absolute left-0 right-0 h-[2px] bg-primary/50 shadow-[0_0_10px_#DFFF00] z-20"
                        />
                    )}
                </motion.div>

                <h2 className="text-4xl font-black font-heading uppercase tracking-tighter mb-2">
                    {isSuccess ? <span className="text-primary">Access Granted</span> : 'System Access'}
                </h2>
                <p className="label-mono text-white/40">
                    {isSuccess ? 'Redirecting to Secure Uplink...' : 'Enter 6-Digit Security Token'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Visual PIN Input */}
                <div className="flex justify-between gap-2" onPaste={handlePaste}>
                    {code.map((digit, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative group"
                        >
                            <input
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                maxLength={1}
                                className={cn(
                                    "w-12 h-16 bg-black/50 border-2 rounded-lg text-center text-2xl font-bold font-mono focus:outline-none transition-all duration-300 relative z-10",
                                    error ? "border-red-500/50 text-red-500" :
                                        isSuccess ? "border-primary text-primary bg-primary/10" :
                                            digit ? "border-primary text-primary shadow-[0_0_15px_rgba(223,255,0,0.1)]" : "border-white/10 text-white focus:border-white/30"
                                )}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                disabled={loading || isSuccess}
                            />
                            {/* Corner Accents */}
                            <div className={cn(
                                "absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-colors",
                                digit || isSuccess ? "bg-primary" : "bg-white/10"
                            )} />
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-center overflow-hidden"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs font-mono uppercase tracking-widest">
                                <ShieldCheck size={12} />
                                {error}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    type="submit"
                    className="w-full h-14 text-sm tracking-widest uppercase font-bold overflow-hidden relative"
                    variant={isComplete ? "primary" : "outline"}
                    disabled={!isComplete || loading || isSuccess}
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.span
                                key="loading"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                Decrypting Protocol...
                            </motion.span>
                        ) : isSuccess ? (
                            <motion.span
                                key="success"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle2 size={18} /> SESSION_ESTABLISHED
                            </motion.span>
                        ) : (
                            <motion.span
                                key="default"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                Authenticate_Session <ArrowRight size={16} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Button>

                <div className="text-center">
                    <p className="text-[10px] text-white/20 label-mono">
                        SECURE_CONNECTION_ESTABLISHED_V1.0
                    </p>
                </div>
            </form>

            {/* Success Overlay Full Screen Flash */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center pointer-events-none"
                    >
                        {/* Initial Flash */}
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute inset-0 bg-primary z-10"
                        />

                        <motion.h1
                            initial={{ scale: 2, opacity: 0, filter: "blur(20px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
                            className="text-[15vw] leading-none font-black font-heading uppercase tracking-tighter"
                            style={{
                                WebkitTextStroke: '3px #DFFF00',
                                color: 'transparent'
                            }}
                        >
                            GRANTED
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-primary font-mono font-bold tracking-[0.5em] text-sm md:text-xl uppercase"
                        >
                            Clearance Level: UNICORN
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}
