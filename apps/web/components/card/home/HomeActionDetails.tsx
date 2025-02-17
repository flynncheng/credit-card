import { useLazyReadCardDetailsQuery } from "@/lib/redux/api/cardApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectCardItem } from "@/lib/redux/slices/cardSlice";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";

export default function HomeActionDetails() {
  const [open, setOpen] = useState(false);

  const cardItem = useAppSelector(selectCardItem);
  const [readCardDetails, { data, isFetching }] = useLazyReadCardDetailsQuery();

  const cvv = data?.cardCvv;
  const expiryDate = data?.cardExpiryDate;
  const number = data?.cardPan;

  const handleClick = async () => {
    await readCardDetails(cardItem.id);
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="secondary"
        className="rounded-full shadow border p-3 h-auto [&_svg]:size-6"
        onClick={handleClick}
      >
        {isFetching ? <Loader2 className="animate-spin" /> : <CreditCard />}
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Card Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cvv" className="text-right">
              CVV
            </Label>
            <Input
              id="cvv"
              defaultValue={cvv}
              className="col-span-3 disabled:cursor-auto"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expiry-date" className="text-right">
              Expiry Date
            </Label>
            <Input
              id="expiry-date"
              defaultValue={expiryDate}
              className="col-span-3 disabled:cursor-auto"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-right">
              Number
            </Label>
            <Input
              id="number"
              defaultValue={number}
              className="col-span-3 disabled:cursor-auto"
              disabled
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
