"use client";

import { appConfig } from "@/app.config";
import { convertToTitleCase } from "@/utils/stringUtils";
import HomeAction from "./HomeAction";
import HomeCarousel from "./HomeCarousel";
import HomeDivider from "./HomeDivider";
import HomeInfoGrid from "./HomeInfoGrid";
import HomeRecords from "./HomeRecords";

export default function HomeTemplate() {
  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-gray-800 text-2xl font-bold sm:text-3xl text-center mx-10">
        {convertToTitleCase(appConfig.client.name)}
      </h1>
      <HomeCarousel />
      <HomeInfoGrid />
      <HomeDivider />
      <HomeAction />
      <HomeRecords />
    </div>
  );
}
