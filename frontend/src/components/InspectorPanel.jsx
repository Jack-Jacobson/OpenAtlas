export default function InspectorPanel({ isOpen, closePanel, activeResource, projects, onAssignProject }) {
    return (
        <aside className = {`dashboard-inspector ${!isOpen ? 'collapsed' : ''}`}>
            <div className="inspector-header">
                <h3>Resource Inspector</h3>
                <button className="close-panel-btn" onClick = {closePanel} >Close</button>
            </div>
            
            {!activeResource ? (
                <div className="inspect-body"style={{ justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>
                    <p>Select a resource to view details.</p>
                </div>
            ) : (
                <div>
                    <div className="inspector-body" key={activeResource.id}>
                            <div className="meta-group">
                                <label>Target Identity Reference</label>
                                <input type="text" defaultValue={activeResource.title} className="inspector-input"/>
                            </div>

                            <div className="meta-group">
                                <label>Captured URL</label>
                                <span className = "inspector-url">{activeResource.url}</span>
                            </div>

                            <div className = "meta-group">
                                <label>Other Notes</label>
                                <textarea defaultValue={activeResource.notes} className="inspector-textarea"/>
                            </div>
                    </div>

                    <div className="meta-group">
                        <label>Project</label>
                        <select
                            className="inspector-input"
                            value={activeResource.project_id || ''}
                            onChange={(e) => onAssignProject(e.target.value || null)}
                        >
                            <option value="">No project</option>
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="inspector-actions">
                        <button className="save-changes-btn">Save System Updates</button>
                        <button className="delete-record-btn">Purge Resource Entry</button>
                    </div>

                </div>
            )}
       </aside>
    );
}