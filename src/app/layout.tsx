import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AirLink - 空気のように軽いSNS",
  description: "特定のコミュニティや個人が自分たちのルールで運用できる、超高速・低コストなサーバーレスSNS",
  keywords: ["SNS", "ソーシャルネットワーク", "コミュニティ", "サーバーレス", "分散型"],
  authors: [{ name: "AirLink Team" }],
  openGraph: {
    title: "AirLink - 空気のように軽いSNS",
    description: "自分たちだけの「色」を付けられる場所",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "AirLink",
    description: "空気のように軽く、自分たちだけの「色」を付けられる場所",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
