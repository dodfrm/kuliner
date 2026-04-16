import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jelajahi Dunia Kuliner",
  description: "Discover amazing recipes and culinary experiences. Click the menu button in the top right to explore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="h-dvh flex flex-col">{children}</body>
    </html>
  );
}
