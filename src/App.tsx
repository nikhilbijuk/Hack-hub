import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import EventCodePage from './pages/EventCodePage';
import EventPreviewPage from './pages/EventPreviewPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';

import SharePage from './pages/SharePage';
import EventsPage from './pages/EventsPage';
import ExplorePage from './pages/ExplorePage';
import ConnectPage from './pages/ConnectPage';
import ProfilePage from './pages/ProfilePage';
import DocsPage from './pages/DocsPage';
import NotFoundPage from './pages/NotFoundPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) {
    return <Navigate to="/join" />;
  }
  return <>{children}</>;
}

function MockRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/join" element={<EventCodePage />} />
        <Route path="/preview" element={<EventPreviewPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Navigate to="/dashboard/share" replace />
              {/* The Outlet should be here but DashboardLayout handles layout, 
                                 we need nested routes or handle children. 
                                 Wait, DashboardLayout renders {children}.
                                 react-router-dom v6 uses nested routes with <Outlet>.
                                 I'll adjust this structure to standard v6.
                             */}
            </DashboardLayout>
          </ProtectedRoute>
        }>
          {/* 
                      Wait, passing children to DashboardLayout in Route element is tricky.
                      Better pattern:
                      element={<DashboardLayout><Outlet /></DashboardLayout>}
                      Then child routes.
                    */}
        </Route>

        {/* 
                  Correcting Route Structure:
                */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="share" element={<SharePage />} />
                  <Route path="events" element={<EventsPage />} />
                  <Route path="explore" element={<ExplorePage />} />
                  <Route path="connect" element={<ConnectPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route index element={<Navigate to="share" replace />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/docs" element={<DocsPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MockRouter />
    </AppProvider>
  );
}
