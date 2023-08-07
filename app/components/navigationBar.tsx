import Link from 'next/link';
import React from 'react';

const NavigationBar: React.FC = () => {
  return (
    <div className="z-10 top-0 left-0 w-full shadow-md flex justify-between p-2 bg-stone-700 text-white">
    <Link href="/" className="flex items-center">
      <h2>Whiteboard</h2>
    </Link>
    <div className="flex items-center">
    <button
          className="float-right w-9 h-9 border-2 border-white rounded-full text-white"
        >
          GU
        </button>
    </div>
  </div>

  );
};

export default NavigationBar;
