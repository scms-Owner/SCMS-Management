import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { adminNavigation,portalNavigation } from "../data/navigation";

export default function Layout({children}:{children:ReactNode}){
return <div className="app-shell">
<aside className="sidebar">
<div className="brand"><div className="brand-mark">SC</div><div><strong>SCMS</strong><span>Management</span></div></div>
<nav className="nav-section"><div className="nav-title">Management</div>
{adminNavigation.map(item=><NavLink key={item.path} to={item.path} end={item.path==="/"} className={({isActive})=>`nav-link ${isActive?"active":""}`}>{item.label}</NavLink>)}</nav>
<nav className="nav-section portal-nav"><div className="nav-title">Portals</div>
{portalNavigation.map(item=><NavLink key={item.path} to={item.path} className="nav-link">{item.label}</NavLink>)}</nav>
<div className="sidebar-footer"><small>SCMS Management v0.1</small><span>Database: not connected</span></div>
</aside>
<main className="main-area"><header className="topbar"><div><span className="eyebrow">SOHANUR CONSTRUCTION & MANPOWER SOLUTION</span><h1>Management System</h1></div><div className="user-chip"><span className="avatar">A</span><span>Admin</span></div></header><section className="page-content">{children}</section></main>
</div>;
}
