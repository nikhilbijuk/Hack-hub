import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'outline' | 'pill';
}

const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => {
    const variants = {
        default: 'bg-primary text-black font-black',
        success: 'bg-secondary text-white font-bold',
        warning: 'bg-accent text-white font-bold',
        error: 'bg-red-600 text-white font-bold',
        outline: 'bg-transparent border border-white/20 text-white/60 font-mono',
        pill: 'bg-white/10 text-white border-transparent backdrop-blur-md rounded-full px-4',
    };

    return (
        <div className={cn(
            'inline-flex items-center justify-center px-2 py-0.5 text-[9px] uppercase tracking-widest transition-all',
            variants[variant],
            className
        )} {...props} />
    );
}

export default Badge;
