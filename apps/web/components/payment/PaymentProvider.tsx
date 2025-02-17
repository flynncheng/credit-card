import { useAppSelector } from "@/lib/redux/hooks";
import { selectCardPayment } from "@/lib/redux/slices/cardSlice";
import { Card } from "@workspace/ui/components/card";
import PaymentSkeleton from "./PaymentSkeleton";

export default function PaymentProvider({ type }: { type: "apply" | "topup" }) {
  const payment = useAppSelector(selectCardPayment);

  return payment[type] ? (
    <Card>
      <iframe
        className="rounded-xl"
        src={payment[type]}
        width="100%"
        height="600px"
      />
    </Card>
  ) : (
    <PaymentSkeleton />
  );
}
