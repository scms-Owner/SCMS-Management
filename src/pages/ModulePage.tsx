interface Props{title:string;description:string;items:string[];}
export default function ModulePage({title,description,items}:Props){
return <div><div className="page-heading"><div><span className="eyebrow">SCMS MODULE</span><h2>{title}</h2><p>{description}</p></div><div className="status-pill">Foundation ready</div></div>
<div className="panel"><h3>Planned controls</h3><div className="feature-list">{items.map(item=><div className="feature-row" key={item}><span className="check">✓</span><span>{item}</span></div>)}</div></div></div>;
}
