import { appConfig } from "@/app.config";
import { Link } from "@/lib/i18n/routing";
import { Button } from "@workspace/ui/components/button";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import MainLayout from "./layout/MainLayout";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <MainLayout>
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-gray-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {t("description")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link href="/card">{t("back")}</Link>
            </Button>
            <Button asChild variant="ghost">
              <a href={`mailto:${appConfig.client.email?.toLowerCase()}`}>
                {t("support")} <MoveRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
