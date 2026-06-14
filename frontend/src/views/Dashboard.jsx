import Sidebar from '../components/Sidebar.jsx';
import ContentFeed from '../components/ContentFeed.jsx';
import InspectorPanel from '../components/InspectorPanel.jsx';
import { useState } from 'react';

export default function Dashboard(){
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isInspectorOpen, setInspectorOpen] = useState(true);
    
    return(
        <div className="dashboard-container-layout">
            <Sidebar isOpen = {isSidebarOpen} />
            <ContentFeed 
                toggleSidebar = {() => setSidebarOpen(!isSidebarOpen)}
                toggleInspector = {() => setInspectorOpen(!isInspectorOpen)}
            />
            <InspectorPanel 
                isOpen={isInspectorOpen}
                closePanel={() => setInspectorOpen(false)}
            />
        </div>
    );
}