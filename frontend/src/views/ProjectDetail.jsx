import { useState, useEffect } from 'react';

export default function ProjectDetail({ projectId, projects, resources, onBack, onProjectsChange, onResourcesChange }) {
    const project = projects.find(p => p.id === projectId);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (project) {
            setName(project.name);
            setDescription(project.description || '');
        }
    }, [project]);

    if (!project) {
        return (
            <div className="workspaces-container">
                <p className="empty-state">Project not found.</p>
                <button className="toggle-btn" onClick={onBack}>Back</button>
            </div>
        );
    }

    const projectResources = resources.filter(r => r.project_id === projectId);

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), description })
            });
            const data = await res.json();

            if (data.success) {
                onProjectsChange(projects.map(p => p.id === projectId ? { ...p, name: name.trim(), description } : p));
                setStatus('Project updated.');
            } else {
                setStatus(data.message || 'Failed to update project.');
            }
        } catch (err) {
            console.error('Project update error:', err);
            setStatus('Network error while saving.');
        }
        setTimeout(() => setStatus(''), 2500);
    };

    const handleDelete = async () => {
        if (!confirm(`Delete "${project.name}"? Resources inside will be kept, but unassigned.`)) return;

        try {
            const res = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                onProjectsChange(projects.filter(p => p.id !== projectId));
                onResourcesChange(resources.map(r => r.project_id === projectId ? { ...r, project_id: null } : r));
                onBack();
            } else {
                setStatus(data.message || 'Failed to delete project.');
            }
        } catch (err) {
            console.error('Project delete error:', err);
            setStatus('Network error while deleting.');
        }
    };

    return (
        <div className="workspaces-container">
            <button className="toggle-btn" onClick={onBack} style={{ marginBottom: '16px' }}>
                Back
            </button>

            <form onSubmit={handleSave} className="workspace-form">
                <div className="meta-group">
                    <label htmlFor="detail-name">Project Name</label>
                    <input
                        id="detail-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="meta-group">
                    <label htmlFor="detail-desc">Description</label>
                    <input
                        id="detail-desc"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button type="submit" className="auth-action" style={{ marginTop: '8px' }}>
                    Update Project
                </button>

                <button
                    type="button"
                    className="settings-danger-btn delete-account-btn"
                    onClick={handleDelete}
                    style={{ marginTop: '12px' }}
                >
                    Delete Project
                </button>
                {status && <div className="auth-error-banner">{status}</div>}
            </form>

            <div className="workspace-list">
                <h3>Resources in this Project ({projectResources.length})</h3>
                {projectResources.length === 0 ? (
                    <p className="empty-state">No resources assigned to this project yet.</p>
                ) : (
                    projectResources.map(r => (
                        <div key={r.id} className="workspace-card">
                            <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
                            <p>{r.notes}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}