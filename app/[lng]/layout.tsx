import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dir } from "i18next";
import { NextAuthProvider } from "../providers/nextAuthProvider";
import { ImGithub } from "react-icons/im";
import NavigationBar from "../components/navigationBar";
import NextTopLoader from "nextjs-toploader";
import Link from "next/link";
import Head from "next/head";
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
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>WhiteboardCanvas</title>
        </Head>
        <body className={inter.className}>
          <NavigationBar
            childleft={
              <Link href={"/"} locale={lng}>
                <h2>Whiteboard</h2>
              </Link>
            }
            lng={lng}
            childright={
              <a
                href="https://github.com/adesfontaines/react-board"
                target="_blank"
                className="flex text-white px-3 py-3 hover:bg-stone-800"
              >
                <ImGithub className="mr-2" size={24} />
                GitHub
              </a>
            }
          ></NavigationBar>
          <NextTopLoader
            color="#5796fa"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          {children}
        </body>
      </html>
    </NextAuthProvider>
  );
}
