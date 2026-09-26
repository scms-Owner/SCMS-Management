import SectionHeader from "../components/SectionHeader";
import DataTable from "../components/DataTable";
import {cashEntries,dashboardData} from "../data/mockData";
export default function Cash(){const cashIn=cashEntries.reduce((s,x)=>s+x.in,0);const cashOut=cashEntries.reduce((s,x)=>s+x.out,0);return <div><SectionHeader eyebrow="FINANCE" title="Cash Ledger" description="All SCMS transactions are cash-based. Each receipt, payment, advance and expense is traceable." action={<button className="primary-btn">+ Record Cash Entry</button>}/><div className="summary-strip"><div><span>Current Cash</span><strong>৳{dashboardData.currentCash.toLocaleString()}</strong></div><div><span>Selected In</span><strong>৳{cashIn.toLocaleString()}</strong></div><div><span>Selected Out</span><strong>৳{cashOut.toLocaleString()}</strong></div></div><DataTable rows={cashEntries} columns={[
{key:"date",label:"Date"},{key:"type",label:"Type"},{key:"description",label:"Description"},{key:"project",label:"Project"},
{key:"in",label:"Cash In",render:r=>r.in?<strong className="money-in">৳{r.in.toLocaleString()}</strong>:"—"},
{key:"out",label:"Cash Out",render:r=>r.out?<strong className="money-out">৳{r.out.toLocaleString()}</strong>:"—"}
]}/></div>}
