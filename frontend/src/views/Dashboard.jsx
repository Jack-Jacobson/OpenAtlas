import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import ContentFeed from '../components/ContentFeed.jsx';
import InspectorPanel from '../components/InspectorPanel.jsx';
import Workspaces from './Workspaces.jsx';
import Settings from './Settings.jsx';

export default function Dashboard(){
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isInspectorOpen, setInspectorOpen] = useState(true);
    const [activeView, setActiveView] = useState('dashboard');

    const [resources, setResources] = useState([]);
    const [activeResource, setActiveResource] = useState(null);

    const [projects, setProjects] = useState([]);
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const loadLiveData = async () => {
            try {
                const res = await fetch('/api/resources', { credentials: 'include' });
                const json = await res.json();
                if (res.ok && json.success) setResources(json.data);
            } catch (err) {
                console.error("Failed to synchronize with database:", err);
            }
        };
        loadLiveData();
    }, []);

    useEffect(() => {
        fetch('/api/projects', { credentials: 'include' })
            .then(r => r.json())
            .then(data => { if (data.success) setProjects(data.projects); });
    }, []);

    const handleSaveResource = async (id, { title, notes }) => {
        try {
            const res = await fetch(`/api/resources/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, notes })
            });
            const data = await res.json();

            if (data.success) {
                setResources(resources.map(r => r.id === id ? { ...r, title, notes } : r));
                setActiveResource(prev => (prev && prev.id === id) ? { ...prev, title, notes } : prev);
                setFeedback('Changes saved.');
            } else {
                setFeedback(data.message || 'Failed to save changes.');
            }
        } catch (err) {
            console.error('Save resource error:', err);
            setFeedback('Network error while saving.');
        }
        setTimeout(() => setFeedback(''), 2500);
    };

    const handleDeleteResource = async (id) => {
        try {
            const res = await fetch(`/api/resources/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                setResources(prev => prev.filter(r => r.id !== id));
                setActiveResource(null);
                setInspectorOpen(false);
                setFeedback('Resource deleted.');
            } else {
                setFeedback(data.message || 'Failed to delete resource.');
            }
        } catch (err) {
            console.error('Delete resource error:', err);
            setFeedback('Network error while deleting.');
        }
        setTimeout(() => setFeedback(''), 2500);
    };

    return(
        <div className="dashboard-container-layout">
            <Sidebar
                isOpen={isSidebarOpen}
                onNavigate={setActiveView}
                activeView={activeView}
                projects={projects}
                onSelectProject={setActiveProjectId}
            />

            {activeView === 'workspaces' ? (
                <Workspaces
                    projects={projects}
                    resources={resources}
                    onProjectsChange={setProjects}
                    onSelectProject={(id) => setActiveProjectId(id)}
                />
            ) : activeView === 'settings' ? (
                <Settings onClose={() => setActiveView('dashboard')} />
            ) : (
                <>
                    <ContentFeed
                        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                        toggleInspector={() => setInspectorOpen(!isInspectorOpen)}
                        resources={resources}
                        projects={projects}
                        onSelectResource={(resource) => {
                            setActiveResource(resource);
                            setInspectorOpen(true);
                        }}
                    />
                    <InspectorPanel
                        isOpen={isInspectorOpen}
                        closePanel={() => setInspectorOpen(false)}
                        activeResource={activeResource}
                        projects={projects}
                        onAssignProject={async (projectId) => {
                            if (!activeResource) return;
                            const res = await fetch(`/api/resources/${activeResource.id}/project`, {
                                method: 'PUT',
                                credentials: 'include',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ projectId })
                            });
                            const data = await res.json();
                            if (data.success) {
                                setActiveResource({ ...activeResource, project_id: projectId });
                                setResources(resources.map(r => r.id === activeResource.id ? { ...r, project_id: projectId } : r));
                            }
                        }}
                        onSave={handleSaveResource}
                        onDelete={handleDeleteResource}
                        feedback={feedback}
                    />
                </>
            )}
        </div>
    );
}