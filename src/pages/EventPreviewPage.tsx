import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { Calendar, MapPin, Clock, Radio, ArrowRight, CornerDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventPreviewPage() {
    const { currentEvent } = useApp();
    const navigate = useNavigate();

    // Glitch Text Component (Simply styled text now)
    const GlitchTitle = ({ text }: { text: string }) => (
        <div className="relative inline-block mb-6">
            <span className="text-4xl md:text-5xl font-black font-heading uppercase text-white leading-none tracking-tighter">
                {text}
            </span>
        </div>
    );

    if (!currentEvent) {
        navigate('/join');
        return null; // Handle missing context gracefully
    }

    return (
        <AuthLayout>
            <div className="text-center mb-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest mb-6"
                >
                    <Radio size={12} className="animate-pulse" />
                    Signal Detected
                </motion.div>

                <div className="mb-4">
                    <GlitchTitle text={currentEvent.name} />
                </div>

                <p className="text-white/40 label-mono">Secure Protocol Available</p>
            </div>

            <GlassCard
                className="mb-8 border-primary/30 bg-primary/[0.02] relative overflow-hidden group hover:border-primary/50 transition-colors duration-500"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {/* Scanner Bar */}
                <motion.div
                    animate={{ top: ['-10%', '110%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 1 }}
                    className="absolute left-0 right-0 h-[1px] bg-primary/20 pointer-events-none"
                />

                <div className="flex items-start gap-4 mb-6">
                    <CornerDownRight className="text-primary mt-1 shrink-0" />
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
                        {currentEvent.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DataCell
                        icon={<Calendar size={14} />}
                        label="DATE"
                        value={new Date(currentEvent.startDate).toLocaleDateString()}
                    />
                    <DataCell
                        icon={<Clock size={14} />}
                        label="DURATION"
                        value="24 Hours"
                    />
                    <DataCell
                        icon={<MapPin size={14} />}
                        label="SECTOR"
                        value={currentEvent.location}
                        className="md:col-span-2"
                    />
                </div>
            </GlassCard>

            <div className="space-y-3">
                <Button
                    onClick={() => navigate('/login')}
                    className="w-full h-14 uppercase tracking-widest font-bold text-sm bg-primary text-black hover:bg-white hover:text-black border-none"
                    size="lg"
                >
                    <span className="flex items-center justify-between w-full">
                        Initialize_Uplink <ArrowRight size={16} />
                    </span>
                </Button>

                <button
                    onClick={() => navigate('/join')}
                    className="w-full text-[10px] label-mono text-white/30 hover:text-white transition-colors py-2"
                >
                    [ ABORT_SEQUENCE ]
                </button>
            </div>
        </AuthLayout>
    );
}

function DataCell({ icon, label, value, className }: any) {
    return (
        <div className={`bg-black/20 border border-white/5 p-3 rounded flex items-center justify-between group hover:border-white/10 transition-colors ${className}`}>
            <div className="flex items-center gap-3 text-white/40 group-hover:text-primary/80 transition-colors">
                {icon}
                <span className="label-mono text-[9px]">{label}</span>
            </div>
            <span className="font-mono text-xs text-white uppercase">{value}</span>
        </div>
    )
}
