"use client";

import { useSignInMutation, useSignUpMutation } from "@/lib/redux/api/authApi";
import { useRouter } from "next/navigation";
import OtpForm from "../OtpForm";

export default function SignInForm() {
  const router = useRouter();

  const [signIn, { isLoading: isLoadingSubmit }] = useSignInMutation();
  const [signUp, { isLoading: isLoadingResend }] = useSignUpMutation();

  const handleResend = async (userEmail: string) => {
    await signUp({ username: userEmail }).unwrap();
  };

  const handleSubmit = async (userEmail: string, pin: string) => {
    await signIn({
      username: userEmail,
      otp: pin,
    }).unwrap();

    router.push("/card");
  };

  return (
    <OtpForm
      resend={handleResend}
      isLoadingResend={isLoadingResend}
      submit={handleSubmit}
      isLoadingSubmit={isLoadingSubmit}
    />
  );
}
