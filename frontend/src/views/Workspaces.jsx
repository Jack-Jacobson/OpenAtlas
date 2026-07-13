import { useState } from "react";

export default function Workspaces({ projects, resources, onProjectsChange, onSelectProject, reloadResources }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [expandedProjectId, setExpandedProjectId] = useState(null);
    const getProjectResources = (projectId) => resources.filter(r => r.project_id === projectId);

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

        onProjectsChange([...projects, data.project]);
        setName('');
        setDescription('');
        setError('');
    };

    const handleProjectClick = (projectId) => {
        if (onSelectProject) {
            onSelectProject(projectId);
        }
        setExpandedProjectId(expandedProjectId === projectId ? null : projectId);
    };

    return (
        <div className="workspaces-container">
            <h2>Workspaces</h2>

            <form onSubmit={handleCreate} className="workspace-form">
                <div className="meta-group">
                    <label htmlFor="project-name">New Project Name</label>
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
                        <div className="workspace-card-header" onClick={() => handleProjectClick(p.id)}>
                            <h4>{p.name}</h4>
                            <span>{expandedProjectId === p.id ? '▲' : '▼'}</span>
                        </div>
                        <p>{p.description}</p>
                        {expandedProjectId === p.id && (
                            <div className="workspace-card-resources">
                                {(() => {
                                    const projectResources = getProjectResources(p.id);

                                    return projectResources.length === 0 ? (
                                        <p className="empty-state">No resources in this project yet.</p>
                                    ) : (
                                        projectResources.map(r => (
                                            <div key={r.id} className="workspace-resource-item">
                                                <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
                                                <p>{r.notes}</p>
                                            </div>
                                        ))
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};