import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const result = await login(username, password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Access denied: Invalid credentials.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className= "login-portal-container">
            <form onSubmit = {handleSubmit} className = "login-card">
                <div className = "login-brand">
                    <h2>OpenAtlas | Login </h2>
                </div>

                {error && <div className = "auth-error-banner">{error}</div>}
            
                <div className = "meta-group">
                    <label htmlFor="login-user">User</label>
                    <input
                        id = "login-user"
                        type = "text"
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                        required
                        disabled = {isSubmitting}
                        autoComplete="username"
                    />
                </div>

                <div className = "meta-group" style = {{marginTop: '16px'}}>
                    <label htmlFor="login-password">Password</label>
                    <input
                        id = "login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled = {isSubmitting}
                        autoComplete="current-password"
                    />
                </div>

                <button type="submit" className="auth-action" disabled={isSubmitting}>
                    {isSubmitting ? 'Entering...' : 'Enter'}
                </button>

                <p className="auth-toggle">
                    Need an account?{' '}
                    <button type="button" className="link-button" onClick={() => navigate('/signup')}>
                        Create one
                    </button>
                </p>
            </form>
        </div>
    );
}