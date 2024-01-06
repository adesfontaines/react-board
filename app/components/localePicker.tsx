"use client";
import React from "react";
import { PiTranslate } from "react-icons/pi";
import { useRouter } from "next/navigation";
import i18next from "i18next";

const LocalePicker: React.FC<{ lng: string }> = ({ lng }) => {
  const router = useRouter();

  function updateLocaleCookie(lang: String) {
    document.cookie = "locale=" + lang;
  }
  return (
    <div className="fixed bottom-4 right-4 flex inline-block text-left text-black">
      <PiTranslate size={24} />
      <select
        onChange={(event) => {
          updateLocaleCookie(event.target.value);
          router.push("/" + event.target.value);
        }}
        id="countries"
        defaultValue={lng}
        className="bg-transparent text-sm"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
};

export default LocalePicker;
