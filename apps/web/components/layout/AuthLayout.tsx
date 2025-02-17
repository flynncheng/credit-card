import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main
      className="w-full flex flex-col justify-center p-6 pb-12 space-y-6 max-w-md mx-auto"
      style={{ height: "calc(100vh - 11rem)" }}
    >
      {children}
    </main>
  );
}
