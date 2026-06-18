import { useState } from "react";

export default function Workspaces({ projects, oneProjectsChange, onSelectProject }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const res = await fetch('/api/projects', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ name: name.trim(), description })
        });

        const data = await res.json();
        if(!res.ok || !data.success) {
            setError(data.message || 'Failed to create project.');
            return;
        }

        oneProjectsChange([...projects, data.project]);
        setName('');
        setDescription('');
        setError('');    
    };

    return (
        <div className="workspaces-container">
            <h2>Workspaces</h2>

            <form onSubmit={handleCreate} className="workspace-form">
                <div className="meta-group">
                    <label htmlFor = "project-name">New Project Name</label>
                    <input
                        id="project-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Portfolio"
                    />
                </div>
                <div className="meta-group">
                    <label htmlFor="project-desc">Description (optional)</label>
                    <input 
                        id="project-desc"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className="auth-action">Create Project</button>
                {error && <div className="auth-error-banner">{error}</div>}
            </form>

            <div className="workspace-list">
                <h3>Your Projects</h3>
                    {projects.length === 0 && <p className="empty-state">No projects yet. Create one above.</p>}
                    {projects.map(p => (
                        <div key={p.id} className="workspace-card">
                            <h4>{p.name}</h4>
                            <p>{p.description}</p>
                            <button className="link-button" onClick={() => onSelectProject(p.id)}>
                                View Resources
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

