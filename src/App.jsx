// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DailyPrompt from './components/DailyPrompt';
import ReflectionReminder from './components/ReflectionReminder';
import Timeline from './components/Timeline';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><DailyPrompt /></PrivateRoute>} />
          <Route path="/reflection" element={<PrivateRoute><ReflectionReminder /></PrivateRoute>} />
          <Route path="/timeline" element={<PrivateRoute><Timeline /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
