import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { adminNavigation, portalNavigation } from "../data/navigation";
import { neon } from "../lib/neon";

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const session = neon.auth.useSession();
  const closeMenu = () => setMenuOpen(false);
  const userName = session.data?.user?.name || session.data?.user?.email || "USER";

  async function signOut() {
    await neon.auth.signOut();
  }

  return <div className="app-shell">
    {menuOpen && <button className="sidebar-overlay" aria-label="Close menu" onClick={closeMenu} />}
    <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark">SC</div><div className="brand-copy"><strong>SCMS</strong><span>CONSTRUCTION ERP</span></div><button className="mobile-close" onClick={closeMenu}>×</button></div>
      <div className="site-label"><span className="site-dot"/> SECURE MANAGEMENT</div>
      <nav className="nav-section"><div className="nav-title">Management</div>
        {adminNavigation.map(item=><NavLink key={item.path} to={item.path} end={item.path==="/"} onClick={closeMenu} className={({isActive})=>`nav-link ${isActive?"active":""}`}><span className="nav-icon">{item.path==="/"?"⌂":item.label.charAt(0)}</span><span>{item.label}</span></NavLink>)}
      </nav>
      <nav className="nav-section portal-nav"><div className="nav-title">Portals</div>
        {portalNavigation.map(item=><NavLink key={item.path} to={item.path} onClick={closeMenu} className="nav-link"><span className="nav-icon">↗</span><span>{item.label}</span></NavLink>)}
      </nav>
      <div className="sidebar-footer"><strong>SCMS Management</strong><small>Neon PostgreSQL • Secure Auth</small></div>
    </aside>
    <main className="main-area"><header className="topbar"><div className="topbar-left"><button className="menu-button" onClick={()=>setMenuOpen(true)}>☰</button><div><span className="eyebrow">SOHANUR CONSTRUCTION & MANPOWER SOLUTION</span><h1>Management System</h1></div></div><div className="user-chip"><span className="avatar">{userName.charAt(0).toUpperCase()}</span><span className="user-name">{userName}</span><button className="signout-button" onClick={signOut} title="Sign out">↪</button></div></header><section className="page-content">{children}</section></main>
  </div>;
}
