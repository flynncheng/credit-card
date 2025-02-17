import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

const locales = ["en", "zh-CN", "zh-TW", "ja", "de", "ru", "es", "pl"] as const;

export const routing = defineRouting({
  locales: locales,
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
