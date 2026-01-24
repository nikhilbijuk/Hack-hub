import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AppState, User, Post, Event, FacilityStatus } from '../data/types';
import { MOCK_EVENT, MOCK_POSTS, MOCK_FACILITIES } from '../data/mock';

interface AppContextType extends AppState {
    login: (user: User) => void;
    logout: () => void;
    joinEvent: (code: string) => boolean;
    addPost: (post: Omit<Post, 'id' | 'likes' | 'timestamp' | 'authorAvatar'>) => void;
    updateFacilityStatus: (id: string, status: FacilityStatus['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('hackhub_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [currentEvent, setCurrentEvent] = useState<Event | null>(() => {
        const saved = localStorage.getItem('hackhub_event');
        return saved ? JSON.parse(saved) : null;
    });
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const [facilityStatuses, setFacilityStatuses] = useState<FacilityStatus[]>(MOCK_FACILITIES);

    const login = (user: User) => {
        setCurrentUser(user);
        localStorage.setItem('hackhub_user', JSON.stringify(user));
    };

    const logout = () => {
        setCurrentUser(null);
        setCurrentEvent(null);
        localStorage.removeItem('hackhub_user');
        localStorage.removeItem('hackhub_event');
    };

    const joinEvent = (code: string): boolean => {
        if (code === MOCK_EVENT.code) {
            setCurrentEvent(MOCK_EVENT);
            localStorage.setItem('hackhub_event', JSON.stringify(MOCK_EVENT));
            return true;
        }
        return false;
    };

    const addPost = (newPost: Omit<Post, 'id' | 'likes' | 'timestamp' | 'authorAvatar'>) => {
        if (!currentUser) return;

        const post: Post = {
            ...newPost,
            id: `p${Date.now()}`,
            authorAvatar: currentUser.avatar, // Ensure this is available
            timestamp: new Date().toISOString(),
            likes: 0,
        };

        setPosts(prev => [post, ...prev]);
    };

    const updateFacilityStatus = (id: string, newStatus: FacilityStatus['status']) => {
        setFacilityStatuses(prev => prev.map(f =>
            f.id === id ? { ...f, status: newStatus, lastReported: new Date().toISOString() } : f
        ));
    };

    return (
        <AppContext.Provider value={{
            currentUser,
            currentEvent,
            posts,
            facilityStatuses,
            isAuthenticated: !!currentUser && !!currentEvent,
            login,
            logout,
            joinEvent,
            addPost,
            updateFacilityStatus
        }}>
            {children}
        </AppContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
