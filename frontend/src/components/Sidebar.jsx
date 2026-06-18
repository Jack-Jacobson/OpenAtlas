export default function Sidebar({isOpen, onNavigate, activeView}){
    return (
        <aside className = {`dashboard-sidebar ${!isOpen ? 'collapsed' : ''}`}>
            <div className = "sidebar-brand">
                <h2>OpenAtlas</h2>
            </div>

            <nav className = "sidebar-nav">
                <button
                    className = {`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
                    onClick={() => onNavigate('dashboard')}
                >
                    Inbox
                </button>
                <button className = "nav-item">Workspaces</button>
                <button
                    className = {`nav-item ${activeView = 'settings' ? 'active' : ''}`}
                    onClick={() => onNavigate('settings')}
                >
                    Settings
                </button>
            </nav>

            <div className = "sidebar-projects">
                <h3>Active Projects</h3>
                <ul>
                    <li>GenericOS</li>
                    <li>Portfolio</li>
                    <li>SlackBot</li> 
                </ul>
            </div>
        </aside>
    );
}