import {Routes,Route} from "react-router-dom";
import Layout from "./components/Layout";
import AuthGate from "./components/AuthGate";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ModulePage from "./pages/ModulePage";
import Workers from "./pages/Workers";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Attendance from "./pages/Attendance";
import Measurements from "./pages/Measurements";
import Cash from "./pages/Cash";
import Reports from "./pages/Reports";
import {ClientPortal,ForemanPortal,WorkerPortal} from "./pages/Portals";

const modules:Record<string,{title:string;description:string;items:string[]}>={
"/billing":{title:"Client Billing",description:"Partial and final bills based on actual contract measurements or manpower attendance.",items:["Bill headers and items","Measurement-linked bill items","Manpower billing","Partial / multiple bills","Cash receipt linkage"]},
"/payments":{title:"Worker Payments",description:"Weekly or monthly settlements with transparent advance deductions.",items:["Gross hajira earnings","Daily pocket money","Other authorized adjustments","Net payable","Payment history"]},
"/expenses":{title:"Expenses",description:"Project and company cash expenses.",items:["Project expenses","Other expenses","Expense categories","Cash ledger integration","Audit trail"]},
"/corrections":{title:"Correction Requests",description:"Controlled workflow for records submitted by foremen.",items:["Requested record and change","Reason","Admin approval / rejection","Original value preservation","Audit history"]},
"/audit":{title:"Audit Log",description:"Traceable history of operational and financial changes.",items:["Creator and timestamp","Original values","Correction requester","Approver / rejector","Final change history"]},
"/settings":{title:"Settings",description:"System configuration and permission controls.",items:["Roles and permissions","Company settings","Work units","Project statuses","Notification preferences"]}
};

function Protected(){return <AuthGate><Layout><Routes>
<Route path="/" element={<Dashboard/>}/>
<Route path="/workers" element={<Workers/>}/>
<Route path="/clients" element={<Clients/>}/>
<Route path="/projects" element={<Projects/>}/>
<Route path="/attendance" element={<Attendance/>}/>
<Route path="/measurements" element={<Measurements/>}/>
<Route path="/cash" element={<Cash/>}/>
<Route path="/reports" element={<Reports/>}/>
{Object.entries(modules).map(([path,config])=><Route key={path} path={path} element={<ModulePage {...config}/>}/>)}
<Route path="/portal/foreman" element={<ForemanPortal/>}/>
<Route path="/portal/worker" element={<WorkerPortal/>}/>
<Route path="/portal/client" element={<ClientPortal/>}/>
</Routes></Layout></AuthGate>}

export default function App(){return <Routes><Route path="/login" element={<Login/>}/><Route path="*" element={<Protected/>}/></Routes>}
