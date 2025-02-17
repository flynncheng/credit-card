import { Locale, routing, usePathname, useRouter } from "@/lib/i18n/routing";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const handleValueChange = (value: Locale) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value },
      );
    });
  };

  const getLabel = (param: string) => {
    switch (param) {
      case "en":
        return "🇺🇸 English";
      case "zh-CN":
        return "🇨🇳 简体中文";
      case "zh-TW":
        return "🇹🇼 繁體中文";
      case "ja":
        return "🇯🇵 日本語";
      case "de":
        return "🇩🇪 Deutsch";
      case "ru":
        return "🇷🇺 русский язык";
      case "es":
        return "🇪🇸 Castilian";
      case "pl":
        return "🇵🇱 polski";
      default:
        return "Unknown";
    }
  };

  return (
    <Select
      defaultValue={locale}
      onValueChange={handleValueChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a locale" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {routing.locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {getLabel(locale)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
