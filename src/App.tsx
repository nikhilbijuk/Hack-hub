import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './layouts/DashboardLayout';
import SharePage from './pages/SharePage';
import EventsPage from './pages/EventsPage';
import ExplorePage from './pages/ExplorePage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Change 1: Redirect root path to explore instead of posts */}
          <Route path="/" element={<Navigate to="/dashboard/explore" replace />} />
          
          <Route
            path="/dashboard/*"
            element={
              <DashboardLayout>
                <Routes>
                  <Route path="posts" element={<SharePage />} />
                  <Route path="events" element={<EventsPage />} />
                  <Route path="explore" element={<ExplorePage />} />
                  
                  {/* Change 2: Redirect default dashboard path to explore */}
                  <Route index element={<Navigate to="explore" replace />} />
                </Routes>
              </DashboardLayout>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}