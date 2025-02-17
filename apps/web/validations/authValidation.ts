import { z } from "zod";
import { useTranslations } from "next-intl";

export const signUpFormSchema = (t: ReturnType<typeof useTranslations>) => {
  return z.object({
    userEmail: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    agreement: z.boolean().default(false).optional(),
  });
};

export const signInFormSchema = (t: ReturnType<typeof useTranslations>) => {
  return z.object({
    pin: z.string().min(6, {
      message: "Your verification code must be 6 characters.",
    }),
  });
};
