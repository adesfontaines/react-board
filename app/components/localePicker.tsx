"use client";
import React from "react";
import { PiTranslate } from "react-icons/pi";
import { useTranslation } from "../i18n/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LocalePicker: React.FC<{ lng: string }> = ({ lng }) => {
  const router = useRouter();
  const { t } = useTranslation(lng, "common");
  return (
    <div className="fixed bottom-4 right-4 flex inline-block text-left text-black">
      <PiTranslate size={24} />
      <select
        onChange={(event) => router.push("/" + event.target.value)}
        id="countries"
        className="bg-transparent text-sm"
      >
        <option value="fr" selected={lng == "fr"}>
          Français
        </option>
        <option value="en" selected={lng == "en"}>
          English
        </option>
        <option value="ja" selected={lng == "ja"}>
          日本語
        </option>
      </select>
    </div>
  );
};

export default LocalePicker;
