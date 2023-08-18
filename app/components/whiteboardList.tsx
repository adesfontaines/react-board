/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { getBoards } from "../lib/board-db";
import NewBoard from "./newBoard";
import ExistingBoard from "./existingBoard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
const WhiteboardList: React.FC<{ lng: string }> = async ({ lng }) => {
  const session: any = await getServerSession(authOptions);

  const { boards } = await getBoards({ ownerId: session?.user?.id });

  if (session?.user)
    return (
      <div className="flex-1 w-full bg-gray-100 p-8 flex justify-center">
        <div className="grid content-start justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <NewBoard user={session.user} lng={lng} />
          {boards?.map((board, index) => (
            <ExistingBoard key={index} lng={lng} board={board} />
          ))}
        </div>
      </div>
    );
  else return "CONNECTEZ VOUS POUR COMMENCER";
};

export default WhiteboardList;
