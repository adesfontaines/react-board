"use client";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeading,
  DialogDescription,
  DialogClose,
} from "./dialog";
import AuthDialog from "./authDialog";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./popOver";

const NavigationBar: React.FC<{ lng: string }> = ({ lng }) => {
  const { data: session } = useSession();

  const LoginComponent = () => {
    if (session?.user) {
      const userImageSource = session.user.image as string;
      return (
        <Popover placement="bottom">
          <PopoverTrigger className="w-9 h-9">
            <Image
              alt="profil pic"
              className="rounded-full"
              width={36}
              height={36}
              src={userImageSource}
            />
          </PopoverTrigger>
          <PopoverContent className="Popover flex w-min flex-col divide-y-2 rounded-lg bg-white shadow-md text-black">
            <div className="flex p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-white">
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
            <div className="flex flex-col py-3">
              <button className="p-2 pl-4 text-left hover:bg-slate-200">
                Settings
              </button>
              <button
                onClick={() => signOut()}
                className="p-2 pl-4 text-left hover:bg-slate-200"
              >
                Sign out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      );
    } else {
      return (
        <button
          onClick={() => signIn()}
          className="border-2 rounded-lg border-white py-1 px-3"
        >
          Sign in
        </button>
        // <Dialog>
        //   <DialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300">
        //     Sign in
        //   </DialogTrigger>
        //   <DialogContent className="Dialog">
        //     <AuthDialog lng={lng}></AuthDialog>
        //   </DialogContent>
        // </Dialog>
      );
    }
  };
  return (
    <div className="z-10 top-0 left-0 w-full h-12 shadow-md flex justify-between p-2 bg-stone-700 text-white">
      <Link href={"/" + lng} className="flex items-center">
        <h2>Whiteboard</h2>
      </Link>
      <div className="float-right">
        <LoginComponent />
      </div>
    </div>
  );
};

export default NavigationBar;
