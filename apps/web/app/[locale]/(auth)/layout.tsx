import { ReactNode } from "react";
import AuthLayout from "@/components/layout/AuthLayout";

type Props = {
  children: ReactNode;
};
export default async function Layout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}
