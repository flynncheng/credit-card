import { appConfig } from "@/app.config";
import { useReadKycVerificationQuery } from "@/lib/redux/api/kycApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectKycVerification } from "@/lib/redux/slices/kycSlice";
import { useTranslations } from "next-intl";

export const enum KycStatus {
  NEW = "NEW",
  VERIFYING = "VERIFYING",
  PASSED = "PASSED",
  REJECTED = "REJECTED",
}

export const enum KycResultCode {
  REJECTED = "REJECTED",
  ID_NUMBER_NOT_MATCH = "ID_NUMBER_NOT_MATCH",
  COUNTRY_NOT_MATCH = "COUNTRY_NOT_MATCH",
  PHOTOCOPY = "PHOTOCOPY",
  DIGITAL_COPY = "DIGITAL_COPY",
  MANIPULATED_DOCUMENT = "MANIPULATED_DOCUMENT",
  PART_OF_DOCUMENT_HIDDEN = "PART_OF_DOCUMENT_HIDDEN",
  PART_OF_DOCUMENT_MISSING = "PART_OF_DOCUMENT_MISSING",
  MULTIPLE_PEOPLE = "MULTIPLE_PEOPLE",
  BLACK_WHITE = "BLACK_WHITE",
  BAD_QUALITY = "BAD_QUALITY",
  DAMAGED_DOCUMENT = "DAMAGED_DOCUMENT",
  NOT_A_DOCUMENT = "NOT_A_DOCUMENT",
}

export default function useKycStatus() {
  const t = useTranslations("KycStatus");

  const verification = useAppSelector(selectKycVerification);
  const kycPassed = verification.status === KycStatus.PASSED;
  const { data } = useReadKycVerificationQuery(appConfig.provider.kyc, {
    skip: kycPassed,
  });

  const status = kycPassed ? verification.status : data?.data.status;
  const resultCode = kycPassed
    ? verification.resultCode
    : data?.data.resultCode;

  const getKycStatusDescription = () => {
    switch (status) {
      case KycStatus.NEW:
        return t("new");
      case KycStatus.VERIFYING:
        return t("verifying");
      case KycStatus.PASSED:
        return t("passed");
      case KycStatus.REJECTED:
        switch (resultCode) {
          case KycResultCode.REJECTED:
            return t("rejected");
          case KycResultCode.ID_NUMBER_NOT_MATCH:
            return t("id-number-not-match");
          case KycResultCode.COUNTRY_NOT_MATCH:
            return t("country-not-match");
          case KycResultCode.PHOTOCOPY:
            return t("photocopy");
          case KycResultCode.DIGITAL_COPY:
            return t("digital-copy");
          case KycResultCode.MANIPULATED_DOCUMENT:
            return t("manipulated-document");
          case KycResultCode.PART_OF_DOCUMENT_HIDDEN:
            return t("part-of-document-hidden");
          case KycResultCode.PART_OF_DOCUMENT_MISSING:
            return t("part-of-document-missing");
          case KycResultCode.MULTIPLE_PEOPLE:
            return t("multiple-people");
          case KycResultCode.BLACK_WHITE:
            return t("black-white");
          case KycResultCode.BAD_QUALITY:
            return t("bad-quality");
          case KycResultCode.DAMAGED_DOCUMENT:
            return t("damaged-document");
          case KycResultCode.NOT_A_DOCUMENT:
            return t("not-a-document");
          default:
            return "Unknown KYC result code";
        }
      default:
        return "Unknown KYC status";
    }
  };

  return {
    status: status,
    description: getKycStatusDescription(),
  };
}
