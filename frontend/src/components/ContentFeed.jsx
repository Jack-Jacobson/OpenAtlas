import ResourceCard from './ResourceCard.jsx';

export default function ContentFeed() {
    return(
        <section className="dashboard-content">
            <header className='content-header'>
                <input type="text" placeholder = "Search saved resources..." className="search-bar"/>
                <div className='feed-meta'>Showing 3 links</div>
            </header>

            <div className = "resource-stream">
                <ResourceCard title = "test: Google" url='https://google.com' notes = "This is a test"/>
                <ResourceCard title = "Test 2 fslthalsyhfusyhlertyhsdlufhvsprueyhflu" url = "stardance.hackclub.com" notes = "This is also a test"/>
                <ResourceCard title = "Test 3: react documentation" url = "react.dev" notes = "Im in pain" />
            </div>
        </section>
    );
}