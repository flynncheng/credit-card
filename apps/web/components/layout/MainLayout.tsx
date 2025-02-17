"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import {
  selectIsAuthenticated,
  selectIsSessionActive,
} from "@/lib/redux/slices/authSlice";
import SignInRequired from "../SignInRequired";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isSessionActive = useAppSelector(selectIsSessionActive);

  if (isAuthenticated && isSessionActive) {
    return (
      <main className="w-full flex flex-col px-6 pb-12 max-w-md mx-auto">
        {children}
      </main>
    );
  }

  return (
    <SignInRequired
      isAuthenticated={isAuthenticated}
      isSessionActive={isSessionActive}
    />
  );
}
