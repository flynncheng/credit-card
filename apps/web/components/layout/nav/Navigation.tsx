"use client";

import { usePathname } from "@/lib/i18n/routing";
import ContactUs from "./CountactUs";
import LocaleSwitcher from "./LocaleSwitcher";
import SignOut from "./SignOut";
import Back from "./Back";

export default function Navigation() {
  const pathname = usePathname();

  const hideBackPaths = ["/sign-up", "/card", "/card/home"];
  const hideBack = hideBackPaths.some((path) => path === pathname);

  return (
    <nav className="container mx-auto sm:px-[10%]">
      <div className="flex justify-between items-center px-4 py-2 shadow-sm">
        <ContactUs />
        {pathname.includes("/sign") ? <LocaleSwitcher /> : <SignOut />}
      </div>
      {!hideBack && (
        <div className="mt-4 ml-4">
          <Back />
        </div>
      )}
    </nav>
  );
}
