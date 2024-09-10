import type { Metadata } from "next"
import { Inter } from "next/font/google"
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

const inter = Inter({
  subsets: [],
  weight: ["400", "500", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "SEOKart",
  description: "SEOKart",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
