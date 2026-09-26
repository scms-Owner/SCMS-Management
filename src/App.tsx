import {Routes,Route} from "react-router-dom";
import Layout from "./components/Layout";
import AuthGate from "./components/AuthGate";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workers from "./pages/Workers";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Attendance from "./pages/Attendance";
import Measurements from "./pages/Measurements";
import Cash from "./pages/Cash";
import Reports from "./pages/Reports";
import Operations from "./pages/Operations";
import {ClientPortal,ForemanPortal,WorkerPortal} from "./pages/Portals";

function Protected(){return <AuthGate><Layout><Routes>
<Route path="/" element={<Dashboard/>}/>
<Route path="/workers" element={<Workers/>}/>
<Route path="/clients" element={<Clients/>}/>
<Route path="/projects" element={<Projects/>}/>
<Route path="/attendance" element={<Attendance/>}/>
<Route path="/measurements" element={<Measurements/>}/>
<Route path="/cash" element={<Cash/>}/>
<Route path="/reports" element={<Reports/>}/>
<Route path="/billing" element={<Operations mode="billing"/>}/>
<Route path="/payments" element={<Operations mode="payments"/>}/>
<Route path="/expenses" element={<Operations mode="expenses"/>}/>
<Route path="/corrections" element={<Operations mode="corrections"/>}/>
<Route path="/audit" element={<Operations mode="audit"/>}/>
<Route path="/settings" element={<Operations mode="settings"/>}/>
<Route path="/assignments" element={<Operations mode="assignments"/>}/>
<Route path="/work-items" element={<Operations mode="workitems"/>}/>
<Route path="/portal/foreman" element={<ForemanPortal/>}/>
<Route path="/portal/worker" element={<WorkerPortal/>}/>
<Route path="/portal/client" element={<ClientPortal/>}/>
</Routes></Layout></AuthGate>}
export default function App(){return <Routes><Route path="/login" element={<Login/>}/><Route path="*" element={<Protected/>}/></Routes>}
