import { useState } from 'react';
import Dashboard from './views/Dashboard.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return(
    <div className = "app-root-container">
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'login' && <div className = "placeholder-portal">Login</div>}
      {currentView === 'settings' && <div className = "placeholder-portal">Settings</div>}
    </div>
  );
}