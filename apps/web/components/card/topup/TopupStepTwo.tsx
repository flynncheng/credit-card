import { preventInvalidNumberKeys } from "@/utils/formUntils";
import { cardTopupStepTwoFormSchema } from "@/validations/cardValidation";
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
import { AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  selectCardItem,
  selectCardTopup,
  setCardTopup,
} from "@/lib/redux/slices/cardSlice";
import { useCreateCardTopupMutation } from "@/lib/redux/api/cardApi";

export default function TopupStepTwo({ step }: { step: number }) {
  // const t = useTranslations("CardApplyPage");
  const tForm = useTranslations("Form");
  const router = useRouter();

  const [createCardTopup, { isLoading }] = useCreateCardTopupMutation();

  const topup = useAppSelector(selectCardTopup);
  const cardItem = useAppSelector(selectCardItem);
  const dispatch = useAppDispatch();

  const FormSchema = cardTopupStepTwoFormSchema(tForm);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: topup,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, "data...");

    const { amountReceive, amountPay, fee, currencyPay } = topup;
    const body = {
      rechargeAmount: amountReceive,
      rechargeAmountPay: amountPay,
      rechargeFee: fee,
      rechargePayCurrency: currencyPay,
      exchangeRate: 1,
    };
    createCardTopup({ cardId: cardItem.id, body });

    dispatch(
      setCardTopup({
        topup: {
          currencyPay: data.currencyPay,
        },
      }),
    );

    if (!isLoading) router.push(`?step=${++step}`);
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
            <CardTitle>Choose the token you want to pay</CardTitle>
            <CardDescription>
              Select the token you&apos;d like to use for payment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="my-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You will pay 20.6 USDT to topup 20 USD to your card.
              </AlertDescription>
            </Alert>
            <div className="flex">
              <FormField
                control={form.control}
                name="currencyPay"
                render={({ field }) => (
                  <FormItem className="max-w-[50%]">
                    <FormLabel
                      className={`${form.formState.errors.amountPay && "text-red-500"
                        }`}
                    >
                      Pay
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="rounded-none rounded-l-lg">
                          <SelectValue placeholder="Token" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="USDT-ERC20">USDT-ERC20</SelectItem>
                          <SelectItem value="USDC-ERC20">USDC-ERC20</SelectItem>
                          <SelectItem value="USDT-TRC20">USDT-TRC20</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amountPay"
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
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex">
              <FormField
                control={form.control}
                name="currencyReceive"
                render={({ field }) => (
                  <FormItem className="min-w-[36%]">
                    <FormLabel
                      className={`${form.formState.errors.amountReceive && "text-red-500"
                        }`}
                    >
                      Receive
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
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amountReceive"
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
                        disabled
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
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Continue
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
