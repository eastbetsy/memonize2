import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import FlashcardsPage from './pages/FlashcardsPage';
import MiniGamesPage from './pages/MiniGamesPage';
import PomodoroRoomsPage from './pages/PomodoroRoomsPage';
import StudyGroupsPage from './pages/StudyGroupsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
          <Route path="memoquest" element={<MiniGamesPage />} />
          <Route path="pomodoro-rooms" element={<PomodoroRoomsPage />} />
          <Route path="study-groups" element={<StudyGroupsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);