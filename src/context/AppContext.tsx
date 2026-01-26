import { createContext, useContext, useState, type ReactNode } from 'react';

// 1. Updated Post Interface to support images
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  type: 'update' | 'event' | 'alert';
  tag: string;
  imageUrl?: string; // Critical for photo support
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  role: string;
}

interface AppContextType {
  posts: Post[];
  currentUser: User | null;
  addPost: (post: Omit<Post, 'id' | 'timestamp'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial mock data to match your HACK_HUB theme
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    authorId: 'sarah-1',
    authorName: 'SARAH CIRCUIT',
    content: 'Pizza has arrived in the main hall! Get it while it\'s hot! 🍕',
    type: 'update',
    tag: 'Update',
    timestamp: Date.now() - 100000,
  },
  {
    id: '2',
    authorId: 'ravi-1',
    authorName: 'RAVI GLITCH',
    content: 'Available to help with Python/Django issues for the next hour. Find me at Table 4.',
    type: 'update',
    tag: 'Update',
    timestamp: Date.now() - 200000,
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [currentUser] = useState<User>({
    id: 'user-123',
    name: 'ADMIN_USER',
    role: 'hacker'
  });

  // 2. Updated addPost to handle the imageUrl data
  const addPost = (newPost: Omit<Post, 'id' | 'timestamp'>) => {
    const post: Post = {
      ...newPost,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    
    // Adds new post (with image) to the top of the feed
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <AppContext.Provider value={{ posts, currentUser, addPost }}>
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