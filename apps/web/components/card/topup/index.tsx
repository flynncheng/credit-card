"use client";

import Steps from "@/components/Steps";
import { notFound, useSearchParams } from "next/navigation";
import TopupStepOne from "./TopupStepOne";
import TopupStepThree from "./TopupStepThree";
import TopupStepTwo from "./TopupStepTwo";
import CardImage from "../CardImage";

export default function TopupTemplate() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "1";

  const stepNum = parseInt(step);

  const renderTopupTitle = () => {
    switch (stepNum) {
      case 1:
        return "Topup card";
      case 2:
        return "Topup card";
      case 3:
        return "Payment";
    }
  };

  const renderTopupContent = () => {
    switch (stepNum) {
      case 1:
        return <TopupStepOne step={stepNum} />;
      case 2:
        return <TopupStepTwo step={stepNum} />;
      case 3:
        return <TopupStepThree />;
      default:
        notFound();
    }
  };

  const steps = {
    stepsCount: [1, 2, 3],
    currentStep: stepNum,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-gray-800 text-2xl font-bold sm:text-3xl text-center mx-10">
        {renderTopupTitle()}
      </h1>
      <Steps steps={steps} />
      {stepNum !== 3 && <CardImage />}
      {renderTopupContent()}
    </div>
  );
}
