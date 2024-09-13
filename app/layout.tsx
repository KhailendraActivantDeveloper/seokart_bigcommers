import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LocaleProvider } from "@/context/LocaleContext";

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
