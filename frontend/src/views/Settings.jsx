import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Settings({ onClose }) {
    const { logout, user } = useAuth();
    const [status, setStatus] = useState('');

    const handleLogout = async () => {
        if (!confirm('Are you sure you want to log out?')) return;
        await logout();
    };

    const handleDeleteAccount = async () => {
        const confirmation = prompt('This will permanently delete your account and all saved resources. Type DELETE to confirm:');
        if (confirmation !== 'DELETE') return;

        try {
            const res = await fetch('/api/auth/delete-account', {
                method: 'DELETE',
                credentials: 'include'
            });

            const text = await res.text();
            console.log('Delete response status:', res.status, 'body:', text);
            const data = text ? JSON.parse(text) : {};

            if(!res.ok || !data.success) {
                setStatus(data.message || `Server error (${res.status}).`);
                return;
            }

            await logout();
        } catch (err) {
            console.error('Delete account error:', err);
            setStatus('Network error, or server returned an invalid response.');
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h2>Settings</h2>
                <button className="close-panel-btn" onClick={onClose}>Close</button>
            </div>

            <div className="settings-section">
                <h3>Account</h3>
                <p className="settings-username">Signed in as: <span>{user?.username}</span></p>

                <button className="settings-danger-btn" onClick={handleLogout}>
                    Logout
                </button>
                
                <button className = "settings-danger-btn delete-account-btn" onClick={handleDeleteAccount}>
                    Delete Account and All Data
                </button>

                {status && <div className="auth-error-banner">{status}</div>}
            </div>
        </div>
    );
}