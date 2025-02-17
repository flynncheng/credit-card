import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

export default function ApplyStepOne({ step }: { step: number }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`?step=${++step}`);
  };

  return (
    <>
      <div className="space-y-6 border p-4 rounded-lg shadow-sm">
        <ul className="text-xs flex flex-row gap-3 justify-between">
          <li className="w-1/3 flex flex-col gap-y-[8px] items-start">
            <span className="font-normal">Application Fee</span>
            <span className="font-bold">19 USDT / USDC</span>
          </li>
          <li className="w-1/3 flex flex-col gap-y-[8px] items-start">
            <div className="font-normal">Topup Fee</div>
            <div className="font-bold">3%</div>
          </li>
          <li className="w-1/3 flex flex-col gap-y-[8px] items-start">
            <div className="font-normal">Monthly Fee</div>
            <div className="font-bold">5 USDT / USDC</div>
          </li>
        </ul>
        <div className="border-t pt-6">
          <ul className="text-xs flex flex-row gap-3 justify-between">
            <li className="w-1/3 flex flex-col gap-y-[8px] items-start">
              <span className="font-normal">Application Fee</span>
              <span className="font-bold">19 USDT / USDC</span>
            </li>
            <li className="w-1/3 flex flex-col gap-y-[8px] items-start">
              <div className="font-normal">Topup Fee</div>
              <div className="font-bold">3%</div>
            </li>
            <li className="w-1/3 flex flex-col gap-y-[8px] items-start">
              <div className="font-normal">Monthly Fee</div>
              <div className="font-bold">5 USDT / USDC</div>
            </li>
          </ul>
        </div>
      </div>
      <Button className="w-full" onClick={handleClick}>
        Continue
      </Button>
    </>
  );
}
