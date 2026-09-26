import {useEffect,useState} from "react";
import SectionHeader from "../components/SectionHeader";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
import {neon} from "../lib/neon";
export default function Workers(){
 const[rows,setRows]=useState<any[]>([]);const[loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{const[w,a,p]=await Promise.all([neon.from("workers").select("*").order("worker_code"),neon.from("worker_assignments").select("worker_id,project_id,status").eq("status","ACTIVE"),neon.from("projects").select("id,project_name")]);const projects=Object.fromEntries((p.data||[]).map((x:any)=>[x.id,x.project_name]));const assignments=Object.fromEntries((a.data||[]).map((x:any)=>[x.worker_id,projects[x.project_id]||"—"]));setRows((w.data||[]).map((x:any)=>({...x,project:assignments[x.id]||"—"})));setLoading(false)})()},[]);
 return <div><SectionHeader eyebrow="WORKFORCE" title="Workers" description="Live worker profiles, categories, assignments and effective rates." action={<button className="primary-btn">+ Add Worker</button>}/><div className="toolbar"><input placeholder="Search worker, phone or ID..."/><select><option>All categories</option></select><select><option>All status</option></select></div>{loading?<div className="empty-state">Loading workers…</div>:<DataTable rows={rows} columns={[{key:"worker_code",label:"Worker ID"},{key:"full_name",label:"Worker",render:r=><strong>{r.full_name}</strong>},{key:"category",label:"Category"},{key:"project",label:"Current Project"},{key:"default_rate",label:"Rate / Hajira",render:r=><span>৳{Number(r.default_rate||0).toLocaleString()}</span>},{key:"status",label:"Status",render:r=><Badge tone={r.status==="ACTIVE"?"success":"neutral"}>{r.status}</Badge>}]}/>}</div>;
}