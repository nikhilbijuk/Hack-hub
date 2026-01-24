import type { Event, Post, User, FacilityStatus } from './types';

export const MOCK_EVENT: Event = {
    id: 'evt_001',
    name: 'Neon Nights 2026',
    code: '123456',
    description: 'The ultimate 24-hour cyberpunk hackathon. Build the future, survive the night.',
    location: 'Cyberdome Arena, Sector 7',
    startDate: '2026-03-15T09:00:00Z',
    endDate: '2026-03-16T10:00:00Z',
    schedule: [
        { id: 's1', title: 'Opening Ceremony', time: '09:00 AM', type: 'activity', status: 'completed' },
        { id: 's2', title: 'Hacking Begins', time: '10:00 AM', type: 'deadline', status: 'live' },
        { id: 's3', title: 'Lunch: Cyber Tacos', time: '01:00 PM', type: 'food', status: 'upcoming' },
        { id: 's4', title: 'Workshop: AI Agents', time: '03:00 PM', type: 'workshop', status: 'upcoming' },
        { id: 's5', title: 'Midnight Pizza', time: '12:00 AM', type: 'food', status: 'upcoming' },
    ]
};

export const MOCK_USERS: User[] = [
    { id: 'u1', name: 'Alex Cipher', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', role: 'participant', teamName: 'Null Pointers', tags: ['Frontend', 'React'] },
    { id: 'u2', name: 'Sarah Circuit', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', role: 'organizer', tags: ['Ops'] },
    { id: 'u3', name: 'Ravi Glitch', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi', role: 'mentor', tags: ['AI', 'Backend'] },
];

export const MOCK_POSTS: Post[] = [
    {
        id: 'p1',
        authorId: 'u2',
        authorName: 'Sarah Circuit',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        content: 'Pizza has arrived in the main hall! Get it while it\'s hot! 🍕',
        type: 'food',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        likes: 42,
        tag: 'Food Update'
    },
    {
        id: 'p2',
        authorId: 'u3',
        authorName: 'Ravi Glitch',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi',
        content: 'Available to help with Python/Django issues for the next hour. Find me at Table 4.',
        type: 'help',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        likes: 12,
        tag: 'Mentor Available'
    },
    {
        id: 'p3',
        authorId: 'u1',
        authorName: 'Alex Cipher',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        content: 'Deployed our first prototype! Check out the smooth animations.',
        type: 'social',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hr ago
        likes: 8,
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
        tag: 'Milestone'
    }
];

export const MOCK_FACILITIES: FacilityStatus[] = [
    { id: 'f1', name: 'Coffee', icon: 'Coffee', status: 'available', lastReported: new Date().toISOString() },
    { id: 'f2', name: 'Wifi', icon: 'Wifi', status: 'issues', lastReported: new Date().toISOString() },
    { id: 'f3', name: 'Snacks', icon: 'Pizza', status: 'low', lastReported: new Date().toISOString() },
    { id: 'f4', name: 'Mentors', icon: 'Users', status: 'available', lastReported: new Date().toISOString() },
];
