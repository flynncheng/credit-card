import { useTranslations } from "next-intl";
import { z } from "zod";
import { appConfig } from "@/app.config";

export const cardApplyStepZeroFormSchema = (
  t: ReturnType<typeof useTranslations>,
) => {
  return z.object({
    type: z.enum(["virtual-visa", "none"], {
      required_error: "You need to select a notification type.",
    }),
    reminder: z.boolean().default(false).optional(),
  });
};

export const cardApplyStepTwoFormSchema = (
  t: ReturnType<typeof useTranslations>,
) => {
  return z.object({
    firstName: z
      .string()
      .trim()
      .min(1, t("error-required"))
      .regex(/^[a-zA-Z' -]+$/, { message: t("error-firstName") }),
    lastName: z
      .string()
      .trim()
      .min(1, t("error-required"))
      .regex(/^[a-zA-Z' -]+$/, { message: t("error-lasttName") }),
    areaCode: z.string().min(1, t("error-required")),
    phone: z
      .string()
      .trim()
      .min(1, t("error-required"))
      .regex(/^[0-9]{1,20}$/, { message: t("error-phone") }),
    currency: z.string().min(1, t("error-required")),
    amount: z.string().trim().min(1, t("error-required")),
  });
};

export const cardTopupStepOneFormSchema = (
  t: ReturnType<typeof useTranslations>,
) => {
  const topupMin = appConfig.app.topupMin;

  return z.object({
    currency: z.string(),
    amount: z.coerce
      .number()
      .min(topupMin, t("error-topup-min", { min: topupMin })),
  });
};

export const cardTopupStepTwoFormSchema = (
  t: ReturnType<typeof useTranslations>,
) => {
  const topupMin = appConfig.app.topupMin;

  return z.object({
    currencyPay: z.enum(["USDT-ERC20", "USDC-ERC20", "USDT-TRC20"]),
    currencyReceive: z.enum(["USD"]),
    amountPay: z.coerce.number(),
    amountReceive: z.coerce
      .number()
      .min(topupMin, t("error-topup-min", { min: topupMin })),
  });
};
