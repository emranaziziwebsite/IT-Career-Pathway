import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import AppShell from "@/components/shared/AppShell";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT Career Pathway Explorer",
  description:
    "Choose an IT career and see exactly what to learn — languages, frameworks, tools, certifications, and projects — as an interactive skill-tree pathway.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
