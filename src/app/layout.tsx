import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Live Score",
  description: "Live football scores from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable}`}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
