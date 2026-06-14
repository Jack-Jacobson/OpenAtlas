import Sidebar from '../components/Sidebar.jsx';
import ContentFeed from '../components/ContentFeed.jsx';
import InspectorPanel from '../components/InspectorPanel.jsx';
import { useState } from 'react';

const tempDatabase= [
  { id: 1, title: "Cloudflare Zero Trust Documentation", url: "https://developers.cloudflare.com", notes: "Review access policies for cross-subdomain deployments.", tag: "security" },
  { id: 2, title: "SQLite 3 Terminal Cheatsheet", url: "https://sqlite.org", notes: "Useful SQL commands for dropping target system data pools cleanly.", tag: "database" },
  { id: 3, title: "React Docs - Component State Management", url: "https://react.dev", notes: "Deep dive study guide for state management hooks.", tag: "frontend" }
];

export default function Dashboard(){
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isInspectorOpen, setInspectorOpen] = useState(true);

    const [resources, setResources] = useState(tempDatabase);
    const [activeResource, setActiveResource] = useState(null);
    
    return(
        <div className="dashboard-container-layout">
            <Sidebar isOpen = {isSidebarOpen} />

            <ContentFeed 
                toggleSidebar = {() => setSidebarOpen(!isSidebarOpen)}
                toggleInspector = {() => setInspectorOpen(!isInspectorOpen)}
                resources = {resources}
                onSelectResource = {(resource) => {
                    setActiveResource(resource);
                    setInspectorOpen(true);
                }}
            />

            <InspectorPanel 
                isOpen={isInspectorOpen}
                closePanel={() => setInspectorOpen(false)}
                activeResource = {activeResource}
            />

        </div>
    );
}