"use client";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

type Props = {};
export const BreadcrumbComponent = ({}: Props) => {
  let pathname = usePathname();
  let listroutes = pathname.split("/").filter((route) => route !== "");

  return (
    <div className="ml-2">
      <Breadcrumb>
        <BreadcrumbList>
          {listroutes.map((route, index) => {
            let fillItem = listroutes.length - 2 >= index;
            return (
              <ul key={index} className="flex items-center gap-1">
                <BreadcrumbSeparator />
                <BreadcrumbLink className={`${fillItem ? "font-bold" : ""}`}>
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </BreadcrumbLink>
              </ul>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
