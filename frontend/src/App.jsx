import Dashboard from './views/Dashboard.jsx';
import Login from './components/Login.jsx'
import { useAuth } from './context/AuthContext.jsx';
import { useState } from 'react';
import Signup from './components/Signup';

export default function App() {
  const {isAuthenticated, isLoading} = useAuth();
  const [view, setView] = useState('login');

  if(isLoading){
    return(
      <div className = "app-loading">
        <div className = "spinner" />
        <p>Verifying session...</p>
      </div>
    );
  }

  if(!isAuthenticated){
    return view === 'signup' ? (
      <Signup onSwitchToLogin={() => setView('login')} />
    ) : ( 
      <Login onSwitchToSignup={() => setView('signup')} />
    );
  }

  return <Dashboard />;
}