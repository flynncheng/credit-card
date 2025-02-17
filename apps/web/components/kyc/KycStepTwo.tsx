import { kycStepTwoFormSchema } from "@/validations/kycValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import useKycStatus, { KycStatus } from "@/hooks/kyc/useKycStatus";
import {
  useCreateKycDocumentMutation,
  useCreateKycMutation,
  useCreateKycRejectedMutation,
} from "@/lib/redux/api/kycApi";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  IdType,
  selectKycFormValues,
  setKycFormValues,
} from "@/lib/redux/slices/kycSlice";
import { ImageUploaderCallback } from "@/types/global";
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
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ImageUploader from "../ImageUploader";

export default function KycStepTwo({ step }: { step: number }) {
  const t = useTranslations("KycPage");
  const tForm = useTranslations("Form");
  const router = useRouter();

  const [createKycDocument, { isLoading: isLoadingCreateDocument }] =
    useCreateKycDocumentMutation();
  const [createKyc, { isLoading: isLoadingCreateKyc }] = useCreateKycMutation();
  const [createKycRejected, { isLoading: isLoadingCreateKycRejected }] =
    useCreateKycRejectedMutation();

  const dispatch = useAppDispatch();
  const formValues = useAppSelector(selectKycFormValues);
  const { status } = useKycStatus();

  const FormSchema = kycStepTwoFormSchema(tForm);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      idType: formValues.idType,
      imgOne: { data: "", name: "", size: 0 },
      imgTwo: { data: "", name: "", size: 0 },
    },
  });
  const idType = form.watch("idType");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { imgOne, imgTwo } = data;
    const documentBody = [
      {
        fileName: imgOne.name,
        fileData: imgOne.data.replace(/^data:image\/[a-zA-Z]+;base64,/, ""),
      },
      {
        fileName: imgTwo.name,
        fileData: imgTwo.data.replace(/^data:image\/[a-zA-Z]+;base64,/, ""),
      },
    ].filter((el) => el.fileName);

    try {
      // Submit documents
      const promises = documentBody.map((el) => createKycDocument(el).unwrap());
      const documentsRes = await Promise.all(promises);
      const idDocumentFrontUrl = documentsRes[0].data.url;
      const idDocumentBackUrl = documentsRes[1]?.data.url;

      // Update state
      dispatch(
        setKycFormValues({
          formValues: { idDocumentFrontUrl, idDocumentBackUrl },
        }),
      );

      // Submit as a whole
      const kycBody = {
        ...formValues,
        kycDocumentFrontUrl: idDocumentFrontUrl,
        kycDocumentBackUrl: idDocumentBackUrl,
      };
      if (status === KycStatus.REJECTED) {
        await createKycRejected(kycBody).unwrap();
      } else {
        await createKyc(kycBody).unwrap();
      }

      // Navigate to next step
      router.push(`?step=${++step}`);
    } catch (error) {
      console.log(error, "error");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader className="bg-gray-50 rounded-xl mb-6">
            <CardTitle>Upload</CardTitle>
            <CardDescription>
              Please click on the following section and upload the image(s) as
              required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormLabel>
              {idType === IdType.Passport ? "Passport" : "National ID"}
            </FormLabel>
            <FormField
              control={form.control}
              name="imgOne"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>
                    {idType === "Passport"
                      ? "Please upload the home page"
                      : "Please upload the front side"}
                  </FormDescription>
                  <FormControl>
                    <ImageUploader
                      placeholder={
                        idType === IdType.Passport
                          ? "/passport.png"
                          : "/id-front.png"
                      }
                      callback={(value: ImageUploaderCallback) => {
                        form.setValue(field.name, value);
                        form.clearErrors();
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {idType !== IdType.Passport && (
              <FormField
                control={form.control}
                name="imgTwo"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>
                      Please upload the back side
                    </FormDescription>
                    <FormControl>
                      <ImageUploader
                        placeholder="/id-back.png"
                        callback={(value: ImageUploaderCallback) => {
                          form.setValue(field.name, value);
                          form.clearErrors();
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>
        <CardFooter className="px-0">
          <Button
            className="w-full"
            disabled={
              isLoadingCreateDocument ||
              isLoadingCreateKyc ||
              isLoadingCreateKycRejected
            }
          >
            {(isLoadingCreateDocument ||
              isLoadingCreateKyc ||
              isLoadingCreateKycRejected) && (
              <Loader2 className="animate-spin" />
            )}
            Submit
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
