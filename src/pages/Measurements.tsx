import SectionHeader from "../components/SectionHeader";
import DataTable from "../components/DataTable";
import {measurements} from "../data/mockData";
export default function Measurements(){return <div><SectionHeader eyebrow="CONTRACT WORK" title="Measurements" description="Actual site measurements drive contract billing; there is no fixed project total required at creation." action={<button className="primary-btn">+ Add Measurement</button>}/><div className="formula-card"><strong>Billing formula</strong><span>Actual Quantity × Contract Rate = Bill Amount</span></div><DataTable rows={measurements} columns={[
{key:"date",label:"Date"},{key:"project",label:"Project"},{key:"work",label:"Work Item",render:r=><strong>{r.work}</strong>},{key:"location",label:"Location"},
{key:"quantity",label:"Quantity",render:r=><strong>{r.quantity.toLocaleString()} {r.unit}</strong>},{key:"rate",label:"Rate",render:r=><span>৳{r.rate.toLocaleString()}</span>},
{key:"amount",label:"Bill Amount",render:r=><strong>৳{r.amount.toLocaleString()}</strong>}
]}/></div>}
