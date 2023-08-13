/* eslint-disable react-hooks/rules-of-hooks */
"use server";
import NavigationBar from "../components/navigationBar";
import WhiteboardList from "../components/whiteboardList";
import { NextAuthProvider } from "../providers/nextAuthProvider";

export default async function Home({ params: { lng } }: { params: any }) {
  return (
    <NextAuthProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <NavigationBar lng={lng}></NavigationBar>
        <WhiteboardList lng={lng}></WhiteboardList>
      </main>
    </NextAuthProvider>
  );
}
