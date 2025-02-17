import OtpForm from "@/components/OtpForm";
import {
  useLazyReadCardUnlockOtpQuery,
  useUpdateCardUnlockOtpMutation,
} from "@/lib/redux/api/cardApi";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectCardItem, setCardControl } from "@/lib/redux/slices/cardSlice";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Loader2, LockOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeActionUnlock() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const cardItem = useAppSelector(selectCardItem);
  const dispatch = useAppDispatch();

  const [sendCardUnlockOtp, { isLoading: isLoadingSend }] =
    useLazyReadCardUnlockOtpQuery();
  const [resendCardUnlockOtp, { isLoading: isLoadingResend }] =
    useLazyReadCardUnlockOtpQuery();
  const [submitCardUnlockOtp, { isLoading: isLoadingSubmit }] =
    useUpdateCardUnlockOtpMutation();

  const handleSend = async () => {
    await sendCardUnlockOtp(cardItem.id).unwrap();
    setOpen(true);
  };

  const handleResend = async () => {
    await resendCardUnlockOtp(cardItem.id).unwrap();
  };

  const handleSubmit = async (_: unknown, pin: string) => {
    await submitCardUnlockOtp({
      otp: pin,
    }).unwrap();
    dispatch(setCardControl({ control: { unlockOtp: pin } }));

    router.push("/card/control?type=unlock");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="secondary"
        className="rounded-full shadow border p-3 h-auto [&_svg]:size-6"
        onClick={handleSend}
      >
        {isLoadingSend ? <Loader2 className="animate-spin" /> : <LockOpen />}
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Unlock Card</DialogTitle>
          <DialogDescription>
            Verify your identity to continue.
          </DialogDescription>
        </DialogHeader>
        <OtpForm
          submit={handleSubmit}
          isLoadingSubmit={isLoadingSubmit}
          resend={handleResend}
          isLoadingResend={isLoadingResend}
        />
      </DialogContent>
    </Dialog>
  );
}
