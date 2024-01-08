"use client";

import React from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./popOver";
import { PiDotsThreeBold, PiTrash, PiPencil } from "react-icons/pi";
import { BoardClass } from "../models/board";
import { deleteBoardAction } from "../_action";
import { useTranslation } from "../i18n/client";
import Link from "next/link";

const ExistingBoard: React.FC<{
  lng: string;
  board: BoardClass;
}> = ({ lng, board }) => {
  const { t } = useTranslation(lng, "common");

  return (
    <Link href={"/whiteboards/" + board.id} locale={lng}>
      <div className="shadow-md rounded hover:ring-4 w-60 h-44 bg-white text-black flex flex-col font-semibold relative">
        <Image
          alt="thumbnail"
          priority={true}
          className="object-contain rounded-t w-full bg-trueGray-200 h-[7.5rem]"
          width={240}
          height={124}
          src={"data:image/png;base64," + board.thumbnail}
        />
        <div className="p-2 shadow-inner">
          <h3 className="text-sm">
            {board.title == "Untitled" ? t("untitled") : board.title}
          </h3>
          <p className="text-xs text-gray-600">
            {t("editedDate") + " " + board.lastModifiedTime.toLocaleString(lng)}
          </p>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute bottom-2 right-2"
        >
          <Popover dismissOutside={true} placement="top-end">
            <PopoverTrigger className="p-2 hover:bg-gray-300 rounded ">
              <PiDotsThreeBold size={24} />
            </PopoverTrigger>
            <PopoverContent className="Popover bg-white rounded flex flex-col shadow-md text-black w-32">
              <div className="flex flex-col text-sm py-1">
                <Link
                  href={lng + "/whiteboards/" + board.id}
                  className="px-4 py-2 text-left hover:bg-slate-200 flex items-center"
                >
                  <PiPencil className="pr-2" size={24} />
                  {t("edit")}
                </Link>
                <button
                  onClick={() => deleteBoardAction({ id: board.id, path: "/" })}
                  className="px-4 py-2 text-left hover:bg-slate-200 flex items-center"
                >
                  <PiTrash className="pr-2" size={24} />
                  {t("delete")}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Link>
  );
};

export default ExistingBoard;
