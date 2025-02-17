import { useTranslations } from "next-intl";

export default function SignInHeader() {
  const t = useTranslations("SignInPage");

  return (
    <h1 className="text-gray-800 text-2xl font-bold sm:text-3xl">
      {t("title")}
    </h1>
  );
}
