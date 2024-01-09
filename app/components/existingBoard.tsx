"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./popOver";
import { PiDotsThreeBold, PiTrash, PiPencil, PiTextbox } from "react-icons/pi";
import { BoardClass } from "../models/board";
import { deleteBoardAction, updateBoardAction } from "../_action";
import { useTranslation } from "../i18n/client";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeading,
} from "./dialog";

const ExistingBoard: React.FC<{
  lng: string;
  board: BoardClass;
}> = ({ lng, board }) => {
  const { t } = useTranslation(lng, "common");
  const [boardTitle, setBoardTitle] = useState(board.title);

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
          <Popover
            open={isActionMenuOpen}
            onOpenChange={setIsActionMenuOpen}
            dismissOutside={true}
            placement="top-end"
          >
            <PopoverTrigger
              onClick={() => setIsActionMenuOpen((v) => !v)}
              className="p-2 hover:bg-gray-300 rounded "
            >
              <PiDotsThreeBold size={24} />
            </PopoverTrigger>
            <PopoverContent className="Popover bg-white rounded flex flex-col shadow-md text-black w-32">
              <div className="flex flex-col text-sm py-1">
                <Link
                  aria-disabled={!isActionMenuOpen}
                  href={lng + "/whiteboards/" + board.id}
                  className={
                    !isActionMenuOpen
                      ? "pointer-events-none"
                      : "px-4 py-2 text-left hover:bg-slate-200 flex items-center"
                  }
                >
                  <PiPencil className="pr-2" size={24} />
                  {t("edit")}
                </Link>
                <button
                  onClick={() => {
                    setIsDialogOpen(true);
                    setIsActionMenuOpen(false);
                  }}
                  className="px-4 py-2 text-left hover:bg-slate-200 flex items-center"
                >
                  <PiTextbox className="pr-2" size={24} />
                  {t("rename")}
                </button>

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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="Dialog shadow-md">
              <DialogHeading>{t("renameBoard")}</DialogHeading>
              <DialogDescription>
                <input
                  type="text"
                  className="min-w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  maxLength={64}
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.currentTarget.value)}
                ></input>
                <div className="pt-3 flex flex-row-reverse space-x-4 space-x-reverse">
                  <DialogClose
                    className="block border border-black text-black hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-3 py-2 text-center"
                    type="button"
                  >
                    {t("close")}
                  </DialogClose>
                  <button
                    disabled={boardTitle.length == 0}
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-200 font-medium rounded text-sm px-3 py- text-center"
                    onClick={() =>
                      updateBoardAction(
                        board.id,
                        { title: boardTitle },
                        "",
                        "/"
                      ).then(() => setIsDialogOpen(false))
                    }
                    type="button"
                  >
                    {t("rename")}
                  </button>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Link>
  );
};

export default ExistingBoard;
