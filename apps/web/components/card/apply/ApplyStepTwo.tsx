import { cardApplyStepTwoFormSchema } from "@/validations/cardValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { phoneAreaList } from "@/constants/phoneArea";
import { preventInvalidNumberKeys } from "@/utils/formUntils";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

export default function ApplyStepTwo({ step }: { step: number }) {
  // const t = useTranslations("CardApplyPage");
  const tForm = useTranslations("Form");
  const router = useRouter();

  const FormSchema = cardApplyStepTwoFormSchema(tForm);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      areaCode: "",
      phone: "",
      currency: "USDT-ERC20",
      amount: "",
      voucherCode: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, "data...");
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
            <CardTitle>Please enter your information</CardTitle>
            <CardDescription>
              Ensure all information is accurate and up to date.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <FormField
                control={form.control}
                name="areaCode"
                render={({ field }) => (
                  <FormItem className="max-w-[50%]">
                    <FormLabel
                      className={`${form.formState.errors.phone && "text-red-500"
                        }`}
                    >
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="rounded-none rounded-l-lg">
                          <SelectValue placeholder="Area code" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {phoneAreaList.map((el) => (
                            <SelectItem
                              key={el.label + el.value}
                              value={el.value}
                            >
                              {el.label} ({el.value})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="pr-4" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="invisible">Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-none rounded-r-lg border-l-0"
                        type="number"
                        inputMode="numeric"
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
                You need to pay a 19 USDT application fee and 20 USDT topup
                amount (plus 3% topup fee) to obtain your card
              </AlertDescription>
            </Alert>
            <div className="flex">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="max-w-[50%]">
                    <FormLabel
                      className={`${form.formState.errors.phone && "text-red-500"
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
                          <SelectItem value="USDT-TRC20">USDT-TRC20</SelectItem>
                          <SelectItem value="USDT-ERC20">USDT-ERC20</SelectItem>
                          <SelectItem value="USDC-ERC20">USDC-ERC20</SelectItem>
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
            <FormField
              control={form.control}
              name="voucherCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add voucher code</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <CardFooter className="px-0">
          <Button className="w-full">Continue</Button>
        </CardFooter>
      </form>
    </Form>
  );
}
