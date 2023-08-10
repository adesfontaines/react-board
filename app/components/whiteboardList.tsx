import Link from "next/link";
import React from "react";
import { PiDotsThreeBold, PiPlus } from "react-icons/pi";

const WhiteboardList: React.FC<{ lng: string; t: any }> = ({ lng, t }) => {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  return (
    <div className="flex-1 w-full bg-gray-100 flex justify-center">
      <div className="pt-8 grid content-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Link href={lng + "/whiteboard"}>
          <div className="rounded hover:ring-2 border-dashed w-56 h-44 border-2 text-gray-800 flex flex-col font-semibold justify-center items-center">
            <PiPlus size={64} />
            <h3 className="text-sm text-center">New Whiteboard</h3>
          </div>
        </Link>

        {items.map((item, index) => (
          <Link key={index} href={lng + "/whiteboard"}>
            <div className="shadow-md rounded-lg hover:ring-4 w-56 h-44 bg-white text-black flex flex-col font-semibold relative">
              <div className="rounded-t w-full bg-gray-300 h-40" />
              <div className="p-2 shadow-inner">
                <h3 className="text-sm">{item}</h3>
                <p className="text-xs text-gray-600">Edited: 9:12AM</p>
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
