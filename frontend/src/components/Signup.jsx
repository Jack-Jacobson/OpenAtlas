import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup ({onSwitchToLogin}) {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(username.length < 3){
            setError('Username must be at least three characters. (A-Z, 0-9, _-)')
            return;
        }

        if(password.length < 8){
            setError('Password must be at least eight characters.')
            return;
        }

        if (password !== confirmPassword){
            setError('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);
        const result = await register(username, password, email || undefined);


        if(!result.success){
            setError(result.error || 'Error during account creation, please try again.');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="login-portal-container">
            <form onSubmit={handleSubmit} className="login-card">
                <div className = "login-brand">
                    <h2>OpenAtlas | Create Account</h2>
                </div>

                {error && <div className="auth-error-banner">{error}</div>}

                <div className = "meta-group">
                    <label htmlFor="signup-user">Username</label>
                    <input
                        id="signup-user"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>

                <div className="meta-group">
                    <label htmlFor="signup-email">Email (OPTIONAL)</label>
                    <input 
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div className="meta-group">
                    <label htmlFor="signup-password">Password</label>
                    <input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                <div className="meta-group">
                    <label htmlFor="signup-confirm">Confirm Password</label>
                    <input 
                        id="signup-confirm"
                        type="password"
                        value = {confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>

                    <button type="submit" className="auth-action" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : 'Create Account'}
                    </button>

                    <p className="auth-toggle">
                        Already have an account?{' '}
                        <button type="button" className="link-button" onClick={onSwitchToLogin}>
                            Sign in
                        </button>
                    </p>
            </form>
        </div>
    );
}