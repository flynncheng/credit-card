import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import PaymentAlert from "./PaymentAlert";
import PaymentProvider from "./PaymentProvider";

export default function Payment({ type }: { type: "apply" | "topup" }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/card");
  };

  return (
    <>
      <PaymentAlert />
      <PaymentProvider type={type} />
      <Button className="w-full" onClick={handleClick}>
        Go back home
      </Button>
    </>
  );
}
