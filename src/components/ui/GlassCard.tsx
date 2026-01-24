import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
    variant?: 'default' | 'hover';
    label?: string;
    children?: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ className, variant = 'default', label, children, ...props }) => {
    return (
        <motion.div
            className={cn(
                'modular-card p-6 bg-card border border-white/10 flex flex-col',
                variant === 'hover' && 'hover:border-primary/40 group cursor-pointer',
                className
            )}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            {...props}
        >
            {label && (
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                    <span className="label-mono">{label}</span>
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                </div>
            )}

            <div className="relative z-10 flex-1">{children}</div>

            {/* Mechanical Decorative Accents */}
            <div className="absolute bottom-0 right-0 p-1 opacity-20 transition-opacity group-hover:opacity-100">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L11 1" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M11 11L1 1" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>
        </motion.div>
    );
};

export default GlassCard;
