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
    
    useEffect(() => {
        const loadLiveData = async () => {
            try {
                const res = await fetch('/api/resources', {
                    credentials: 'include'
                });
                const json = await res.json();

                if(res.ok && json.success){
                    setResources(json.data);
                } 
            } catch (err) {
                console.error("Failed to synchronize with database:", err);
            }  
        };
        loadLiveData();
    }, []);

    useEffect(() => {
       fetch('/api/projects', { credentials: 'include' })
            .then(r => r.json())
            .then(data => {
                if(data.success) setProjects(data.projects);
            }
        ); 
    }, []);

return(
    <div className="dashboard-container-layout">
        <Sidebar 
            isOpen = {isSidebarOpen} 
            onNavigate={setActiveView} 
            activeView = {activeView} 
            projects = {projects}
            onSelectProject =  {setActiveProjectId}
        />

        {activeView === 'workspaces' ? (
            <Workspaces
                projects={projects}
                resources={resources}
                onProjectsChange={setProjects}
                onSelectProject={(id) => {
                    setActiveProjectId(id);
                }}    
            />

            ) : activeView === 'settings' ? (
                <Settings onClose={() => setActiveView('dashboard')} />
            ) : (
                <>
                    <ContentFeed
                        toggleSidebar = {() => setSidebarOpen(!isSidebarOpen)}
                        toggleInspector={() => setInspectorOpen(!isInspectorOpen)}
                        resources = {resources}
                        projects = {projects}
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
                    />
                </>
            )} 
        </div>
    );
}