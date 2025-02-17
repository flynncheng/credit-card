import { appConfig } from "@/app.config";
import useKycStatus from "@/hooks/kyc/useKycStatus";
import { useReadCardMonthlyToppedUpQuery } from "@/lib/redux/api/cardApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectCardItem } from "@/lib/redux/slices/cardSlice";
import { capitalize } from "@/utils/stringUtils";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { useTranslations } from "next-intl";

export default function HomeInfoGrid() {
  const t = useTranslations("CardHomePage");

  const cardItem = useAppSelector(selectCardItem);
  const { data: monthlyTopupRes } = useReadCardMonthlyToppedUpQuery(
    cardItem?.id,
    {
      skip: !cardItem?.id,
    },
  );

  const { status } = useKycStatus();

  const typeLabel =
    cardItem?.type === "PHYSICAL_CARD"
      ? "Mastercard"
      : cardItem?.type === "Virtual"
        ? "Premium Visa"
        : "Classic Visa";
  const isLocked =
    cardItem?.status === "LOCKED" || cardItem.status === "INACTIVE";

  return (
    <Card>
      <CardContent className="grid grid-cols-3 gap-4 p-4 text-xs">
        <div className="flex flex-col items-start space-y-2">
          <div className="text-muted-foreground">{t("holder-name")}</div>
          <div className="font-medium text-gray-900">{cardItem.nameOnCard}</div>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <div className="text-muted-foreground">Expire date</div>
          <div className="font-medium text-gray-900">{cardItem.expiryDate}</div>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <div className="text-muted-foreground">{typeLabel}</div>
          <div className="font-medium text-gray-900">
            <Badge variant={isLocked ? "destructive" : "default"}>
              {capitalize(cardItem.status)}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <div className="text-muted-foreground">KYC Status</div>
          <div className="font-medium text-gray-900">
            <Badge variant="secondary">{capitalize(status)}</Badge>
          </div>
        </div>
        <div className="flex flex-col items-start space-y-2 col-span-full border-t pt-4">
          <div className="flex justify-between items-center w-full text-muted-foreground">
            <p className="flex flex-col">
              <span>Monthly Topup Limit</span>
              <span>(USDT / USDC)</span>
            </p>
            <p>
              <span className="font-medium text-gray-900">
                {monthlyTopupRes?.monthlyRechargedAmt}
              </span>{" "}
              / <span>100,000</span>
            </p>
          </div>
          <Progress
            className="h-2"
            value={
              (monthlyTopupRes?.monthlyRechargedAmt /
                appConfig.app.monthlyLimit) *
              100
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
