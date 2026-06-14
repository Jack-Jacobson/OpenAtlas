import Sidebar from '../components/Sidebar.jsx';
import ContentFeed from '../components/ContentFeed.jsx';
import InspectorPanel from '../components/InspectorPanel.jsx';
import { useState, useEffect } from 'react';


export default function Dashboard(){
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isInspectorOpen, setInspectorOpen] = useState(true);

    const [resources, setResources] = useState([]);
    const [activeResource, setActiveResource] = useState(null);
    
    useEffect(() => {
        const loadLiveData = async () => {
            try {
                const res = await fetch('/api/resources');
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