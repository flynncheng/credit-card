import { appConfig } from "@/app.config";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Label } from "@workspace/ui/components/label";
import { CircleUserRound, ClipboardCopy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactUs() {
  const t = useTranslations("LocaleLayout");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState();

  const copyTextToClipboard = async (text: string | undefined) => {
    if (text === undefined) return;
    if (window.isSecureContext && navigator.clipboard) {
      return await navigator.clipboard.writeText(text);
    } else {
      throw t("failed-to-copy");
    }
  };

  const handleClick = () => {
    copyTextToClipboard(appConfig.client.email)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <CircleUserRound />
          {t("contact-us-button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>{t("contact-us-title")}</DialogTitle>
          <DialogDescription>{t("contact-us-description")}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-1.5">
          <Label>{appConfig.client.email?.toLowerCase()}</Label>
          <Button className="px-2" variant="outline" onClick={handleClick}>
            <ClipboardCopy />
            <span>
              {isCopied ? (
                <span className="text-indigo-600">{t("copied")}</span>
              ) : (
                t("copy")
              )}
            </span>
          </Button>
        </div>
        {error && <p className="text-red-500 mt-1">{error}</p>}
        <DialogFooter>
          <Button type="submit">
            <a href={`mailto:${appConfig.client.email?.toLowerCase()}`}>
              {t("send-email")}
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
