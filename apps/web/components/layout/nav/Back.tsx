"use client";

import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  return (
    <Button className="h-8" variant="outline" onClick={() => router.back()}>
      <ArrowLeft />
    </Button>
  );
}
