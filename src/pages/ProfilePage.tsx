import { useApp } from '../context/AppContext';
import GlassCard from '../components/ui/GlassCard';
import { cn } from '../lib/utils';
import { Activity, Terminal, Code, Cpu, Award } from 'lucide-react';

export default function ProfilePage() {
    const { currentUser } = useApp();

    return (
        <div className="max-w-5xl mx-auto space-y-8">

            {/* DOSSIER HEADER */}
            <header className="flex flex-col md:flex-row gap-8 items-start">
                {/* ID CARD */}
                <div className="relative group shrink-0">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-primary via-transparent to-secondary rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity" />
                    <GlassCard className="w-full md:w-80 p-0 overflow-hidden relative bg-black/80 backdrop-blur-xl border-white/10">
                        <div className="h-32 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-50 mix-blend-overlay" />
                        <div className="absolute top-4 right-4">
                            <img src="/qrcode.png" className="w-12 h-12 opacity-80 invert" alt="QR" />
                        </div>
                        <div className="p-6 pt-0 relative -top-12">
                            <div className="w-24 h-24 rounded-lg border-2 border-primary bg-black p-1 mb-4 shadow-[0_0_20px_rgba(223,255,0,0.3)]">
                                <img src={currentUser?.avatar} className="w-full h-full object-cover rounded" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-1">{currentUser?.name}</h2>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="label-mono text-primary bg-primary/10 px-2 py-0.5 rounded">LEVEL_4_OPERATIVE</span>
                                <span className="label-mono text-white/40">{currentUser?.teamName}</span>
                            </div>

                            <div className="space-y-2 font-mono text-xs text-white/60">
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span>STATUS</span>
                                    <span className="text-green-500 font-bold">ACTIVE</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span>ID_REF</span>
                                    <span>{currentUser?.id?.toUpperCase() || 'UNK-000'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>CLEARANCE</span>
                                    <span className="text-secondary">CLASS_A</span>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* STATS & BIOMETRICS */}
                <div className="flex-1 space-y-6 w-full">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard icon={Award} label="Missions" value="12" />
                        <StatCard icon={Activity} label="Uptime" value="98%" />
                        <StatCard icon={Code} label="Lines_Code" value="45K" />
                        <StatCard icon={Cpu} label="CPU_Usage" value="34%" />
                    </div>

                    {/* SKILL MATRIX */}
                    <GlassCard className="p-6">
                        <div className="flex items-center gap-2 mb-6 text-primary">
                            <Terminal size={18} />
                            <h3 className="font-bold uppercase tracking-widest text-sm">Skill_Matrix</h3>
                        </div>
                        <div className="space-y-4">
                            <SkillBar label="Frontend Architecture" percent={85} color="bg-primary" />
                            <SkillBar label="Backend Systems" percent={60} color="bg-secondary" />
                            <SkillBar label="Neural Networks" percent={45} color="bg-purple-500" />
                            <SkillBar label="Cybersecurity" percent={70} color="bg-red-500" />
                        </div>
                    </GlassCard>
                </div>
            </header>

            {/* ACTIVITY LOG */}
            <section className="bg-black/50 border border-white/10 rounded-lg overflow-hidden font-mono text-xs">
                <header className="bg-white/5 border-b border-white/5 p-2 px-4 flex justify-between items-center text-white/40">
                    <span>TERMINAL_LOG :: {currentUser?.name}</span>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                    </div>
                </header>
                <div className="p-4 space-y-2 text-white/70 h-64 overflow-y-auto">
                    <LogLine time="1 mins ago" cmd="git commit -m 'Initial profile build'" />
                    <LogLine time="15 mins ago" cmd="ssh user@cyber-mainframe" />
                    <LogLine time="1 hour ago" cmd="npm install @neural/core" />
                    <LogLine time="2 hours ago" cmd="access_token --refresh" status="SUCCESS" color="text-green-500" />
                    <LogLine time="1 day ago" cmd="system_diagnostic --full" />
                    <div className="animate-pulse text-primary mt-4">_</div>
                </div>
            </section>
        </div>
    );
}

function StatCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="bg-white/5 border border-white/10 p-4 rounded flex flex-col items-center justify-center text-center gap-2 hover:bg-white/10 transition-colors cursor-default group">
            <Icon size={20} className="text-white/40 group-hover:text-primary transition-colors mb-1" />
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="label-mono text-[9px] text-white/40">{label}</div>
        </div>
    )
}

function SkillBar({ label, percent, color }: { label: string, percent: number, color: string }) {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="label-mono text-[10px] text-white/60">{label}</span>
                <span className="label-mono text-[10px] text-white/40">{percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000", color)}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    )
}

function LogLine({ time, cmd, status, color }: { time: string, cmd: string, status?: string, color?: string }) {
    return (
        <div className="flex gap-4">
            <span className="text-white/30 w-24 shrink-0">[{time}]</span>
            <span className="flex-1">
                <span className="text-secondary mr-2">$</span>
                {cmd}
            </span>
            {status && <span className={color || 'text-white'}>{status}</span>}
        </div>
    )
}
