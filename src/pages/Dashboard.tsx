const stats=[
["Active Projects","0","Projects currently running"],["Active Workers","0","Workers on assignments"],
["Today Hajira","0.0","Total attendance quantity"],["Client Outstanding","৳0","Cash receivable"],
["Worker Outstanding","৳0","Settlement payable"],["Current Cash","৳0","Cash ledger balance"]
];
export default function Dashboard(){
return <div><div className="page-heading"><div><span className="eyebrow">ADMIN DASHBOARD</span><h2>Company Overview</h2><p>SCMS operational and financial control center.</p></div><div className="status-pill">Database not connected</div></div>
<div className="stats-grid">{stats.map(([title,value,note])=><article className="stat-card" key={title}><span>{title}</span><strong>{value}</strong><small>{note}</small></article>)}</div>
<div className="dashboard-grid"><article className="panel"><div className="panel-header"><div><h3>Project Operations</h3><p>Contract and manpower projects will appear here.</p></div></div><div className="empty-state"><strong>No project data yet</strong><span>Connect the database later to load live projects.</span></div></article>
<article className="panel"><div className="panel-header"><div><h3>Cash Snapshot</h3><p>All company transactions are planned as cash transactions.</p></div></div><div className="cash-list">{["Client receipts","Worker payments","Advances / pocket money","Expenses"].map(x=><div key={x}><span>{x}</span><strong>৳0</strong></div>)}</div></article></div></div>;
}
