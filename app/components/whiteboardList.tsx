/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React from "react";
import { PiDotsThreeBold, PiPlus } from "react-icons/pi";
import { getBoards } from "../lib/board-db";
import NewBoard from "./newBoard";

const WhiteboardList: React.FC<{ lng: string }> = async ({ lng }) => {
  const { boards, results } = await getBoards({ ownerId: "ABC-DEF-GHI" });

  return (
    <div className="flex-1 w-full bg-gray-100 flex justify-center">
      <div className="pt-8 grid content-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <NewBoard lng={lng} />
        {boards?.map((board, index) => (
          <Link key={index} href={lng + "/whiteboards/" + board.id}>
            <div className="shadow-md rounded-lg hover:ring-4 w-56 h-44 bg-white text-black flex flex-col font-semibold relative">
              <div className="rounded-t w-full bg-gray-300 h-40" />
              <div className="p-2 shadow-inner">
                <h3 className="text-sm">{board.title}</h3>
                <p className="text-xs text-gray-600">
                  Edited: {board.lastModifiedTime.toLocaleString(lng)}9:12AM
                </p>
              </div>
              <div className="absolute bottom-2 right-2">
                <button className="p-2 hover:bg-gray-300 rounded">
                  <PiDotsThreeBold size={24} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WhiteboardList;
