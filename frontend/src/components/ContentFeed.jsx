import ResourceCard from './ResourceCard.jsx';

export default function ContentFeed({ toggleSidebar, toggleInspector}) {
    return(
        <section className = "dashboard-content">
            <header className="content-header">
                <div className = "header-group">
                    <button className='toggle-btn' onClick = {toggleSidebar}>Menu</button>
                    <input type="text" placeholder="Search saved resources..." className="search-bar" />
                </div>

                <div className="header-group">
                    <div className ="feed-meta">Showing 3 links</div>
                    <button className = "toggle-btn" onClick={toggleInspector}>Inspector</button>
                </div>
            </header>

            <div className = "resource-stream">
                <ResourceCard title="Cloudflare Zero Trust Documentation" url="https://developers.cloudflare.com" notes="Review access policies for cross-subdomain deployments." />
                <ResourceCard title="SQLite 3 Terminal Cheatsheet" url="https://sqlite.org" notes="Useful SQL commands for dropping target system data pools cleanly." />
                <ResourceCard title="React Docs - Component State Management" url="https://react.dev" notes="Deep dive study guide for state management hooks." />
            </div>
        </section>
    );
}