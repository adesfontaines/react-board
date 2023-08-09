'use client'
import Link from 'next/link';
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeading, DialogDescription, DialogClose } from './dialog';
import AuthDialog from './authDialog';

const NavigationBar: React.FC<{lng: string}> = ({lng}) => {
  return (
    <div className="z-10 top-0 left-0 w-full shadow-md flex justify-between p-2 bg-stone-700 text-white">
      <Link href={'/' + lng} className="flex items-center">
        <h2>Whiteboard</h2>
      </Link>
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger className="float-right w-9 h-9 border-2 border-white rounded-full text-white">
            GU
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
