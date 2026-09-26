export type UserRole="admin"|"foreman"|"worker"|"client";
export type ProjectType="contract"|"manpower";
export type ProjectStatus="planning"|"active"|"paused"|"completed"|"cancelled";
export interface ProjectSummary{id:string;name:string;client:string;type:ProjectType;status:ProjectStatus;location:string;}
