export default function ResourceCard(props){
    return (
        <div className="resource-card">
            <div className="card-header">
                <h4 className="card-title">{props.title}</h4>
                <a href={props.url} target = "_blank" rel="noreferrer" className="card-link">Visit Site</a>
            </div>
            <p className = "card-notes">{props.notes}</p>
            <div className="card-footer">
                <span className = "card-tag">#unsorted</span>
                <button className = "inspect-btn">Inspect Details</button>
            </div>
        </div>
    );
}