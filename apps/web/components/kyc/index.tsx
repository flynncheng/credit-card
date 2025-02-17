"use client";

import Steps from "@/components/Steps";
import { notFound, useSearchParams } from "next/navigation";
import KycStepOne from "./KycStepOne";
import KycStepThree from "./KycStepThree";
import KycStepTwo from "./KycStepTwo";

export default function KycTemplate() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "1";

  const stepNum = parseInt(step);

  const renderKycTitle = () => {
    switch (stepNum) {
      case 1:
        return "Kyc Information";
      case 2:
        return "Kyc Document";
      case 3:
        return "Kyc Status";
    }
  };

  const renderKycContent = () => {
    switch (stepNum) {
      case 1:
        return <KycStepOne step={stepNum} />;
      case 2:
        return <KycStepTwo step={stepNum} />;
      case 3:
        return <KycStepThree />;
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
        {renderKycTitle()}
      </h1>
      {stepNum > 0 && <Steps steps={steps} />}
      {renderKycContent()}
    </div>
  );
}
