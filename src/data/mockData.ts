export const dashboardData={
activeProjects:6,activeWorkers:48,todayHajira:41.5,clientOutstanding:485000,workerOutstanding:126500,currentCash:732500
};

export const workers=[
{id:"W-001",name:"Abdul Karim",category:"Mason",phone:"01711-000001",project:"Mirpur Residence",rate:1000,status:"Active"},
{id:"W-002",name:"Rahim Uddin",category:"Helper",phone:"01711-000002",project:"Dhanmondi Commercial",rate:750,status:"Active"},
{id:"W-003",name:"Jalal Mia",category:"Rod Binder",phone:"01711-000003",project:"Uttara Villa",rate:1100,status:"Active"},
{id:"W-004",name:"Selim Ahmed",category:"Carpenter",phone:"01711-000004",project:"Mirpur Residence",rate:1200,status:"Active"},
{id:"W-005",name:"Babul Hossain",category:"Painter",phone:"01711-000005",project:"Gulshan Office",rate:950,status:"Inactive"}
];

export const projects=[
{id:"P-001",name:"Mirpur Residence",client:"Mr. Hasan",type:"Contract",status:"Active",foreman:"Rashed",location:"Mirpur, Dhaka",revenue:850000,cost:525000},
{id:"P-002",name:"Dhanmondi Commercial",client:"ABC Holdings",type:"Manpower",status:"Active",foreman:"Kamal",location:"Dhanmondi, Dhaka",revenue:420000,cost:315000},
{id:"P-003",name:"Uttara Villa",client:"Mr. Rahman",type:"Contract",status:"Active",foreman:"Rashed",location:"Uttara, Dhaka",revenue:610000,cost:382000},
{id:"P-004",name:"Gulshan Office",client:"XYZ Ltd.",type:"Manpower",status:"Active",foreman:"Jamal",location:"Gulshan, Dhaka",revenue:275000,cost:198000},
{id:"P-005",name:"Keraniganj Warehouse",client:"Delta Traders",type:"Contract",status:"Planning",foreman:"Kamal",location:"Keraniganj, Dhaka",revenue:0,cost:0}
];

export const attendance=[
{date:"2026-09-26",worker:"Abdul Karim",project:"Mirpur Residence",hajira:1,rate:1000,earned:1000,status:"Locked"},
{date:"2026-09-26",worker:"Rahim Uddin",project:"Dhanmondi Commercial",hajira:.5,rate:750,earned:375,status:"Submitted"},
{date:"2026-09-26",worker:"Jalal Mia",project:"Uttara Villa",hajira:1.5,rate:1100,earned:1650,status:"Locked"},
{date:"2026-09-26",worker:"Selim Ahmed",project:"Mirpur Residence",hajira:1,rate:1200,earned:1200,status:"Submitted"}
];

export const cashEntries=[
{date:"2026-09-26",type:"Client Receipt",description:"Mirpur Residence - Bill #003",in:150000,out:0,project:"Mirpur Residence"},
{date:"2026-09-26",type:"Worker Advance",description:"Daily pocket money",in:0,out:12500,project:"Mirpur Residence"},
{date:"2026-09-25",type:"Worker Payment",description:"Weekly settlement",in:0,out:65000,project:"Dhanmondi Commercial"},
{date:"2026-09-25",type:"Project Expense",description:"Cement transport",in:0,out:18000,project:"Uttara Villa"}
];

export const measurements=[
{date:"2026-09-25",project:"Mirpur Residence",work:"Roof Casting",location:"2nd Floor",length:40,width:30,quantity:1200,unit:"Sq.ft",rate:180,amount:216000},
{date:"2026-09-24",project:"Uttara Villa",work:"Masonry",location:"Ground Floor",length:50,width:10,quantity:500,unit:"Sq.ft",rate:85,amount:42500},
{date:"2026-09-23",project:"Mirpur Residence",work:"Column",location:"2nd Floor",length:18,width:0,quantity:18,unit:"Rft",rate:950,amount:17100}
];
