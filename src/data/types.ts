export interface User {
    id: string;
    name: string;
    avatar: string; // URL or placeholder
    role: 'participant' | 'organizer' | 'mentor';
    teamName?: string;
    tags: string[];
}

export interface Event {
    id: string;
    name: string;
    code: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    schedule: ScheduleItem[];
}

export interface ScheduleItem {
    id: string;
    title: string;
    time: string;
    type: 'workshop' | 'deadline' | 'food' | 'activity';
    status: 'upcoming' | 'live' | 'completed';
}

export interface Post {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar: string; // Added for easier UI access
    content?: string;
    type: 'update' | 'help' | 'social' | 'food';
    timestamp: string; // ISO string
    likes: number;
    imageUrl?: string;
    tag?: string; // e.g. "Front-end", "Help Needed"
}

export interface FacilityStatus {
    id: string;
    name: string; // Coffee, Wifi, Food
    icon: string; // Lucide icon name
    status: 'available' | 'low' | 'empty' | 'issues';
    lastReported: string; // timestamp
}

export interface AppState {
    currentUser: User | null;
    currentEvent: Event | null;
    posts: Post[];
    facilityStatuses: FacilityStatus[];
    isAuthenticated: boolean;
}
