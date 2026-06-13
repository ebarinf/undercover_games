import type { Metadata } from "next";
import { Special_Elite, Cutive_Mono } from "next/font/google";
import "./globals.css";

const specialElite = Special_Elite({
  weight: "400",
  variable: "--font-special-elite",
  subsets: ["latin"],
});

const cutiveMono = Cutive_Mono({
  weight: "400",
  variable: "--font-cutive-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Huário Party Games",
  description: "Juegos de fiesta multiplayer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${specialElite.variable} ${cutiveMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
