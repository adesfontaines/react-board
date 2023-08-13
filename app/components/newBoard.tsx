"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { PiPlus } from "react-icons/pi";
import { useTranslation } from "../i18n/client";

const NewBoard: React.FC<{ lng: string }> = ({ lng }) => {
  const router = useRouter();
  const { t } = useTranslation(lng, "common");

  async function createAndOpenWhiteboard(): Promise<void> {
    const response = await fetch("/api/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "Untitled3", ownerId: "ABC-DEF-GHI" }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const newBoardId = data.data.board?._id;
      // console.log(newBoardId);
      if (newBoardId) router.push("./whiteboards/" + newBoardId);
    }
  }
  return (
    <button onClick={() => createAndOpenWhiteboard()}>
      <div className="rounded hover:ring-2 border-dashed w-56 h-44 border-2 text-gray-800 flex flex-col font-semibold justify-center items-center">
        <PiPlus size={64} />
        <h3 className="text-sm text-center">{t("newDashboard")}</h3>
      </div>
    </button>
  );
};

export default NewBoard;
