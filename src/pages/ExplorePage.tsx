import GlassCard from '../components/ui/GlassCard';
import { MapPin } from 'lucide-react';

const LOCATIONS = [
  { id: '1', name: 'Main Hall', description: 'Central hub for major activities.' },
  { id: '2', name: 'Workshop A', description: 'Dedicated space for technical sessions.' },
  { id: '3', name: 'Networking Lounge', description: 'Relaxed area for meeting peers.' }
];

export default function ExplorePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-4xl font-black font-heading uppercase tracking-tighter leading-none text-white">
          Explore
        </h2>
        <p className="text-white/40 font-mono mt-2">Discover active zones within the hub.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LOCATIONS.map((loc) => (
          <GlassCard key={loc.id} className="p-6 border-white/5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{loc.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{loc.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}