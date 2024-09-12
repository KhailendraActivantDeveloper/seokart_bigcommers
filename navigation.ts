import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { locales, localePrefix, pathnames } from "./lungConfig";

export const { Link, getPathname, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
  localePrefix
});
