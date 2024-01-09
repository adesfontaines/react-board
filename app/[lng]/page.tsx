/* eslint-disable react-hooks/rules-of-hooks */
"use server";
import LocalePicker from "../components/localePicker";
import WhiteboardList from "../components/whiteboardList";

export async function generateMetadata({ params }) {
  return {
    title: "Next Whiteboard",
  };
}
export default async function Home({ params: { lng } }: { params: any }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <WhiteboardList lng={lng}></WhiteboardList>
      <LocalePicker lng={lng} />
    </main>
  );
}
