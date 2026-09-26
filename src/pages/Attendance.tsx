import SectionHeader from "../components/SectionHeader";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
import {attendance} from "../data/mockData";
export default function Attendance(){return <div><SectionHeader eyebrow="DAILY OPERATIONS" title="Attendance / Hajira" description="Record decimal hajira quantities and preserve the effective rate used for each earning." action={<button className="primary-btn">+ Enter Hajira</button>}/><div className="info-banner"><strong>Hajira is quantity-based.</strong><span>Examples: 0, 0.5, 1, 1.5, 2, 3. Each record keeps its effective rate so historical earnings do not change later.</span></div><DataTable rows={attendance} columns={[
{key:"date",label:"Date"},{key:"worker",label:"Worker",render:r=><strong>{r.worker}</strong>},{key:"project",label:"Project"},
{key:"hajira",label:"Hajira",render:r=><strong>{r.hajira}</strong>},{key:"rate",label:"Rate",render:r=><span>৳{r.rate.toLocaleString()}</span>},
{key:"earned",label:"Earned",render:r=><strong>৳{r.earned.toLocaleString()}</strong>},{key:"status",label:"Status",render:r=><Badge tone={r.status==="Locked"?"success":"warning"}>{r.status}</Badge>}
]}/></div>}
