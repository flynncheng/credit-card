"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAppSelector } from "@/lib/redux/hooks";
import { selectUserEmail } from "@/lib/redux/slices/authSlice";
import { OtpFormProps } from "@/types/global";
import { signInFormSchema } from "@/validations/authValidation";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp";
import { toast } from "@workspace/ui/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const countdownDefault = 10;

export default function OtpForm({
  resend,
  isLoadingResend,
  submit,
  isLoadingSubmit,
}: OtpFormProps) {
  const t = useTranslations("SignInPage");
  const [countdown, setCountdown] = useState<number>(countdownDefault);
  const router = useRouter();

  const userEmail = useAppSelector(selectUserEmail);

  const FormSchema = signInFormSchema(t);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { pin } = data;
    try {
      submit(userEmail, pin);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "The verification code is not correct, please re-enter!",
      });
    }
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await resend(userEmail);
    setCountdown(countdownDefault);
    toast({
      title: "Verification code has been sent to your email:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{userEmail}</code>
        </pre>
      ),
    });
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (!userEmail) router.push("/sign-up");
  }, [userEmail, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormDescription>{t("description")}</FormDescription>
              <FormLabel>{userEmail}</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="w-full">
                    <InputOTPSlot className="grow h-14" index={0} />
                    <InputOTPSlot className="grow h-14" index={1} />
                    <InputOTPSlot className="grow h-14" index={2} />
                    <InputOTPSlot className="grow h-14" index={3} />
                    <InputOTPSlot className="grow h-14" index={4} />
                    <InputOTPSlot className="grow h-14" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
              <FormDescription className="text-right">
                {t("not-received")}?
                <Button
                  className="ml-2 h-8 px-2 text-[0.8rem] gap-1"
                  variant="secondary"
                  disabled={countdown !== 0}
                  onClick={handleClick}
                >
                  {t("resend")}
                  {countdown !== 0 && (
                    <span className="w-7">{`(${countdown}s)`}</span>
                  )}
                  {isLoadingResend && <Loader2 className="animate-spin" />}
                </Button>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoadingSubmit}>
          {isLoadingSubmit && <Loader2 className="animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
