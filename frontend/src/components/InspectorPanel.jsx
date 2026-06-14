export default function InspectorPanel({ isOpen, closePanel }) {
    return (
        <aside className = {`dashboard-inspector ${!isOpen ? 'collapsed' : ''}`}>
            <div className="inspector-header">
                <h3>Resource Inspector</h3>
                <button className="close-panel-btn" onClick = {closePanel} >Close</button>
            </div>

            <div className="inspector-body">
                <div className="meta-group">
                    <label>Target Identity Reference</label>
                    <input type="text" defaultValue="Cloudflare Zero Trust Documentation" className="inspector-input" />
                </div>

                <div className="meta-group">
                    <label>Captured URL Origin</label>
                    <span className="inspector-url">https://developers.cloudflare.com</span>
                </div>

                <div className="meta-group">
                    <label>Extended Research Notes</label>
                    <textarea defaultValue="Review access policies for cross-subdomain deployments." className="inspector-textarea" />
                </div>
            </div>

            <div className = "inspector-actions">
                <button className = "save-changes-btn">Save Changes</button>
                <button className = "delete-record-btn">Delete Resource Entry</button>
            </div>
        </aside>
    );
}