import useKycStatus from "@/hooks/kyc/useKycStatus";
import { capitalize } from "@/utils/stringUtils";

export default function KycStatus() {
  const { status, description } = useKycStatus();

  return (
    <div className="space-y-3 border p-4 rounded-lg shadow-sm">
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
      <div className="text-xs flex flex-row gap-2 border-t pt-3">
        <div className="w-1/3 flex flex-col gap-y-[8px] items-start">
          <div className="font-normal">KYC status</div>
          <div className="font-bold text-white text-xs self-start rounded-lg px-2 bg-gray-400">
            {capitalize(status)}
          </div>
        </div>
        <div className="w-2/3 flex flex-col gap-y-[8px] items-start">
          <div className="font-normal">KYC description</div>
          <div className="max-w-60 opacity-60">{description}</div>
        </div>
      </div>
    </div>
  );
}
