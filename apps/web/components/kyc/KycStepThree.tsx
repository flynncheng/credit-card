"use client";

import { KycStatus } from "@/hooks/kyc/useKycStatus";
import { Link } from "@/lib/i18n/routing";
import { Button } from "@workspace/ui/components/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function KycStepThree() {
  const t = useTranslations("KycPage");

  const kycStatus = {
    status: "VERIFYING",
    description:
      "Your KYC documents are currently being verified. Please check back again later.",
  };

  const getKycStatusTitle = () => {
    if (!kycStatus.status) return;

    switch (kycStatus.status) {
      case KycStatus.VERIFYING:
        return t("title");
      case KycStatus.PASSED:
        return t("passed-title");
      case KycStatus.REJECTED:
        return t("rejected-title");
    }
  };

  const getKycStatusImage = () => {
    if (!kycStatus.status) return;

    switch (kycStatus.status) {
      case KycStatus.VERIFYING:
        return (
          <Image
            src="/icon-verifying.svg"
            width={60}
            height={60}
            alt="icon"
            className="mx-auto"
          />
        );
      case KycStatus.PASSED:
        return (
          <Image
            src="icon-verified.svg"
            width={60}
            height={60}
            alt="icon"
            className="mx-auto"
          />
        );
      case KycStatus.REJECTED:
        return (
          <Image
            src="/icon-rejected.svg"
            width={60}
            height={60}
            alt="icon"
            className="mx-auto"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-center pt-12">
      {getKycStatusImage()}

      <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {getKycStatusTitle()}
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        {kycStatus.description}
      </p>
      <Button className="mt-12 w-full" asChild>
        <Link href="/card">{t("back-account")}</Link>
      </Button>
    </div>
  );
}
