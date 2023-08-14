"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { PiPlus } from "react-icons/pi";
import { useTranslation } from "../i18n/client";
import { User } from "next-auth";
import { createBoardAction } from "../_action";

const NewBoard: React.FC<{ lng: string; user: User }> = ({ lng, user }) => {
  const router = useRouter();
  const { t } = useTranslation(lng, "common");

  function createAndOpenWhiteboard(): void {
    createBoardAction({ title: "Untitled", ownerId: user.id, path: "/" }).then(
      (data) => {
        if (data.board) router.push("./whiteboards/" + data.board._id);
      }
    );
  }
  return (
    <button onClick={() => createAndOpenWhiteboard()}>
      <div className="rounded hover:ring-2 border-dashed w-60 h-44 border-2 text-gray-800 flex flex-col font-semibold justify-center items-center">
        <PiPlus size={64} />
        <h3 className="text-sm text-center">{t("newDashboard")}</h3>
      </div>
    </button>
  );
};

export default NewBoard;
