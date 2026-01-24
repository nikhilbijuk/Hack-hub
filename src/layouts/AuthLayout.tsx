import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    // Mouse Spotlight Effect (Duplicate logic from Landing for consistency)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div
            onMouseMove={handleMouseMove}
            className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background selection:bg-primary selection:text-black cursor-crosshair"
        >
            {/* Film Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20" style={{ backgroundImage: 'url("/noise.png")', backgroundSize: '100px 100px' }} />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none z-20"></div>

            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />

            {/* Spotlight Overlay */}
            <motion.div
                className="absolute inset-0 z-0 bg-white/[0.03] pointer-events-none"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            />

            <motion.main
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md relative z-30"
            >
                {/* Glass container for the form */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                    <div className="relative bg-surface/50 backdrop-blur-xl border border-white/10 p-8 rounded-xl shadow-2xl">
                        {children}
                    </div>
                    {/* Industrial Corner Markers */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
                </div>
            </motion.main>
        </div>
    );
}
