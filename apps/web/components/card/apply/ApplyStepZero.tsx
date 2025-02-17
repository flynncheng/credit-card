"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useKycStatus, { KycStatus } from "@/hooks/kyc/useKycStatus";
import { cardApplyStepZeroFormSchema } from "@/validations/cardValidation";
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InfoGrid from "./ApplyStepZeroInfoGrid";
import RiskReminder from "./ApplyStepZeroRiskReminder";

export default function ApplyStepZero({ step }: { step: number }) {
  const t = useTranslations("CardApplyPage");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const router = useRouter();

  const { status } = useKycStatus();

  const FormSchema = cardApplyStepZeroFormSchema(t);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "virtual-visa",
      reminder: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { reminder } = data;

    if (!reminder) {
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 3000);
      return;
    }

    const href = status === KycStatus.PASSED ? `?step=${++step}` : "/kyc";
    router.push(href);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Virtual Card</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-start">
                    <FormLabel className="font-normal w-full space-y-2 p-4 cursor-pointer rounded-lg border bg-white shadow-sm ring-gray-600 has-[:checked]:ring-2 duration-200">
                      <FormControl>
                        <RadioGroupItem
                          className="hidden"
                          value="virtual-visa"
                        />
                      </FormControl>
                      <div className="flex justify-between">
                        Premium Virtual Visa Card
                        <span>G pay A pay</span>
                      </div>
                      <Image
                        src="/api/images/card.png"
                        width={680}
                        height={428}
                        alt="Card category"
                        priority={true}
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <InfoGrid />
        {status === KycStatus.PASSED && (
          <>
            <FormField
              control={form.control}
              name="reminder"
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
                  <FormLabel className="leading-none text-xs">
                    I have read and agree to <RiskReminder /> when use the
                    prepaid card.
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Continue
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
