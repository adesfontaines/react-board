/* eslint-disable react-hooks/rules-of-hooks */
"use server";
import LocalePicker from "../components/localePicker";
import NavigationBar from "../components/navigationBar";
import WhiteboardList from "../components/whiteboardList";
import { NextAuthProvider } from "../providers/nextAuthProvider";
import Link from "next/link";

export default async function Home({ params: { lng } }: { params: any }) {
  return (
    <NextAuthProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <NavigationBar
          childleft={
            <Link href={"/" + lng}>
              <h2>Whiteboard</h2>
            </Link>
          }
          lng={lng}
        ></NavigationBar>
        <WhiteboardList lng={lng}></WhiteboardList>
        <LocalePicker lng={lng} />
      </main>
    </NextAuthProvider>
  );
}
