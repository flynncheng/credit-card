"use client";

import { useSignUpMutation } from "@/lib/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectUserEmail, setUserEmail } from "@/lib/redux/slices/authSlice";
import { signUpFormSchema } from "@/validations/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { toast } from "@workspace/ui/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignupForm() {
  const t = useTranslations("SignUpPage");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const router = useRouter();

  const [signUp, { isLoading }] = useSignUpMutation();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(selectUserEmail);

  const FormSchema = signUpFormSchema(t);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userEmail: userEmail,
      agreement: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { agreement, userEmail } = data;

    if (!agreement) {
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 3000);
      return;
    }

    dispatch(setUserEmail({ userEmail }));
    await signUp({ username: userEmail });
    toast({
      title: "Verification code has been sent to your email:",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{data.userEmail}</code>
        </pre>
      ),
    });

    router.push("/sign-in");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <TooltipProvider>
                <Tooltip open={tooltipOpen}>
                  <TooltipTrigger asChild>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t("checkbox-invalid")}
                    <TooltipArrow />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormLabel className="leading-none">
                {t.rich("disclaimer", {
                  terms: (chunks) => (
                    <Link
                      target="_blank"
                      href={`/terms.html?client=${process.env.NEXT_PUBLIC_CLIENT}`}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      {chunks}
                    </Link>
                  ),
                  privacy: (chunks) => (
                    <Link
                      target="_blank"
                      href={`/privacy.html?client=${process.env.NEXT_PUBLIC_CLIENT}&emailDomain=${process.env.NEXT_PUBLIC_SUPPORT?.split("@")[1]}`}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </FormLabel>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          {t("proceed")}
        </Button>
      </form>
    </Form>
  );
}
