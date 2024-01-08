"use client";

import { PiSignOut, PiGear } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { useTranslation } from "../i18n/client";

const ProfileActions: React.FC<{ lng: string }> = ({ lng }) => {
  const { t } = useTranslation(lng, "common");
  return (
    <div className="flex flex-col">
      {/* <button className="p-2 pl-4 text-left hover:bg-slate-200 flex items-center">
        <PiGear className="pr-2" size={32} />
        {t("settings")}
      </button> */}
      <button
        onClick={() => signOut({ callbackUrl: "/" + lng + "/signin" })}
        className="p-2 pl-4 text-left hover:bg-slate-200 flex items-center"
      >
        <PiSignOut className="pr-2" size={32} />
        {t("signOut")}
      </button>
    </div>
  );
};
export default ProfileActions;
