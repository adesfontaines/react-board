'use client'
import Link from 'next/link';
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeading, DialogDescription, DialogClose } from './dialog';
import AuthDialog from './authDialog';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from 'next/image'

const NavigationBar: React.FC<{lng: string}> = ({lng}) => {
  
  const { data: session } = useSession()

  console.log(session);
  return (
    <div className="z-10 top-0 left-0 w-full shadow-md flex justify-between p-2 bg-stone-700 text-white">
      <Link href={'/' + lng} className="flex items-center">
        <h2>Whiteboard</h2>
      </Link>

      <h2>Bonjour {session?.user?.name}</h2>
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger className="float-right w-9 h-9 border-2 border-white rounded-full text-white">
            
              {session?.user && session.user.image != null ? <img alt="profil-pic" width={32} height={32} href={"https://profile.line-scdn.net/0h4WcNUJxma3heN37xVDwUL2JyZRUpGW0wJlVwHCxgNx13Ai4sNgIiS3gwMEp7BC8qY1YkH3oxMU93.jpg"}/> : <span>GU</span>}
          </DialogTrigger>
          <DialogContent className="Dialog">
            <AuthDialog lng={lng}></AuthDialog>

          </DialogContent>
        </Dialog>
      </div>
    </div>

  );
};

export default NavigationBar;
