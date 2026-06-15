import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const {login} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        const result = await login(username, password);

        if(!result.success){
            setError(result.error || 'Access denied: Invalid credentials.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className= "login-portal-container">
            <form onSubmit = {handleSubmit} className = "login-card">
                <div className = "login-brand">
                    <h2>Open Atlas | Core Auth</h2>
                </div>

                {error && <div className = "auth-error-banner">{error}</div>}
            
                <div className = "meta-group">
                    <label>User</label>
                    <input
                        type = "text"
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                        className = "inspector-input"
                        required
                        disabled = {isSubmitting}
                    />
                </div>

                <div className = "meta-group" style = {{marginTop: '16px'}}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className = "inspector-input"
                        required
                        disabled = {isSubmitting}
                    />
                </div>

                <button type="submit" className="auth-action" disabled={isSubmitting}>
                    {isSubmitting ? 'Syncing...' : 'Enter'}
                </button>
            </form>
        </div>
    );
}