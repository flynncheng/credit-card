import OtpForm from "@/components/OtpForm";
import {
  useLazyReadCardLockOtpQuery,
  useUpdateCardLockOtpMutation,
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
import { LockKeyhole, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeActionLock() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const cardItem = useAppSelector(selectCardItem);
  const dispatch = useAppDispatch();

  const [sendCardLockOtp, { isLoading: isLoadingSend }] =
    useLazyReadCardLockOtpQuery();
  const [resendCardLockOtp, { isLoading: isLoadingResend }] =
    useLazyReadCardLockOtpQuery();
  const [submitCardLockOtp, { isLoading: isLoadingSubmit }] =
    useUpdateCardLockOtpMutation();

  const handleSend = async () => {
    await sendCardLockOtp(cardItem.id).unwrap();
    setOpen(true);
  };

  const handleResend = async () => {
    await resendCardLockOtp(cardItem.id).unwrap();
  };

  const handleSubmit = async (_: unknown, pin: string) => {
    await submitCardLockOtp({
      otp: pin,
    }).unwrap();
    dispatch(setCardControl({ control: { lockOtp: pin } }));

    router.push("/card/control?type=lock");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="secondary"
        className="rounded-full shadow border p-3 h-auto [&_svg]:size-6"
        onClick={handleSend}
      >
        {isLoadingSend ? <Loader2 className="animate-spin" /> : <LockKeyhole />}
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Lock Card</DialogTitle>
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
