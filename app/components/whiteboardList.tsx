import Link from 'next/link';
import React from 'react';

const WhiteboardList: React.FC = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'];

  return (
    <div className="flex-1 w-full bg-gray-100 flex justify-center">
      <div className="pt-8 grid content-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Link href="/whiteboard">
            <div className="shadow-md rounded hover:ring-2 w-56 h-44 justify-text text-center bg-blue-600 text-white flex flex-col font-semibold">
                  <h3 className="text-sm lign-middle">New Whiteboard</h3>
            </div>
          </Link>

        {items.map((item, index) => (
          <Link href="/whiteboard">
            <div className="shadow-md rounded hover:ring-4 w-56 h-44 bg-white flex flex-col font-semibold">
              <div className="rounded-t w-full bg-gray-300 h-40"></div>
                <div className="p-2 shadow-inner">
                  <h3 className="text-sm text-black">{item}</h3>
                  <p className="text-xs text-gray-600">Edited: 9:12AM</p>
                </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default WhiteboardList;
