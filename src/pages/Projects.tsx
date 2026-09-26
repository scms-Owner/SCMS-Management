import SectionHeader from "../components/SectionHeader";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
import {projects} from "../data/mockData";
export default function Projects(){return <div><SectionHeader eyebrow="PROJECTS & SITES" title="Projects" description="Run multiple contract-work and manpower-supply sites at the same time." action={<button className="primary-btn">+ New Project</button>}/><div className="summary-strip"><div><span>Active</span><strong>{projects.filter(p=>p.status==="Active").length}</strong></div><div><span>Contract</span><strong>{projects.filter(p=>p.type==="Contract").length}</strong></div><div><span>Manpower</span><strong>{projects.filter(p=>p.type==="Manpower").length}</strong></div></div><DataTable rows={projects} columns={[
{key:"id",label:"Project ID"},{key:"name",label:"Project",render:r=><strong>{r.name}</strong>},{key:"client",label:"Client"},{key:"type",label:"Type",render:r=><Badge>{r.type}</Badge>},
{key:"foreman",label:"Foreman"},{key:"location",label:"Location"},{key:"status",label:"Status",render:r=><Badge tone={r.status==="Active"?"success":"warning"}>{r.status}</Badge>},
{key:"revenue",label:"Revenue",render:r=><span>৳{r.revenue.toLocaleString()}</span>},{key:"cost",label:"Cost",render:r=><span>৳{r.cost.toLocaleString()}</span>}
]}/></div>}
