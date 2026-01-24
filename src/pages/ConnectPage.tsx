import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { MOCK_USERS } from '../data/mock';
import { MessageCircle, Search, SlidersHorizontal, Hash, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ConnectPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeRoleFilter, setActiveRoleFilter] = useState<string | null>(null);

    const filteredUsers = MOCK_USERS.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesRole = activeRoleFilter ? user.role === activeRoleFilter : true;

        return matchesSearch && matchesRole;
    });

    const handleConnect = (name: string) => {
        alert(`Connection Request transmitted to ${name}. Waiting for handshake...`);
    };

    const toggleRoleFilter = () => {
        // Cycle through filters: null -> participant -> mentor -> organizer -> null
        if (activeRoleFilter === null) setActiveRoleFilter('participant');
        else if (activeRoleFilter === 'participant') setActiveRoleFilter('mentor');
        else if (activeRoleFilter === 'mentor') setActiveRoleFilter('organizer');
        else setActiveRoleFilter(null);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* TERMINAL HEADER & SEARCH */}
            <header className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="label-mono text-primary mb-2">Sector: Human_Resources // Database_Access</div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-white">Neural<span className="text-primary">_</span>Net</h2>
                    </div>
                    {/* Stat Block */}
                    <div className="flex gap-8 border-l border-white/10 pl-6">
                        <div>
                            <div className="text-2xl font-black text-white">{MOCK_USERS.length}</div>
                            <div className="label-mono text-[9px]">TOTAL_NODES</div>
                        </div>
                        <div>
                            <div className="text-2xl font-black text-primary">{filteredUsers.length}</div>
                            <div className="label-mono text-[9px]">ACTIVE_FILTER</div>
                        </div>
                    </div>
                </div>

                {/* COMMAND SEARCH BAR */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/5 rounded-lg -m-1 blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center bg-black/50 border border-white/20 rounded-lg p-1 overflow-hidden focus-within:border-primary/50 transition-colors">
                        <div className="px-4 text-white/40">
                            <Search size={20} />
                        </div>
                        <div className="label-mono text-primary mr-2 opacity-50 select-none hidden md:block">root@net: search --q</div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='"React" or "Designer"...'
                            className="flex-1 bg-transparent border-none outline-none text-white font-mono h-12 placeholder:text-white/10 min-w-0"
                            autoFocus
                        />

                        {activeRoleFilter && (
                            <div className="flex items-center gap-1 mr-2 px-2 py-1 bg-primary/20 rounded text-[10px] text-primary font-bold uppercase">
                                <span>ROLE: {activeRoleFilter}</span>
                                <button onClick={() => setActiveRoleFilter(null)} className="hover:text-white"><X size={12} /></button>
                            </div>
                        )}

                        <button
                            onClick={toggleRoleFilter}
                            className={cn(
                                "px-4 py-2 rounded transition-colors",
                                activeRoleFilter ? "bg-primary text-black" : "hover:bg-white/5 text-white/40 hover:text-white"
                            )}
                        >
                            <SlidersHorizontal size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* PERSONNEL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => {
                    // Mock Match Calculation based on ID length/char to remain consistent but "random"
                    const matchScore = 75 + (user.name.length * 2);
                    const isHighMatch = matchScore > 85;

                    return (
                        <GlassCard key={user.id} className="p-0 overflow-hidden group border-white/5 bg-surface/50 hover:bg-surface transition-colors" variant="hover">
                            {/* Card Header with Signal Bar */}
                            <div className={cn(
                                "h-1 w-full transition-all duration-500",
                                isHighMatch ? "bg-primary shadow-[0_0_10px_#DFFF00]" : "bg-white/10"
                            )} />

                            <div className="p-6 relative">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="relative">
                                        <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-md border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-300" />
                                        {/* Activity Dot */}
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black rounded-full flex items-center justify-center p-0.5">
                                            <div className="w-full h-full bg-green-500 rounded-full animate-pulse" />
                                        </div>
                                    </div>

                                    {/* Match Score Indicator */}
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1 mb-1">
                                            <Hash size={10} className="text-white/30" />
                                            <span className={cn(
                                                "font-black text-2xl tracking-tighter",
                                                isHighMatch ? "text-primary" : "text-white/40"
                                            )}>
                                                {matchScore}%
                                            </span>
                                        </div>
                                        <div className="label-mono text-[9px] bg-white/5 px-2 py-0.5 rounded">COMPATIBILITY</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-black text-xl uppercase tracking-tight text-white group-hover:text-primary transition-colors">{user.name}</h3>
                                        <p className="text-xs font-mono text-secondary">[{user.role.toUpperCase()}]</p>
                                    </div>

                                    {/* Tags Layout */}
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                                        {user.tags?.map(tag => (
                                            <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-colors text-white/60">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="p-2 px-6 border-t border-white/5 bg-black/20 flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                                <span className="label-mono text-[9px] text-white/20">ID: {user.id.toUpperCase()}</span>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 text-[10px] hover:text-white group-hover/btn:translate-x-1"
                                    onClick={() => handleConnect(user.name)}
                                >
                                    CONNECT <MessageCircle size={14} className="ml-2" />
                                </Button>
                            </div>
                        </GlassCard>
                    )
                })}
            </div>
        </div>
    );
}
