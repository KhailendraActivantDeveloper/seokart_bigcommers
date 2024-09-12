import { LocalePrefix, Pathnames } from "next-intl/routing"
export const locales = ["en", "es", "fr", "cn", "de", "it", "ja", "pt", "ru", "tw"] as const;

export type Locales = typeof locales;

export const pathnames: Pathnames<Locales> = {
    "/": "/", 
    "/dashboard":"dashboard",
    "/page-speed":"page-speed",
    "/analytics": "analytics",
    "/bulk-optimizer": "bulk-optimizer",
    "/help": "help",
    "/seo-audit": "seo-audit",
    "/invoices": "invoices",
    "/upgrade": "upgrade",
    "/url-editor": "url-editor",
    "/rich-snippets": "rich-snippets",
    "/rank-tracker": "rank-tracker",
    "/image-optimizer-setting": "image-optimizer-setting",
    "/image-optimizer": "image-optimizer"
}

export const localePrefix: LocalePrefix<Locales> = "always"