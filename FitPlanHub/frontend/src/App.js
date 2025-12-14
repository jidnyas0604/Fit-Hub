import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TrainerDashboard from './pages/TrainerDashboard';
import PlanDetailsPage from './pages/PlanDetailsPage';
import UserFeed from './pages/UserFeed';
import TrainerProfile from './pages/TrainerProfile';
import './App.css';

import { Container, CssBaseline } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Container component="main" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<TrainerDashboard />} />
            <Route path="/plan/:id" element={<PlanDetailsPage />} />
            <Route path="/feed" element={<UserFeed />} />
            <Route path="/trainer/:id" element={<TrainerProfile />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;

