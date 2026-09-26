import type {ReactNode} from "react";
export default function Badge({children,tone="neutral"}:{children:ReactNode;tone?:string}){
return <span className={`badge badge-${tone}`}>{children}</span>;
}
