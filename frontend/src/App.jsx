import Dashboard from './views/Dashboard.jsx';
import Login from './views/Login.jsx'
import { useAuth } from './context/AuthContext.jsx';

export default function App() {
  const {isAuthenticated} = useAuth();

  return(
    <div className="app-root-container">
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}