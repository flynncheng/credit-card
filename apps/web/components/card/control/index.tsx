"use client";

import { notFound, useSearchParams } from "next/navigation";
import CardImage from "../CardImage";
import ControlLock from "./ControlLock";
import ControlUnlock from "./ControlUnlock";

export default function ApplyTemplate() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "0";

  const renderControlTitle = () => {
    switch (type) {
      case "lock":
        return "Lock card";
      case "unlock":
        return "Unlock card";
    }
  };

  const renderControlContent = () => {
    switch (type) {
      case "lock":
        return <ControlLock />;
      case "unlock":
        return <ControlUnlock />;
      default:
        notFound();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-gray-800 text-2xl font-bold sm:text-3xl text-center mx-10">
        {renderControlTitle()}
      </h1>
      <CardImage />
      {renderControlContent()}
    </div>
  );
}
