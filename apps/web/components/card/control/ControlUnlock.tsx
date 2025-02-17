import { useUpdateCardUnlockMutation } from "@/lib/redux/api/cardApi";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  selectCardControl,
  selectCardItem,
} from "@/lib/redux/slices/cardSlice";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ControlUnlock() {
  const router = useRouter();

  const cardItem = useAppSelector(selectCardItem);
  const control = useAppSelector(selectCardControl);
  const [updateCardLock, { isLoading }] = useUpdateCardUnlockMutation();

  const handleClick = async () => {
    const body = { unlockCardOtp: control.unlockOtp };
    await updateCardLock({ cardId: cardItem.id, body });

    router.push("/card");
  };

  return (
    <>
      <div className="space-y-4 px-4">
        <h4 className="text-sm font-medium leading-none">
          Are you sure want to unlock this card?
        </h4>
        <p className="text-sm text-muted-foreground">
          If the card is unlocked, it will be able to make transactions and be
          topped up.
        </p>
        <p className="text-sm text-muted-foreground">
          Card number: {cardItem.pan}
        </p>
      </div>
      <Separator className="my-4" />
      <Button className="w-full" onClick={handleClick} disabled={isLoading}>
        {isLoading && <Loader2 className="animate-spin" />}
        Submit
      </Button>
    </>
  );
}
