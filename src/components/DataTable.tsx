import type {ReactNode} from "react";
export interface Column<T>{key:string;label:string;render?:(row:T)=>ReactNode}
export default function DataTable<T extends Record<string,unknown>>({columns,rows,empty="No records found"}:{columns:Column<T>[];rows:T[];empty?:string}){
return <div className="table-wrap"><table><thead><tr>{columns.map(c=><th key={c.key}>{c.label}</th>)}</tr></thead><tbody>{rows.length?rows.map((row,i)=><tr key={String(row.id??i)}>{columns.map(c=><td key={c.key}>{c.render?c.render(row):String(row[c.key]??"—")}</td>)}</tr>):<tr><td colSpan={columns.length} className="table-empty">{empty}</td></tr>}</tbody></table></div>;
}
