import { preventInvalidNumberKeys } from "@/utils/formUntils";
import { cardTopupStepOneFormSchema } from "@/validations/cardValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectCardTopup, setCardTopup } from "@/lib/redux/slices/cardSlice";
import { appConfig } from "@/app.config";

export default function TopupStepOne({ step }: { step: number }) {
  // const t = useTranslations("CardApplyPage");
  const tForm = useTranslations("Form");
  const router = useRouter();

  const topup = useAppSelector(selectCardTopup);
  const dispatch = useAppDispatch();

  const FormSchema = cardTopupStepOneFormSchema(tForm);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currency: "USDT/USDC",
      amount: topup.amountReceive,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(
      setCardTopup({
        topup: {
          amountReceive: data.amount,
          amountPay: data.amount * (1 + appConfig.app.topupFee),
        },
      }),
    );

    router.push(`?step=${++step}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <Card>
          <CardHeader className="bg-gray-50 rounded-xl mb-6">
            <CardTitle>Please enter the topup amount</CardTitle>
            <CardDescription>
              Enter the amount for the top-up transaction.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="my-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                A minimum of 20 USDT / USDC is required to topup your card.
              </AlertDescription>
            </Alert>
            <div className="flex">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="max-w-[50%]">
                    <FormLabel
                      className={`${form.formState.errors.amount && "text-red-500"
                        }`}
                    >
                      Topup amount
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled
                      >
                        <SelectTrigger className="rounded-none rounded-l-lg">
                          <SelectValue placeholder="Token" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="USDT/USDC">USDT / USDC</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="invisible">Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-none rounded-r-lg border-l-0"
                        type="number"
                        inputMode="decimal"
                        placeholder=""
                        onKeyDown={preventInvalidNumberKeys}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <CardFooter className="px-0">
          <Button className="w-full">Continue</Button>
        </CardFooter>
      </form>
    </Form>
  );
}
