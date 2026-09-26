import SectionHeader from "../components/SectionHeader";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
import {workers} from "../data/mockData";
export default function Workers(){
return <div><SectionHeader eyebrow="WORKFORCE" title="Workers" description="Manage worker profiles, categories, project assignments and effective rates." action={<button className="primary-btn">+ Add Worker</button>}/>
<div className="toolbar"><input placeholder="Search worker, phone or ID..." /><select><option>All categories</option><option>Mason</option><option>Helper</option><option>Carpenter</option></select><select><option>All status</option><option>Active</option><option>Inactive</option></select></div>
<DataTable rows={workers} columns={[
{key:"id",label:"Worker ID"},{key:"name",label:"Worker",render:r=><strong>{r.name}</strong>},{key:"category",label:"Category"},
{key:"project",label:"Current Project"},{key:"rate",label:"Rate / Hajira",render:r=><span>৳{r.rate.toLocaleString()}</span>},
{key:"status",label:"Status",render:r=><Badge tone={r.status==="Active"?"success":"neutral"}>{r.status}</Badge>}
]}/></div>;
}
