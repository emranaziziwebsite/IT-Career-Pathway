import type { Metadata } from "next";
import { Fredoka, Nunito, Vazirmatn } from "next/font/google";
import AppShell from "@/components/shared/AppShell";
import { LocaleProvider } from "@/i18n/LocaleContext";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "IT Career Pathway Explorer",
  description:
    "Choose an IT career and see a clear roadmap of everything to learn — languages, frameworks, tools, certifications, and projects.",
};

const setInitialLocaleScript = `
(function () {
  try {
    var locale = window.localStorage.getItem("itcpe:locale");
    if (locale === "fa") {
      document.documentElement.lang = "fa";
      document.documentElement.dir = "rtl";
    } else if (locale === "de") {
      document.documentElement.lang = "de";
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} ${vazirmatn.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialLocaleScript }} />
      </head>
      <body className="min-h-full">
        <LocaleProvider>
          <AppShell>{children}</AppShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
