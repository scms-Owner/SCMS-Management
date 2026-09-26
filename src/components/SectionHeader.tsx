interface Props{eyebrow?:string;title:string;description?:string;action?:React.ReactNode}
export default function SectionHeader({eyebrow,title,description,action}:Props){
return <div className="section-header"><div>{eyebrow&&<span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description&&<p>{description}</p>}</div>{action&&<div>{action}</div>}</div>;
}
