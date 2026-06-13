import Sidebar from '../components/Sidebar.jsx';
import ContentFeed from '../components/ContentFeed.jsx';
import InspectorPanel from '../components/InspectorPanel.jsx';

export default function Dashboard(){
    return(
        <div className="dashboard-container-layout">
            <Sidebar />
            <ContentFeed />
            <InspectorPanel />
        </div>
    );
}