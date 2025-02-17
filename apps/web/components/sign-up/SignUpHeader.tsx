import { appConfig } from "@/app.config";
import { convertToTitleCase } from "@/utils/stringUtils";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SignUpHeader() {
  const t = useTranslations("SignUpPage");

  return (
    <div className="text-center">
      <Image
        className="mx-auto"
        src="/api/images/logo.png"
        alt="Logo"
        width={60}
        height={60}
        priority
      />
      <div className="text-gray-600">
        {convertToTitleCase(appConfig.client.name)}
      </div>
      <h1 className="text-gray-800 text-2xl font-bold sm:text-3xl mt-4">
        {t("title")}
      </h1>
    </div>
  );
}
