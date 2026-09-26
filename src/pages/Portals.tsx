import {useEffect,useState} from "react";
import SectionHeader from "../components/SectionHeader";
import DataTable from "../components/DataTable";
import {neon} from "../lib/neon";
const money=(v:any)=>"৳"+Number(v||0).toLocaleString();

export function ForemanPortal(){
 const [projects,setProjects]=useState<any[]>([]),[rows,setRows]=useState<any[]>([]);
 useEffect(()=>{(async()=>{const p=await neon.from("projects").select("*").order("project_code");setProjects(p.data||[]);const a=await neon.from("attendance").select("*").order("attendance_date",{ascending:false});setRows(a.data||[])})()},[]);
 return <div><SectionHeader eyebrow="FOREMAN PORTAL" title="Daily Site Operations" description="Assigned projects and submitted hajira records."/><div className="summary-strip"><div><span>Projects</span><strong>{projects.length}</strong></div><div><span>Attendance Records</span><strong>{rows.length}</strong></div></div><DataTable rows={rows} columns={[{key:"attendance_date",label:"Date"},{key:"worker_id",label:"Worker"},{key:"project_id",label:"Project"},{key:"hajira",label:"Hajira"},{key:"earned_amount",label:"Earned",render:(r:any)=>money(r.earned_amount)},{key:"status",label:"Status"}]}/></div>
}
export function WorkerPortal(){
 const [profile,setProfile]=useState<any>(null),[rows,setRows]=useState<any[]>([]),[due,setDue]=useState<any>(null);
 useEffect(()=>{(async()=>{const p=await neon.from("current_profile").select("*");const me=p.data?.[0];setProfile(me);if(me?.worker_id){const [a,d]=await Promise.all([neon.from("attendance").select("*").eq("worker_id",me.worker_id).order("attendance_date",{ascending:false}),neon.from("worker_due").select("*").eq("id",me.worker_id)]);setRows(a.data||[]);setDue(d.data?.[0]||null)}})()},[]);
 return <div><SectionHeader eyebrow="WORKER PORTAL" title="My Work & Earnings" description="Only your own attendance, advances and due are shown."/><div className="summary-strip"><div><span>Hajira</span><strong>{rows.reduce((s,r)=>s+Number(r.hajira||0),0)}</strong></div><div><span>Gross</span><strong>{money(rows.reduce((s,r)=>s+Number(r.earned_amount||0),0))}</strong></div><div><span>Current Due</span><strong>{money(due?.due_amount)}</strong></div></div><DataTable rows={rows} columns={[{key:"attendance_date",label:"Date"},{key:"project_id",label:"Project"},{key:"hajira",label:"Hajira"},{key:"worker_rate",label:"Rate",render:(r:any)=>money(r.worker_rate)},{key:"earned_amount",label:"Earned",render:(r:any)=>money(r.earned_amount)}]}/></div>
}
export function ClientPortal(){
 const [projects,setProjects]=useState<any[]>([]),[bills,setBills]=useState<any[]>([]),[payments,setPayments]=useState<any[]>([]);
 useEffect(()=>{(async()=>{const [p,b,c]=await Promise.all([neon.from("projects").select("*"),neon.from("client_bills").select("*").order("bill_date",{ascending:false}),neon.from("client_payments").select("*").order("receipt_date",{ascending:false})]);setProjects(p.data||[]);setBills(b.data||[]);setPayments(c.data||[])})()},[]);
 return <div><SectionHeader eyebrow="CLIENT PORTAL" title="Projects, Bills & Cash Receipts" description="Client-scoped visibility from the same live database."/><div className="summary-strip"><div><span>Projects</span><strong>{projects.length}</strong></div><div><span>Total Bills</span><strong>{money(bills.reduce((s,r)=>s+Number(r.total_amount||0),0))}</strong></div><div><span>Cash Paid</span><strong>{money(payments.reduce((s,r)=>s+Number(r.amount||0),0))}</strong></div></div><DataTable rows={bills} columns={[{key:"bill_no",label:"Bill No."},{key:"bill_date",label:"Date"},{key:"total_amount",label:"Amount",render:(r:any)=>money(r.total_amount)},{key:"status",label:"Status"}]}/></div>
}
