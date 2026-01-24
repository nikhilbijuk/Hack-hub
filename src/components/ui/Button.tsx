import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    children,
    ...props
}) => {
    const variants = {
        primary: 'bg-primary text-black hover:bg-white hover:text-black border-transparent font-black',
        secondary: 'bg-white/5 text-white hover:bg-white/10 border border-white/10 backdrop-blur-sm',
        accent: 'bg-secondary text-white hover:brightness-110 border-transparent',
        ghost: 'bg-transparent text-white/50 hover:text-white hover:bg-white/5 border-transparent',
        outline: 'bg-transparent text-white border-2 border-white/20 hover:border-primary hover:text-primary',
    };

    const sizes = {
        sm: 'px-4 py-2 text-[10px] uppercase tracking-widest',
        md: 'px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-bold',
        lg: 'px-10 py-5 text-sm uppercase tracking-[0.25em] font-black',
    };

    return (
        <motion.button
            whileHover={{ y: -2, x: 2 }}
            whileTap={{ y: 0, x: 0 }}
            className={cn(
                'relative inline-flex items-center justify-center transition-all focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none font-heading',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {/* Corner Accent for Industrial feel */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-white/20" />

            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
    );
};

export default Button;
