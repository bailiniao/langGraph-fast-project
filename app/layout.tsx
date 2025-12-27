import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "竹林编程 - 泼墨山水风格代码助手",
  description: "踏入竹林编程新境界，体验泼墨山水的代码之道",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="wuxia-paper-bg font-wuxia-body text-wuxia-base antialiased selection:bg-amber-200/30 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
