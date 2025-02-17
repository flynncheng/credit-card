import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { CircleArrowDown, WalletCards } from "lucide-react";
import { useRouter } from "next/navigation";
import HomeActionDetails from "./HomeActionDetails";
import HomeActionLock from "./HomeActionLock";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectCardItem } from "@/lib/redux/slices/cardSlice";
import HomeActionUnlock from "./HomeActionUnlock";

export const enum CardStatus {
  ACTIVE = "ACTIVE",
  LOCKED = "LOCKED",
}

export default function HomeAction() {
  const router = useRouter();

  const cardItem = useAppSelector(selectCardItem);
  const cardActive = cardItem.status === CardStatus.ACTIVE;

  return (
    <Card>
      <CardContent className="p-4 px-0 grid grid-cols-4 gap-y-4 max-w-screen-xl mx-auto text-xs font-medium text-muted-foreground">
        {cardActive && (
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="secondary"
              className="rounded-full shadow border p-3 h-auto [&_svg]:size-6"
              onClick={() => router.push("/card/topup")}
            >
              <CircleArrowDown />
            </Button>
            <span>Topup</span>
          </div>
        )}
        <div className="flex flex-col items-center space-y-2">
          <Button
            variant="secondary"
            className="rounded-full shadow border p-3 h-auto [&_svg]:size-6"
            onClick={() => router.push("/card/apply")}
          >
            <WalletCards />
          </Button>
          <span>Add</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <HomeActionDetails />
          <span>Details</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          {cardActive ? <HomeActionLock /> : <HomeActionUnlock />}
          <span>{cardActive ? "Lock" : "Unlock"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
