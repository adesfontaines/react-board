'use client'
import React from 'react';
import { PiCursorFill, PiPencilSimpleLineBold, PiTextTLight, PiShapesBold } from "react-icons/pi";
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const Toolbar: React.FC = () => {
  return (
    <div className="fixed bottom-2 bg-white flex justify-center items-center rounded-md shadow-md">
      <Tooltip>
        <TooltipTrigger>
          <button className="rounded text-black p-1 mr-2 hover:text-gray-300 focus:outline-none">
            <PiCursorFill size={32}></PiCursorFill>
          </button>
        </TooltipTrigger>
        <TooltipContent className="Tooltip">Select</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <button className="rounded text-black p-1 mr-2 hover:text-gray-300 focus:outline-none">
            <PiPencilSimpleLineBold size={32}></PiPencilSimpleLineBold>
          </button>
        </TooltipTrigger>
        <TooltipContent className="Tooltip">Inking</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <button className="rounded text-black p-1 mr-2 hover:text-gray-300 focus:outline-none">
            <PiTextTLight size={32}></PiTextTLight>
          </button>
        </TooltipTrigger>
        <TooltipContent className="Tooltip">Add text</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <button className="rounded text-black p-1 mr-2 hover:text-gray-300 focus:outline-none">
            <PiShapesBold size={32}></PiShapesBold>
          </button>
        </TooltipTrigger>
        <TooltipContent className="Tooltip">Add form</TooltipContent>
      </Tooltip>

    </div>
  );
};

export default Toolbar;
