import { Routes,Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ModulePage from "./pages/ModulePage";
import {ClientPortal,ForemanPortal,WorkerPortal} from "./pages/Portals";

const modules:Record<string,{title:string;description:string;items:string[]}>={
"/workers":{title:"Workers",description:"Worker profiles, categories, assignments and rate history.",items:["Worker master records","Categories and skills","Project assignments","Effective worker rates","Worker account and portal access"]},
"/clients":{title:"Clients",description:"Client records and access to their own projects and financial information.",items:["Client profiles","Multiple projects per client","Client portal access","Cash receipt history","Outstanding tracking"]},
"/projects":{title:"Projects",description:"Manage simultaneous contract-work and manpower-supply sites.",items:["Project type","Primary foreman","Worker assignments","Project status","Project-level revenue, cost and profit"]},
"/attendance":{title:"Attendance / Hajira",description:"Decimal hajira records such as 0, 0.5, 1, 1.5, 2 and 3.",items:["Project-scoped attendance","Worker-specific effective rate","Hajira quantity","Automatic earning calculation","Locked submissions and corrections"]},
"/measurements":{title:"Contract Measurements",description:"Measurement-based billing for contract work.",items:["Work item master","Project-specific work items","Length / width / height","Flexible units: Sq.ft, Rft, Cft, Nos and more","Measurement × rate billing"]},
"/billing":{title:"Client Billing",description:"Partial and final bills based on actual contract measurements or manpower attendance.",items:["Bill headers and items","Measurement-linked bill items","Manpower billing","Partial / multiple bills","Cash receipt linkage"]},
"/payments":{title:"Worker Payments",description:"Weekly or monthly settlements with transparent advance deductions.",items:["Gross hajira earnings","Daily pocket money","Other authorized adjustments","Net payable","Payment history"]},
"/cash":{title:"Cash Management",description:"Single company cash ledger for receipts, payments and expenses.",items:["Opening cash","Client cash receipts","Worker payments","Worker advances","Project and company expenses"]},
"/expenses":{title:"Expenses",description:"Project and company cash expenses.",items:["Project expenses","Other expenses","Expense categories","Cash ledger integration","Audit trail"]},
"/reports":{title:"Reports",description:"Operational, financial and project profitability reporting.",items:["Worker earnings","Attendance","Client billing","Outstanding","Project revenue / cost / profit","Cash reports"]},
"/corrections":{title:"Correction Requests",description:"Controlled workflow for records submitted by foremen.",items:["Requested record and change","Reason","Admin approval / rejection","Original value preservation","Audit history"]},
"/audit":{title:"Audit Log",description:"Traceable history of operational and financial changes.",items:["Creator and timestamp","Original values","Correction requester","Approver / rejector","Final change history"]},
"/settings":{title:"Settings",description:"System configuration and future authentication / permission controls.",items:["Roles and permissions","Company settings","Work units","Project statuses","Notification preferences"]}
};
export default function App(){return <Layout><Routes><Route path="/" element={<Dashboard/>}/>{Object.entries(modules).map(([path,config])=><Route key={path} path={path} element={<ModulePage {...config}/>}/>}<Route path="/portal/foreman" element={<ForemanPortal/>}/><Route path="/portal/worker" element={<WorkerPortal/>}/><Route path="/portal/client" element={<ClientPortal/>}/></Routes></Layout>;}
