import { useApp } from '../context/AppContext';
// Corrected import path for GlassCard
import GlassCard from '../components/ui/GlassCard'; 

export default function ExplorePage() {
  const { posts, handleLike } = useApp();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        {/* Updated title */}
        <h1 className="text-2xl font-bold text-white italic tracking-tighter">
          FEEDS
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col gap-2">
            {/* Using spread operator to pass post data to GlassCard */}
            <GlassCard {...post} />
            
            <div className="flex items-center justify-between px-2">
              <button 
                onClick={() => handleLike(post.id, post.likes_count)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-pink-500/20 transition-all group"
              >
                <span className="group-hover:scale-125 transition-transform">❤️</span>
                <span className="text-white text-sm font-mono">
                  {post.likes_count || 0}
                </span>
              </button>
              
              <span className="text-[10px] text-white/30 font-mono">
                {new Date(post.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}