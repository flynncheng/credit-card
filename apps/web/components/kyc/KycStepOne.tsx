import { kycStepOneFormSchema } from "@/validations/kycValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { nationalityListAlpha3 } from "@/constants/nationality";
import {
  useCreateKycFormValuesMutation,
  useReadKycFormValuesQuery,
  useUpdateKycFormValuesMutation,
} from "@/lib/redux/api/kycApi";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  selectKycFormValues,
  setKycFormValues,
} from "@/lib/redux/slices/kycSlice";
import { getDateYearsAgo } from "@/utils/dateUtils";
import { flattenObject } from "@/utils/objectUtils";
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
  FormDescription,
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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function KycStepOne({ step }: { step: number }) {
  const t = useTranslations("KycPage");
  const tForm = useTranslations("Form");
  const router = useRouter();

  const { data: formValuesRes } = useReadKycFormValuesQuery("KYC-000");
  const [createKycFormValues, { isLoading: isLoadingCreateFormValues }] =
    useCreateKycFormValuesMutation();
  const [updateKycFormValues, { isLoading: isLoadingUpdateFormValues }] =
    useUpdateKycFormValuesMutation();

  const dispatch = useAppDispatch();
  const formValues = useAppSelector(selectKycFormValues);

  const FormSchema = kycStepOneFormSchema(tForm);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const {
      firstName,
      lastName,
      dateOfBirth,
      addressLine1,
      addressLine2,
      city,
      country,
      idType,
      idNumber,
      nationality,
    } = data;

    const body = {
      personalInformation: {
        firstName,
        lastName,
        dateOfBirth,
      },
      residentialInformation: { addressLine1, addressLine2, city, country },
      identityInformation: {
        idNumber,
        idType,
        nationality,
      },
      kycProvider: "KYC-000",
    };

    try {
      // Submit
      if (formValuesRes) {
        await updateKycFormValues(body).unwrap();
      } else {
        await createKycFormValues(body).unwrap();
      }

      // Update state
      dispatch(setKycFormValues({ formValues: flattenObject(body) }));

      // Navigate to next step
      router.push(`?step=${++step}`);
    } catch (error) {
      console.log(error, "error");
    }
  }

  useEffect(() => {
    // Pre-filling forms
    if (formValuesRes) form.reset(flattenObject(formValuesRes.data));
  }, [formValuesRes, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* Personal Information */}
        <Card>
          <CardHeader className="bg-gray-50 rounded-xl mb-6">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Use a permanent address where you can receive mail.
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
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      className="w-1/2 block"
                      type="date"
                      min={getDateYearsAgo(65).toISOString().split("T")[0]}
                      max={getDateYearsAgo(18).toISOString().split("T")[0]}
                      {...field}
                    />
                  </FormControl>
                  {!form.formState.errors.dateOfBirth && (
                    <FormDescription>
                      You must be between 18 and 65 years old to proceed!
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        {/* Nationality */}
        <Card>
          <CardHeader className="bg-gray-50 rounded-xl mb-6">
            <CardTitle>Nationality</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality (on the ID document)</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nationalityListAlpha3.map((el) => (
                        <SelectItem key={el.value} value={el.value}>
                          {el.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The country listed on the ID document must be the same as
                    the natioinality country.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        {/* Residential Address */}
        <Card>
          <CardHeader className="bg-gray-50 rounded-xl mb-6">
            <CardTitle>Residential Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nationalityListAlpha3.map((el) => (
                        <SelectItem key={el.value} value={el.value}>
                          {el.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        {/* Identity Information */}
        <Card>
          <CardHeader className="bg-gray-50 rounded-xl mb-6">
            <CardTitle>Identity Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="idType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identity Type</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NationalID">{t("id-card")}</SelectItem>
                      <SelectItem value="Passport">{t("passport")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identity Number</FormLabel>
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
          <Button
            className="w-full"
            type="submit"
            disabled={isLoadingCreateFormValues || isLoadingUpdateFormValues}
          >
            {(isLoadingCreateFormValues || isLoadingUpdateFormValues) && (
              <Loader2 className="animate-spin" />
            )}
            Submit
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
