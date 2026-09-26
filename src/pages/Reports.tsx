import SectionHeader from "../components/SectionHeader";
import {projects} from "../data/mockData";
export default function Reports(){return <div><SectionHeader eyebrow="REPORTING" title="Reports" description="Operational and financial summaries for management review."/><div className="report-grid">{[
["Project Profitability","Revenue, worker cost, expenses and project margin"],
["Worker Earnings","Hajira, rate, gross earning, advances and net payable"],
["Client Billing","Measurement bills, manpower bills, receipts and outstanding"],
["Cash Flow","Opening cash, receipts, payments, advances and expenses"],
["Attendance","Daily / weekly / monthly hajira by worker and project"],
["Audit & Corrections","Submission, correction request and approval history"]
].map(([title,desc])=><article className="report-card" key={title}><span className="report-icon">▦</span><h3>{title}</h3><p>{desc}</p><button className="text-btn">Open report →</button></article>)}</div><div className="panel report-preview"><h3>Project profitability preview</h3><div className="mini-table"><div className="mini-head"><span>Project</span><span>Revenue</span><span>Cost</span><span>Gross</span></div>{projects.filter(p=>p.revenue).map(p=><div className="mini-row" key={p.id}><span>{p.name}</span><span>৳{p.revenue.toLocaleString()}</span><span>৳{p.cost.toLocaleString()}</span><strong>৳{(p.revenue-p.cost).toLocaleString()}</strong></div>)}</div></div></div>}
