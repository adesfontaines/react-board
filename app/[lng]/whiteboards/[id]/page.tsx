import { Metadata } from "next";
import Whiteboard from "./whiteboard";
import { getBoardByIdAction } from "@/app/_action";

export async function generateMetadata({
  params,
}: {
  params: { lng: string; id: string };
}): Promise<Metadata> {
  const result = await getBoardByIdAction({
    ownerId: "",
    id: params.id,
    path: "/",
  });

  return {
    title: result.board?.title + " - Next Whiteboard",
  };
}

export default function WhiteboardPage({
  params,
}: {
  params: { lng: string; id: string };
}) {
  return <Whiteboard params={params} />;
}
