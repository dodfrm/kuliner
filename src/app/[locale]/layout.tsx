import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Preloader from "@/components/Preloader";
import { ThemeProvider } from "@/components/theme-provider";
import { SpringMouseFollow } from "@/components/ui/skiper-ui/skiper61";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kuliner Nusantara",
  description: "Eksplorasi Kuliner Tradisional Indonesia",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate the incoming locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for the provider
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Preloader 
          variant="stairs" 
          position="fixed" 
          zIndex={9999}
          bgColor="#18181b"
          loadingText="Udah Makan Belum?" />
          <ThemeProvider attribute="class" enableSystem>
            {children}
            <SpringMouseFollow global />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
