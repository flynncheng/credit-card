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
import { useTranslations } from "next-intl";
import { convertToTitleCase } from "@/utils/stringUtils";

export default function RiskReminder() {
  const t = useTranslations("RiskReminder");

  const reminders = [
    {
      mcc: "MCC",
      description: t("prohibited-business-types"),
    },
    {
      mcc: "5094",
      description: t("internet-gambling"),
    },
    {
      mcc: "5960",
      description: t("pornographic-platforms"),
    },
    {
      mcc: "5962",
      description: t("gift-cards"),
    },
    {
      mcc: "5963",
      description: t("illegal-forex"),
    },
    {
      mcc: "5964",
      description: t("illegal-fundraising"),
    },
    {
      mcc: "5965",
      description: t("illegal-securities-and-futures-trading-platforms"),
    },
    {
      mcc: "5966",
      description: t("token-issuance-financing"),
    },
    {
      mcc: "5967",
      description: t("virtual-currency-trading-platforms"),
    },
    {
      mcc: "5968",
      description: t("fortune-telling"),
    },
    {
      mcc: "5969",
      description: t("illegal-or-high-risk-activities"),
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer text-blue-600 hover:text-blue-500">
          {convertToTitleCase(appConfig.client.name)}&apos;s Terms of Risk
          Scenario Reminder
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left">
          <DialogTitle>Risk Scenario</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          I have read and agree to Mountain Wolf Terms of Risk Scenario Reminder
          when use the prepaid card. If a single card has more than 5
          consecutive rejections or uses the card in prohibited scenarios, the
          card will be deactivated.
        </DialogDescription>
        <ul className="max-h-96 overflow-y-auto grid grid-cols-1 gap-x-10">
          {reminders.map((item, idx) => (
            <li
              key={idx}
              className="py-3 flex justify-between items-center border-b gap-4"
            >
              <div className="flex gap-3 items-center">
                <div>
                  <span className="block text-xs text-gray-700">
                    {item.description}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <DialogFooter className="hidden">
          <Button type="submit">I agree</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
