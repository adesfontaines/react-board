"use client";
import Link from "next/link";
import React from "react";
import { PiSignOut, PiGear } from "react-icons/pi";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./popOver";
import { TFunction } from "i18next";

const NavigationBar: React.FC<{
  lng: string;
  t: TFunction<string, undefined>;
  childleft?: any;
  childright?: any;
}> = ({ lng, t, childleft, childright }) => {
  const { data: session } = useSession();

  const LoginComponent = () => {
    if (session?.user) {
      const userImageSource = session.user.image as string;
      return (
        <Popover dismissOutside={true} placement="bottom">
          <PopoverTrigger>
            <button className="p-2 mr-2 hover:bg-stone-800">
              <Image
                alt="profil pic"
                className="rounded-full"
                width={32}
                height={32}
                src={userImageSource}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="Popover flex w-auto flex-col divide-y-2 rounded-lg bg-white shadow-md text-black">
            <div className="flex p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full">
                <Image
                  alt="profil pic"
                  className="rounded-full"
                  width={48}
                  height={48}
                  src={userImageSource}
                />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{session.user.name}</h2>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col py-3 text-sm">
              <button className="p-2 pl-4 text-left hover:bg-slate-200 flex items-center">
                <PiGear className="pr-2" size={32} />
                {t("settings")}
              </button>
              <button
                onClick={() => signOut()}
                className="p-2 pl-4 text-left hover:bg-slate-200 flex items-center"
              >
                <PiSignOut className="pr-2" size={32} />
                {t("signOut")}
              </button>
            </div>
          </PopoverContent>
        </Popover>
      );
    } else {
      return (
        <button
          onClick={() => signIn()}
          className="border-2 p-1 mt-2 mr-2 rounded-lg border-white"
        >
          {t("signIn")}
        </button>
      );
    }
  };
  return (
    <div className="z-10 top-0 left-0 w-full h-12 shadow-md flex justify-between bg-stone-700 text-white">
      <div className="flex items-center ml-2">
        <Link href={"/" + lng}>
          <h2>Whiteboard</h2>
        </Link>
        {childleft}
      </div>
      <div className="float-right items-center flex">
        {childright}
        <LoginComponent />
      </div>
    </div>
  );
};

export default NavigationBar;
