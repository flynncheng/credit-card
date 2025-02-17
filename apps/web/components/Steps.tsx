interface steps {
  stepsCount: number[];
  currentStep: number;
}

export default function Steps({ steps }: { steps: steps }) {
  return (
    <ul aria-label="Steps" className="flex items-center">
      {steps.stepsCount.map((_, idx) => (
        <li
          key={idx}
          aria-current={steps.currentStep == idx + 1 ? "step" : false}
          className="flex-1 last:flex-none flex items-center"
        >
          <div
            className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1 ? "bg-indigo-600 border-indigo-600" : steps.currentStep == idx + 1 ? "border-indigo-600" : ""}`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full bg-indigo-600 ${steps.currentStep != idx + 1 ? "hidden" : ""}`}
            ></span>
            {steps.currentStep > idx + 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
          <hr
            className={`w-full border ${idx + 1 == steps.stepsCount.length ? "hidden" : steps.currentStep > idx + 1 ? "border-indigo-600" : ""}`}
          />
        </li>
      ))}
    </ul>
  );
}
