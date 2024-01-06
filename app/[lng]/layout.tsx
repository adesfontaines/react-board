import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dir } from "i18next";
import { NextAuthProvider } from "../providers/nextAuthProvider";
import Link from "next/link";
import { ImGithub } from "react-icons/im";
import NavigationBar from "../components/navigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whiteboard",
  description: "Next.js whiteboard app made by Antonin Desfontaines",
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <NextAuthProvider>
      <html lang={lng} dir={dir(lng)}>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>WhiteboardCanvas</title>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </NextAuthProvider>
  );
}
