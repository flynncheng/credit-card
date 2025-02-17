"use client";

import Steps from "@/components/Steps";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import ApplyStepOne from "./ApplyStepOne";
import ApplyStepThree from "./ApplyStepThree";
import ApplyStepTwo from "./ApplyStepTwo";
import ApplyStepZero from "./ApplyStepZero";

export default function ApplyTemplate() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "0";

  const stepNum = parseInt(step);

  const renderApplyTitle = () => {
    switch (stepNum) {
      case 0:
        return "Choose a card";
      case 1:
        return "Premium virtual visa card";
      case 2:
        return "Apply for a premium virtual Visa card";
      case 3:
        return "Payment";
    }
  };

  const renderApplyContent = () => {
    switch (stepNum) {
      case 0:
        return <ApplyStepZero step={stepNum} />;
      case 1:
        return <ApplyStepOne step={stepNum} />;
      case 2:
        return <ApplyStepTwo step={stepNum} />;
      case 3:
        return <ApplyStepThree />;
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
        {renderApplyTitle()}
      </h1>
      {stepNum > 0 && <Steps steps={steps} />}
      {stepNum > 0 && stepNum !== 3 && (
        <Image
          src="/api/images/card.png"
          width={680}
          height={428}
          alt="Card category"
          priority={true}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      )}
      {renderApplyContent()}
    </div>
  );
}
