export default function Sidebar({isOpen}){
    return (
        <aside className = {`dashboard-sidebar ${!isOpen ? 'collapsed' : ''}`}>
            <div className = "sidebar-brand">
                <h2>OpenAtlas</h2>
            </div>

            <nav className = "sidebar-nav">
                <button className = "nav-item active">Inbox</button>
                <button className = "nav-item">Workspaces</button>
                <button className = "nav-item">Settings</button>
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