import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './views/Dashboard.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import PrivacyPolicy from './views/PrivacyPolicy.jsx';
import TermsOfService from './views/TermsOfService.jsx';
import Footer from './components/Footer.jsx';
import { useAuth } from './context/AuthContext.jsx';

export default function App() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="app-loading">
                <div className="spinner" />
                <p>Verifying session...</p>
            </div>
        );
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </>
    );
}