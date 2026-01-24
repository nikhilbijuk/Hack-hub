import React from 'react';
import { useApp } from '../context/AppContext';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Newspaper, CalendarDays, Compass, Users, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';

// Helper Component Props

interface MobileNavItemProps {
    to: string;
    icon: React.ReactElement;
    label: string;
}

interface MainFABProps {
    to: string;
    icon: React.ReactElement;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { currentUser, logout, currentEvent } = useApp();

    return (
        <div className="min-h-screen bg-background text-white flex overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none z-0" />

            {/* Sidebar (Desktop) */}
            {/* Industrial Sidebar */}
            <aside className="hidden md:flex flex-col w-72 bg-surface border-r border-white/5 z-10 relative">
                <div className="p-8 relative">
                    <div className="absolute top-4 left-8 label-mono text-[8px]">Protocol: Hub_v1.0</div>
                    <h1 className="text-4xl font-black font-heading text-white tracking-tighter mix-blend-difference mt-4">
                        HACK<span className="text-primary">_</span>HUB
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                        <p className="label-mono uppercase">{currentEvent?.name}</p>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-1">
                    <NavItem to="/dashboard/share" icon={<Newspaper size={18} />} label="Signal" />
                    <NavItem to="/dashboard/events" icon={<CalendarDays size={18} />} label="Timeline" />
                    <NavItem to="/dashboard/explore" icon={<Compass size={18} />} label="Discovery" />
                    <NavItem to="/dashboard/connect" icon={<Users size={18} />} label="Network" />

                    {/* Hand-drawn annotation arrow pointing to discovery */}
                    <div className="relative h-12 mt-8 opacity-40">
                        <div className="annotation absolute left-8 top-0 rotate-[-5deg]">
                            Check events! →
                        </div>
                    </div>
                </nav>

                <div className="p-8 bg-black/40 border-t border-white/5">
                    <NavLink to="/dashboard/profile" className="flex items-center gap-4 mb-6 group cursor-pointer">
                        <div className="relative">
                            <img src={currentUser?.avatar} alt="Avatar" className="w-10 h-10 rounded-none border border-white/10 grayscale contrast-125 group-hover:border-primary transition-colors" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-black uppercase text-white truncate group-hover:text-primary transition-colors">{currentUser?.name}</p>
                            <p className="label-mono text-[9px] truncate">{currentUser?.teamName}</p>
                        </div>
                    </NavLink>
                    <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start px-0 text-white/30 hover:text-accent transition-colors">
                        [ Terminate_Session ]
                    </Button>
                </div>

                {/* Decorative Grid Marker */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/5 opacity-50" />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative z-0 overflow-hidden h-screen bg-background">
                {/* Subtle Grid Overlay Layer */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <header className="md:hidden flex items-center justify-between p-6 bg-surface border-b border-white/10 sticky top-0 z-20">
                    <h1 className="text-xl font-black font-heading text-white">HACK_HUB</h1>
                    <button onClick={logout} className="text-white/40 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-24 md:pb-12 scroll-smooth relative z-10">
                    {children}
                </div>

                {/* Mobile Bottom Nav - Industrial */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-white/10 z-30 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-around items-center h-16 px-2">
                        <MobileNavItem to="/dashboard/events" icon={<CalendarDays size={20} />} label="Events" />
                        <MobileNavItem to="/dashboard/explore" icon={<Compass size={20} />} label="Explore" />
                        <div className="relative -top-4">
                            <MainFAB to="/dashboard/share" icon={<Newspaper size={24} />} />
                        </div>
                        <MobileNavItem to="/dashboard/connect" icon={<Users size={20} />} label="Users" />
                        <MobileNavItem to="/dashboard/profile" icon={<div className="w-5 h-5 rounded bg-white/10 border border-white/20" />} label="Profile" />
                    </div>
                </nav>
            </main>
        </div>
    );
}

// Refactored NavItem Implementation
function NavItem({ to, icon, label }: { to: string; icon: React.ReactElement; label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(
                "flex items-center gap-4 px-4 py-4 transition-all duration-300 group relative border-l-2",
                isActive
                    ? "bg-white/5 border-primary text-white"
                    : "border-transparent text-white/30 hover:text-white hover:bg-white/[0.02] hover:border-white/10",
            )}
        >
            <span className={cn("transition-transform group-hover:scale-110", "z-10")}>{icon}</span>
            <span className="relative z-10 text-xs font-black uppercase tracking-[0.15em]">{label}</span>
            {/* Active Indicator Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </NavLink>
    )
}

function MobileNavItem({ to, icon, label }: MobileNavItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(
                "flex flex-col items-center justify-center w-12 transition-colors",
                isActive ? "text-primary" : "text-white/20"
            )}
        >
            {icon}
            <span className="label-mono text-[7px] mt-1">{label}</span>
        </NavLink>
    )
}

function MainFAB({ to, icon }: MainFABProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(
                "flex items-center justify-center w-14 h-14 bg-primary text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all",
                isActive ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""
            )}
        >
            {icon}
        </NavLink>
    )
}
