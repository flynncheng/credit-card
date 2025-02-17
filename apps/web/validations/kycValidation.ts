import { useTranslations } from "next-intl";
import { z } from "zod";
import { getDateYearsAgo } from "@/utils/dateUtils";

export const kycStepOneFormSchema = (t: ReturnType<typeof useTranslations>) => {
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
    dateOfBirth: z
      .string()
      .min(1, t("error-required"))
      .refine(
        (dateStr) => {
          const date = new Date(Date.parse(dateStr));
          const minAgeDate = getDateYearsAgo(65);
          const maxAgeDate = getDateYearsAgo(18);
          return date >= minAgeDate && date <= maxAgeDate;
        },
        { message: t("error-dateOfBirth") },
      ),
    nationality: z.string().min(1, t("error-required")),
    addressLine1: z
      .string()
      .trim()
      .min(1, t("error-required"))
      .regex(/^[a-zA-Z0-9\s,'.#-]+$/, {
        message: t("error-addressLine1"),
      }),
    addressLine2: z
      .string()
      .trim()
      .min(1, t("error-required"))
      .regex(/^[a-zA-Z0-9\s,'.#-]+$/, {
        message: t("error-addressLine2"),
      }),
    city: z
      .string()
      .trim()
      .min(1, t("error-required"))
      .regex(/^[a-zA-Z\s'-]+$/, {
        message: t("error-city"),
      }),
    country: z.string().min(1, t("error-required")),
    idType: z.string().min(1, t("error-required")),
    idNumber: z
      .string()
      .trim()
      .min(1, t("error-required"))
      .regex(/^(?!-)[a-zA-Z0-9-]+$/, {
        message: t("error-idNumber"),
      }),
    idDocumentFrontUrl: z.string(),
    idDocumentBackUrl: z.string(),
  });
};

export const kycStepTwoFormSchema = (t: ReturnType<typeof useTranslations>) => {
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
  return z
    .object({
      idType: z.enum(["NationalID", "Passport", ""]),
      imgOne: z
        .object({
          data: z.string(),
          name: z.string(),
          size: z.number(),
        })
        .refine((obj) => obj.data, {
          message: "Please click the section above to upload",
        })
        .refine((obj) => obj.size < MAX_IMAGE_SIZE, {
          message: "The size of the image above must be less than 5MB",
        }),
      imgTwo: z.object({
        data: z.string(),
        name: z.string(),
        size: z.number(),
      }),
    })
    .refine(
      (data) => {
        if (data.idType !== "Passport") {
          return !!data.imgTwo.data;
        }
        return true;
      },
      {
        message: "Please click the section above to upload",
        path: ["imgTwo"],
      },
    )
    .refine(
      (data) => {
        if (data.idType !== "Passport") {
          return data.imgTwo.size < MAX_IMAGE_SIZE;
        }
        return true;
      },
      {
        message: "The size of the image above must be less than 5MB",
        path: ["imgTwo"],
      },
    );
};
