export default function ResourceCard({data, projectName, onInspect}){
    return (
        <div className="resource-card">
            <div className="card-header">
                <h4 className="card-title">{data.title}</h4>
                <a href={data.url} target = "_blank" rel="noreferrer" className="card-link">Visit Site</a>
            </div>
            <p className = "card-notes">{data.notes}</p>
            <div className="card-footer">
                {data.project_id && <span className="card-tag">#{projectName}</span>}
                <button className = "inspect-btn" onClick={onInspect}>Inspect Details</button>
            </div>
        </div>
    );
}