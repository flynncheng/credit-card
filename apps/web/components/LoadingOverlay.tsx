import React from "react";
import { LoaderCircle } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-opacity-40 z-10 flex items-center justify-center !mt-0">
      <div className="pb-[30vh]">
        <LoaderCircle className="animate-spin" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
