import { Suspense } from "react";
import Sorting from "./../Sorting/Sorting";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { ChevronThinRightIcon } from "@brighthr/icons";

export default function Options() {
  const Icon = ChevronThinRightIcon;
  return (
    <div className="flex flex-col pl-4 pt-4">
      <Breadcrumb
        homeElement={"Home"}
        separator={<Icon className="h-4 w-4 mt-1" fill="white" />}
        activeClasses="underline"
        containerClasses="flex py-4"
        listClasses="hover:underline mx-2 font-bold"
        capitalizeLinks
      />
      <Suspense>
        <Sorting />
      </Suspense>
    </div>
  );
}
