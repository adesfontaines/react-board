/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./popOver";
import ProfileActions from "./profileActions";
import { getServerSession } from "../api/auth/[...nextauth]/route";

const NavigationBar: React.FC<{
  lng: string;
  childleft?: any;
  childright?: any;
}> = async ({ lng, childleft, childright }) => {
  const session = await getServerSession();

  return (
    <div className="z-10 top-0 left-0 w-full h-12 shadow-md flex justify-between bg-stone-700 text-white">
      <div className="flex items-center ml-2">{childleft}</div>
      <div className="float-right items-center flex">
        {childright}
        <Popover dismissOutside={true} placement="bottom-start">
          <PopoverTrigger className="p-2 mr-2 hover:bg-stone-800">
            <div>
              <Image
                alt="profil pic"
                priority={true}
                className="rounded-full"
                width={32}
                height={32}
                src={session.user.image!}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="Popover flex w-auto flex-col divide-y-2 rounded-lg bg-white shadow-md text-black">
            <div className="flex p-3 w-40">
              <div className="flex h-12 w-12 items-center justify-center rounded-full">
                <Image
                  alt="profil pic"
                  className="rounded-full"
                  width={48}
                  height={48}
                  src={session.user.image!}
                />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold">{session.user.name}</h2>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
            </div>
            <ProfileActions lng={lng} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default NavigationBar;
