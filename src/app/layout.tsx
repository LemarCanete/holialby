import type { Metadata } from "next";
import "./globals.css";
import { GoogleTranslate } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Holialby — האירוע שלך, נשמר ביופי מושלם",
  description: "העלו תמונות מהאירוע וקבלו אלבום מודפס מעוצב ע״י AI עם פריסות מותאמות, כיתובים וברכות דתיות.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <GoogleTranslate />
        {children}
      </body>
    </html>
  );
}
