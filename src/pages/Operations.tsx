import {useEffect,useState} from "react";
import SectionHeader from "../components/SectionHeader";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
import FormModal from "../components/FormModal";
import {neon} from "../lib/neon";

type Mode="billing"|"payments"|"expenses"|"corrections"|"audit"|"reports"|"settings"|"assignments"|"workitems";
const titles:Record<Mode,string>={billing:"Client Billing",payments:"Worker Payments",expenses:"Expenses",corrections:"Correction Requests",audit:"Audit Log",reports:"Reports",settings:"Settings",assignments:"Worker Assignments",workitems:"Project Work Items"};
const empty:any={};
const money=(v:any)=>"৳"+Number(v||0).toLocaleString();
function Select({value,onChange,children,required=false}:{value:any;onChange:(v:string)=>void;children:any;required?:boolean}){return <select required={required} value={value||""} onChange={e=>onChange(e.target.value)}>{children}</select>}

export default function Operations({mode}:{mode:Mode}){
 const [rows,setRows]=useState<any[]>([]),[open,setOpen]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(""),[form,setForm]=useState<any>({...empty}),[ref,setRef]=useState<any>({workers:[],projects:[],clients:[],bills:[],measurements:[],items:[]});
 async function load(){
  const q:any={};
  if(mode==="billing"){q.bills=await neon.from("client_bills").select("*").order("bill_date",{ascending:false});}
  if(mode==="payments"){q.payments=await neon.from("worker_payments").select("*").order("period_end",{ascending:false});}
  if(mode==="expenses"){q.expenses=await neon.from("project_expenses").select("*").order("expense_date",{ascending:false});}
  if(mode==="corrections"){q.corrections=await neon.from("correction_requests").select("*").order("created_at",{ascending:false});}
  if(mode==="audit"){q.audit=await neon.from("audit_logs").select("*").order("created_at",{ascending:false});}
  if(mode==="assignments"){q.assignments=await neon.from("worker_assignments").select("*").order("start_date",{ascending:false});}
  if(mode==="workitems"){q.items=await neon.from("project_work_items").select("*").order("created_at",{ascending:false});}
  if(mode==="reports"){q.profit=await neon.from("project_profitability").select("*");q.cash=await neon.from("cash_balance").select("*");q.clients=await neon.from("client_outstanding").select("*");q.workers=await neon.from("worker_due").select("*");setRef({cash:q.cash,clients:q.clients,workers:q.workers});}
  if(["billing","payments","expenses","assignments","workitems"].includes(mode)){
   const [w,p,c,b,m,i]=await Promise.all([
    neon.from("workers").select("id,worker_code,full_name"),
    neon.from("projects").select("id,project_code,project_name,client_id"),
    neon.from("clients").select("id,client_code,company_name"),
    neon.from("client_bills").select("id,bill_no,total_amount"),
    neon.from("measurements").select("id,measurement_date,quantity,unit,amount"),
    neon.from("work_item_master").select("id,item_name,default_unit")
   ]); q.refs={workers:w.data||[],projects:p.data||[],clients:c.data||[],bills:b.data||[],measurements:m.data||[],items:i.data||[]};
  }
  const data=(q as any)[mode==="billing"?"bills":mode==="payments"?"payments":mode==="expenses"?"expenses":mode==="corrections"?"corrections":mode==="audit"?"audit":mode==="assignments"?"assignments":mode==="workitems"?"items":"profit"]||[];
  setRows(data); if(q.refs)setRef(q.refs);
 }
 useEffect(()=>{load()},[mode]);
 function start(){setError("");setForm({...empty});setOpen(true)}
 async function save(e:any){
  e.preventDefault();setBusy(true);setError("");
  let table="";let payload:any={...form};
  if(mode==="billing"){table="client_bills";payload.subtotal=Number(payload.subtotal||0);payload.adjustment=Number(payload.adjustment||0);payload.total_amount=payload.subtotal+payload.adjustment;}
  if(mode==="payments"){table="worker_payments";["gross_amount","advance_deduction","other_adjustment","paid_amount"].forEach(k=>payload[k]=Number(payload[k]||0));payload.net_payable=payload.gross_amount-payload.advance_deduction+payload.other_adjustment;}
  if(mode==="expenses"){table="project_expenses";payload.amount=Number(payload.amount||0);payload.payment_method="CASH";}
  if(mode==="assignments"){table="worker_assignments";payload.worker_rate=Number(payload.worker_rate||0);payload.client_rate=payload.client_rate?Number(payload.client_rate):null;}
  if(mode==="workitems"){table="project_work_items";payload.contract_rate=Number(payload.contract_rate||0);}
  if(table){const r=await neon.from(table).insert(payload);if(r.error)setError(r.error.message);else{setOpen(false);await load();}setBusy(false);return}
  setBusy(false);
 }
 async function review(id:string,status:string){const q=await neon.from("correction_requests").update({status,reviewed_at:new Date().toISOString(),review_note:status==="APPROVED"?"Approved by Admin":"Rejected by Admin"}).eq("id",id);if(q.error)alert(q.error.message);else load()}
 const f=(k:string,l:string,req=false,t="text")=><label>{l}<input type={t} value={form[k]??""} required={req} onChange={e=>setForm({...form,[k]:e.target.value})}/></label>;
 const projectSelect=<label>Project<Select required value={form.project_id} onChange={v=>setForm({...form,project_id:v})}><option value="">Select project</option>{ref.projects.map((p:any)=><option key={p.id} value={p.id}>{p.project_code} — {p.project_name}</option>)}</Select></label>;
 const workerSelect=<label>Worker<Select required value={form.worker_id} onChange={v=>setForm({...form,worker_id:v})}><option value="">Select worker</option>{ref.workers.map((w:any)=><option key={w.id} value={w.id}>{w.worker_code} — {w.full_name}</option>)}</Select></label>;
 if(mode==="reports") return <Reports rows={rows} cash={ref as any}/>;
 if(mode==="settings") return <Settings/>;
 const action=(mode==="corrections"||mode==="audit")?undefined:<button className="primary-btn" onClick={start}>+ Add Entry</button>;
 return <div><SectionHeader eyebrow="SCMS OPERATIONS" title={titles[mode]} description="Live database records with controlled entry and Admin review." action={action}/>
 {mode==="billing"&&<div className="info-card">Bill total is calculated from subtotal + adjustment. Add bill items from the billing workflow after creating the bill.</div>}
 <DataTable rows={rows} columns={columns(mode,ref,review)}/>
 {open&&<FormModal title={"Add "+titles[mode]} onClose={()=>setOpen(false)} onSubmit={save} busy={busy}>
 {mode==="billing"&&<>{projectSelect}<label>Client<Select required value={form.client_id} onChange={v=>setForm({...form,client_id:v})}><option value="">Select client</option>{ref.clients.map((c:any)=><option key={c.id} value={c.id}>{c.client_code} — {c.company_name}</option>)}</Select></label>{f("bill_no","Bill No.",true)}{f("bill_date","Bill Date",true,"date")}{f("period_start","Period Start",false,"date")}{f("period_end","Period End",false,"date")}{f("subtotal","Subtotal",true,"number")}{f("adjustment","Adjustment",false,"number")}{f("note","Note")}</>}
 {mode==="payments"&&<>{workerSelect}{projectSelect}{f("period_start","Period Start",true,"date")}{f("period_end","Period End",true,"date")}{f("gross_amount","Gross Amount",true,"number")}{f("advance_deduction","Advance Deduction",false,"number")}{f("other_adjustment","Other Adjustment",false,"number")}{f("paid_amount","Paid Amount",false,"number")}{f("payment_date","Payment Date",false,"date")}{f("note","Note")}</>}
 {mode==="expenses"&&<>{projectSelect}{f("expense_date","Expense Date",true,"date")}{f("category","Category",true)}{f("description","Description",true)}{f("amount","Amount",true,"number")}</>}
 {mode==="assignments"&&<>{workerSelect}{projectSelect}{f("assignment_role","Assignment Role")}{f("worker_rate","Worker Rate",true,"number")}{f("client_rate","Client Rate",false,"number")}{f("rate_unit","Rate Unit",true)}{f("start_date","Start Date",true,"date")}{f("end_date","End Date",false,"date")}{f("notes","Notes")}</>}
 {mode==="workitems"&&<>{projectSelect}<label>Master Work Item<Select value={form.work_item_id} onChange={v=>{const x=ref.items.find((i:any)=>i.id===v);setForm({...form,work_item_id:v,item_name:x?.item_name||form.item_name,unit:x?.default_unit||form.unit})}}><option value="">Custom item</option>{ref.items.map((i:any)=><option key={i.id} value={i.id}>{i.item_name}</option>)}</Select></label>{f("item_name","Item Name",true)}{f("unit","Unit",true)}{f("contract_rate","Contract Rate",true,"number")}{f("rate_effective_from","Effective From",false,"date")}{f("notes","Notes")}</>}
 {error&&<div className="form-error full">{error}</div>}</FormModal>}</div>
}

