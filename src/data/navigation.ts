export interface NavItem{label:string;path:string;description?:string;}
export const adminNavigation:NavItem[]=[
{label:"Dashboard",path:"/",description:"Company overview"},
{label:"Workers",path:"/workers",description:"Worker profiles and assignments"},
{label:"Clients",path:"/clients",description:"Client records and portals"},
{label:"Projects",path:"/projects",description:"Sites and project operations"},
{label:"Attendance",path:"/attendance",description:"Hajira and daily attendance"},
{label:"Measurements",path:"/measurements",description:"Contract work measurements"},
{label:"Billing",path:"/billing",description:"Client bills and receipts"},
{label:"Payments",path:"/payments",description:"Worker settlements and payments"},
{label:"Cash",path:"/cash",description:"Cash ledger and balance"},
{label:"Expenses",path:"/expenses",description:"Project and company expenses"},
{label:"Reports",path:"/reports",description:"Operational and financial reports"},
{label:"Corrections",path:"/corrections",description:"Review correction requests"},
{label:"Audit Log",path:"/audit",description:"Activity history"},
{label:"Settings",path:"/settings",description:"System configuration"}
];
export const portalNavigation=[
{label:"Foreman Portal",path:"/portal/foreman"},
{label:"Worker Portal",path:"/portal/worker"},
{label:"Client Portal",path:"/portal/client"}
];
