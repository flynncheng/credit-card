import { useAppDispatch } from "@/lib/redux/hooks";
import { persistor } from "@/lib/redux/store";
import { Button } from "@workspace/ui/components/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/redux/actions";

export default function SignOut() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(signOut());
    persistor.purge();
    window.location.reload();
  };

  return (
    <Button variant="ghost" onClick={handleClick}>
      Logout
      <LogOut />
    </Button>
  );
}
