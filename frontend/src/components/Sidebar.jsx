export default function Sidebar({isOpen, onNavigate, activeView, projects, onSelectProject, activeProjectId }){
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
                <button
                    className = {`nav-item ${activeView === 'workspaces' ? 'active' : ''}`}
                    onClick={() => onNavigate('workspaces')}
                >
                    Workspaces
                </button>
                <button
                    className = {`nav-item ${activeView === 'settings' ? 'active' : ''}`}
                    onClick={() => onNavigate('settings')}
                >
                    Settings
                </button>
            </nav>

            <div className = "sidebar-projects">
                <h3>Active Projects</h3>
                <ul>
                    <li className={activeProjectId  === null ? 'active-project' : ''} onClick={() => onSelectProject(null)}>
                        All Resources
                    </li>            
                    {projects.map(p => (
                        <li 
                            key={p.id}
                            className={activeProjectId === p.id ? 'active-project' : ''}
                            onClick={() => onSelectProject(p.id)}
                        >
                            {p.name}
                        </li>
                    ))}            
                </ul>
            </div>
        </aside>
    );
}