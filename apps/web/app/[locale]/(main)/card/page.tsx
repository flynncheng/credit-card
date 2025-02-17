"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import { appConfig } from "@/app.config";
import { useReadCardListQuery } from "@/lib/redux/api/cardApi";
import { redirect } from "next/navigation";

export default function Card() {
  const { data, isLoading } = useReadCardListQuery(appConfig.provider.card);

  if (isLoading) return <LoadingOverlay />;

  if (data?.data.cards.length > 0) {
    redirect("/card/home");
  } else {
    redirect("/card/apply");
  }
}
