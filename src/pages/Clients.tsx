import SectionHeader from "../components/SectionHeader";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
const clients=[
{id:"C-001",name:"Mr. Hasan",phone:"01811-000001",projects:2,outstanding:185000,status:"Active"},
{id:"C-002",name:"ABC Holdings",phone:"01811-000002",projects:1,outstanding:120000,status:"Active"},
{id:"C-003",name:"Mr. Rahman",phone:"01811-000003",projects:1,outstanding:90000,status:"Active"},
{id:"C-004",name:"XYZ Ltd.",phone:"01811-000004",projects:2,outstanding:90000,status:"Active"}
];
export default function Clients(){return <div><SectionHeader eyebrow="CUSTOMERS" title="Clients" description="Client records, project ownership, cash receipts and outstanding balances." action={<button className="primary-btn">+ Add Client</button>}/><div className="toolbar"><input placeholder="Search client or phone..." /><select><option>All clients</option></select></div><DataTable rows={clients} columns={[
{key:"id",label:"Client ID"},{key:"name",label:"Client",render:r=><strong>{r.name}</strong>},{key:"phone",label:"Phone"},{key:"projects",label:"Projects"},
{key:"outstanding",label:"Outstanding",render:r=><strong>৳{r.outstanding.toLocaleString()}</strong>},
{key:"status",label:"Status",render:r=><Badge tone="success">{r.status}</Badge>}
]}/></div>}
