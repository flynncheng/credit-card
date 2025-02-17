import React from "react";
import SignUpHeader from "./SignUpHeader";
import SignupForm from "./SignUpForm";

export default function SignUpTemplate() {
  return (
    <div className="space-y-12 pb-12">
      <SignUpHeader />
      <SignupForm />
    </div>
  );
}
