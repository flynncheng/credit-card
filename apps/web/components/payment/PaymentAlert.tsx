import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@workspace/ui/components/alert";
import { AlertCircle } from "lucide-react";
import React from "react";

export default function PaymentAlert() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Warnning!</AlertTitle>
      <AlertDescription>
        You must pay the exact order amount shown below. If you pay any less
        than the amount, you will lose your tokens. We are not responsible for
        any tokens that you lose.
      </AlertDescription>
    </Alert>
  );
}
