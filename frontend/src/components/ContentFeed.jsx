import ResourceCard from './ResourceCard.jsx';

export default function ContentFeed({ toggleSidebar, toggleInspector, resources, onSelectResource}) {
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

            <div className ="resource-stream">
                {resources.map((res) => (
                    <ResourceCard
                        key={res.id}
                        data={res}
                        onInspect={() => onSelectResource(res)}
                    />
                ))}
            </div>
        </section>
    );
}