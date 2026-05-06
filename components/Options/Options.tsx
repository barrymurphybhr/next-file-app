import { Suspense } from "react";
import Sorting from "./../Sorting/Sorting";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { ChevronThinRightIcon, HomeFillIcon } from "@brighthr/icons";

export default function Options() {
  const Home = HomeFillIcon;
  const Separator = ChevronThinRightIcon;
  return (
    <div className="flex flex-col pl-4 pt-4">
      <Breadcrumb
        homeElement={<Home className="h-8 w-8" fill="black" />}
        separator={<Separator className="h-4 w-4 mt-2" />}
        activeClasses="underline font-bold"
        containerClasses="flex py-4 gap-2"
        listClasses="hover:underline flex items-center font-base"
      />
      <Suspense>
        <Sorting />
      </Suspense>
    </div>
  );
}
