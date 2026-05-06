"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
};

export default function Breadcrumb({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
}: TBreadCrumbProps) {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const HIDDEN_SEGMENTS: string[] = [];

  return (
    <div>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={"/"}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.reduce<React.ReactNode[]>((crumbs, link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          if (HIDDEN_SEGMENTS.includes(link)) return crumbs;
          const isLast = index === pathNames.length - 1;
          const itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;

          crumbs.push(
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{link}</Link>
              </li>
              {!isLast && separator}
            </React.Fragment>,
          );
          return crumbs;
        }, [])}
      </ul>
    </div>
  );
}
