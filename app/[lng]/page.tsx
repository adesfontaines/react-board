/* eslint-disable react-hooks/rules-of-hooks */
"use server";
import LocalePicker from "../components/localePicker";
import NavigationBar from "../components/navigationBar";
import WhiteboardList from "../components/whiteboardList";
import { NextAuthProvider } from "../providers/nextAuthProvider";
import { ImGithub } from "react-icons/im";
import Link from "next/link";

export default async function Home({ params: { lng } }: { params: any }) {
  return (
    <NextAuthProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
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
        <WhiteboardList lng={lng}></WhiteboardList>
        <LocalePicker lng={lng} />
      </main>
    </NextAuthProvider>
  );
}