function columns(mode:Mode,ref:any,review:any){const pm=Object.fromEntries((ref.projects||[]).map((x:any)=>[x.id,x.project_code+" — "+x.project_name]));const wm=Object.fromEntries((ref.workers||[]).map((x:any)=>[x.id,x.worker_code+" — "+x.full_name]));return mode==="billing"?[
 {key:"bill_no",label:"Bill No."},{key:"project_id",label:"Project",render:(r:any)=>pm[r.project_id]||r.project_id},{key:"bill_date",label:"Date"},{key:"total_amount",label:"Total",render:(r:any)=>money(r.total_amount)},{key:"status",label:"Status",render:(r:any)=><Badge>{r.status}</Badge>}
]:mode==="payments"?[
 {key:"worker_id",label:"Worker",render:(r:any)=>wm[r.worker_id]||r.worker_id},{key:"period_end",label:"Period End"},{key:"gross_amount",label:"Gross",render:(r:any)=>money(r.gross_amount)},{key:"advance_deduction",label:"Advance",render:(r:any)=>money(r.advance_deduction)},{key:"net_payable",label:"Net",render:(r:any)=>money(r.net_payable)},{key:"status",label:"Status",render:(r:any)=><Badge>{r.status}</Badge>}
]:mode==="expenses"?[
 {key:"expense_date",label:"Date"},{key:"category",label:"Category"},{key:"description",label:"Description"},{key:"amount",label:"Amount",render:(r:any)=>money(r.amount)},{key:"status",label:"Status",render:(r:any)=><Badge>{r.status}</Badge>}
]:mode==="corrections"?[
 {key:"record_type",label:"Record"},{key:"record_id",label:"Record ID"},{key:"reason",label:"Reason"},{key:"status",label:"Status",render:(r:any)=><Badge tone={r.status==="APPROVED"?"success":r.status==="REJECTED"?"danger":"warning"}>{r.status}</Badge>},{key:"id",label:"Review",render:(r:any)=>r.status==="PENDING"?<span className="row-actions"><button onClick={()=>review(r.id,"APPROVED")}>Approve</button><button onClick={()=>review(r.id,"REJECTED")}>Reject</button></span>:null}
]:mode==="audit"?[
 {key:"created_at",label:"Time"},{key:"action",label:"Action"},{key:"entity_type",label:"Entity"},{key:"entity_id",label:"Record"},{key:"reason",label:"Reason"}
]:mode==="assignments"?[
 {key:"worker_id",label:"Worker",render:(r:any)=>wm[r.worker_id]||r.worker_id},{key:"project_id",label:"Project",render:(r:any)=>pm[r.project_id]||r.project_id},{key:"assignment_role",label:"Role"},{key:"worker_rate",label:"Worker Rate",render:(r:any)=>money(r.worker_rate)},{key:"client_rate",label:"Client Rate",render:(r:any)=>money(r.client_rate)},{key:"status",label:"Status",render:(r:any)=><Badge>{r.status}</Badge>}
]:[
 {key:"project_id",label:"Project",render:(r:any)=>pm[r.project_id]||r.project_id},{key:"item_name",label:"Work Item"},{key:"unit",label:"Unit"},{key:"contract_rate",label:"Rate",render:(r:any)=>money(r.contract_rate)},{key:"status",label:"Status",render:(r:any)=><Badge>{r.status}</Badge>}
]}

function Reports({rows,cash}:{rows:any[];cash:any}){return <div><SectionHeader eyebrow="REPORTS" title="Reports" description="Live financial and operational summaries from Neon."/><div className="summary-strip"><div><span>Projects</span><strong>{rows.length}</strong></div><div><span>Cash Balance</span><strong>{money((cash as any).cash?.[0]?.current_cash)}</strong></div></div><DataTable rows={rows} columns={[{key:"project_code",label:"Project"},{key:"project_name",label:"Project Name"},{key:"client_revenue",label:"Revenue",render:(r:any)=>money(r.client_revenue)},{key:"worker_cost",label:"Worker Cost",render:(r:any)=>money(r.worker_cost)},{key:"project_expenses",label:"Expenses",render:(r:any)=>money(r.project_expenses)},{key:"gross_profit",label:"Profit",render:(r:any)=>money(r.gross_profit)}]}/></div>}
function Settings(){return <div><SectionHeader eyebrow="SETTINGS" title="Settings" description="Current role and system configuration."/><div className="info-card"><strong>Cash mode:</strong> CASH ONLY<br/><strong>Attendance:</strong> Hajira supports 0.5 increments<br/><strong>Record control:</strong> Admin edits; submitted operational records use correction workflow.</div></div>}
