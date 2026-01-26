import { createContext, useContext, useState, type ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase Client
// Replace these with your actual credentials from Supabase Settings > API
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Updated Post Interface to support images
export interface Post {
  id: string;
  content: string;
  type: 'update' | 'event' | 'alert';
  tag: string;
  imageUrl?: string; 
  timestamp: number;
}

interface AppContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'timestamp'>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  // 3. Updated addPost function for Supabase Sync
  const addPost = async (newPost: Omit<Post, 'id' | 'timestamp'>) => {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ 
        content: newPost.content,
        type: newPost.type,
        tag: newPost.tag,
        imageUrl: newPost.imageUrl,
        timestamp: Date.now() 
      }])
      .select();

    if (error) {
      console.error('Database Error:', error.message);
      return;
    }

    if (data) {
      setPosts((prev) => [data[0], ...prev]);
    }
  };

  return (
    <AppContext.Provider value={{ posts, addPost }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}