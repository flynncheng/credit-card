import { useLazyReadCardBalanceQuery } from "@/lib/redux/api/cardApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectCardItem } from "@/lib/redux/slices/cardSlice";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CardImage() {
  const [open, setOpen] = useState(false);

  const cardItem = useAppSelector(selectCardItem);
  const [readCardBalance, { data, isLoading }] = useLazyReadCardBalanceQuery();

  const handleClick = () => {
    setOpen(!open);
    readCardBalance(cardItem.id);
  };

  return (
    <div className="w-full relative">
      <Image
        src="/api/images/card.png"
        width={680}
        height={428}
        alt="Card category"
        priority={true}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <div
        className="absolute top-4 right-4 text-white/80 flex gap-3 cursor-pointer"
        onClick={handleClick}
      >
        <span>
          Balance {cardItem.type === "Virtual" ? "$" : "€"}
          {open && data ? data.balance.toFixed(2) : "**"}
        </span>
        {open ? (
          isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Eye />
          )
        ) : (
          <EyeOff />
        )}
      </div>
      <span className="absolute bottom-12 left-6 text-white/80">
        {cardItem.pan}
      </span>
    </div>
  );
}
