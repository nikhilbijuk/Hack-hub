import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon, label, ...props }, ref) => {
        return (
            <div className="relative w-full group">
                {label && (
                    <div className="mb-2 flex items-center gap-2">
                        <span className="label-mono">{label}</span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        className={cn(
                            'flex w-full bg-white/5 border border-white/10 px-4 py-4 text-xs font-mono text-white placeholder:text-white/10 focus-visible:outline-none focus-visible:border-primary/50 focus-visible:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 uppercase tracking-wider',
                            icon ? 'pl-11' : '',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {/* Precision crosshair corners */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 pointer-events-none" />
                </div>
            </div>
        );
    }
);
Input.displayName = 'Input';

export default Input;
