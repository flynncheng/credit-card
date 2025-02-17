import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  isAuthenticated: boolean | null;
  isSessionActive: boolean | null;
};

export default function SignInRequired({
  isAuthenticated,
  isSessionActive,
}: Props) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    router.push("/sign-up");
  };

  if (isAuthenticated === false) {
    redirect("/sign-up");
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign In Required</AlertDialogTitle>
          <AlertDialogDescription>
            {isSessionActive === null &&
              "You need to sign in to access this service."}
            {isSessionActive === false &&
              "Your session has expired. You need to re-sign in to access this service."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
