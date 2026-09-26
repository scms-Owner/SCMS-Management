import { useEffect, useState } from "react";
import { neon } from "../lib/neon";

type DashboardState = {
  projects: number;
  workers: number;
  todayHajira: number;
  clientOutstanding: number;
  workerOutstanding: number;
  currentCash: number;
};

const money=(n:number)=>`৳${Math.round(n).toLocaleString("en-BD")}`;

export default function Dashboard(){
  const [data,setData]=useState<DashboardState>({projects:0,workers:0,todayHajira:0,clientOutstanding:0,workerOutstanding:0,currentCash:0});
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{
    let active=true;
    async function load(){
      setLoading(true);
      const today=new Date().toISOString().slice(0,10);
      const [projects,workers,attendance,clients,workerDue,cash]=await Promise.all([
        neon.from("projects").select("id,status"),
        neon.from("workers").select("id,status"),
        neon.from("attendance").select("hajira").eq("attendance_date",today),
        neon.from("client_outstanding").select("outstanding"),
        neon.from("worker_due").select("current_due"),
        neon.from("cash_balance").select("current_cash").single()
      ]);
      if(!active)return;
      const firstError=[projects,workers,attendance,clients,workerDue,cash].find((r)=>r.error)?.error;
      if(firstError){setError(firstError.message);setLoading(false);return;}
      setData({
        projects:(projects.data||[]).filter((x:any)=>x.status==="ACTIVE").length,
        workers:(workers.data||[]).filter((x:any)=>x.status==="ACTIVE").length,
        todayHajira:(attendance.data||[]).reduce((s:any,x:any)=>s+Number(x.hajira||0),0),
        clientOutstanding:(clients.data||[]).reduce((s:any,x:any)=>s+Number(x.outstanding||0),0),
        workerOutstanding:(workerDue.data||[]).reduce((s:any,x:any)=>s+Number(x.current_due||0),0),
        currentCash:Number((cash.data as any)?.current_cash||0)
      });
      setLoading(false);
    }
    load();
    return()=>{active=false};
  },[]);

  const stats=[
    ["Active Projects",String(data.projects),"Projects currently running"],
    ["Active Workers",String(data.workers),"Workers on assignments"],
    ["Today Hajira",data.todayHajira.toFixed(1),"Total attendance quantity"],
    ["Client Outstanding",money(data.clientOutstanding),"Cash receivable"],
    ["Worker Outstanding",money(data.workerOutstanding),"Settlement payable"],
    ["Current Cash",money(data.currentCash),"Cash ledger balance"]
  ];

  return <div>
    <div className="page-heading"><div><span className="eyebrow">ADMIN DASHBOARD</span><h2>Company Overview</h2><p>SCMS operational and financial control center.</p></div><div className="status-pill live-status">{loading?"SYNCING…":"DATABASE LIVE"}</div></div>
    {error && <div className="form-error dashboard-error">{error}</div>}
    <div className="stats-grid">{stats.map(([title,value,note])=><article className="stat-card" key={title}><span>{title}</span><strong>{value}</strong><small>{note}</small></article>)}</div>
    <div className="dashboard-grid">
      <article className="panel"><div className="panel-header"><div><h3>Project Operations</h3><p>Live counts are read from Neon PostgreSQL.</p></div></div><div className="empty-state"><strong>{data.projects} active project{data.projects===1?"":"s"}</strong><span>Use Projects, Assignments and Attendance to operate each site.</span></div></article>
      <article className="panel"><div className="panel-header"><div><h3>Cash Snapshot</h3><p>All company transactions remain cash-based.</p></div></div><div className="cash-list">{[["Client outstanding",money(data.clientOutstanding)],["Worker outstanding",money(data.workerOutstanding)],["Current cash",money(data.currentCash)],["Today hajira",data.todayHajira.toFixed(1)]].map(([x,v])=><div key={x}><span>{x}</span><strong>{v}</strong></div>)}</div></article>
    </div>
  </div>;
}
