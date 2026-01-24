import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-6 selection:bg-red-500/30">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                <AlertTriangle size={64} className="text-red-500 relative z-10 animate-pulse" />
            </div>

            <h1 className="text-6xl md:text-9xl font-black font-heading text-white mb-2 tracking-tighter mix-blend-difference">
                404
            </h1>
            <div className="bg-red-500/10 border border-red-500/20 px-4 py-1 rounded mb-8">
                <p className="font-mono text-red-500 text-xs tracking-widest uppercase">
                    SIGNAL_LOST // COORDINATES_UNKNOWN
                </p>
            </div>

            <Button onClick={() => navigate('/')} className="min-w-[200px]">
                RETURN_TO_BASE
            </Button>
        </div>
    );
}
