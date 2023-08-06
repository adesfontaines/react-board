'use client'
import React, { useEffect } from 'react';
import { PiCursor, PiCursorFill, PiPencilSimpleLineBold, PiTextTLight, PiShapesBold } from "react-icons/pi";
import { LuUndo, LuRedo } from "react-icons/lu";
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Tools } from '../enums/tools';

interface ToolbarProps {
  selectedTool: Tools;
  setSelectedTool: (tool: Tools) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectedTool, setSelectedTool }) => {
  const defaultButtonClassname = "hover:bg-stone-200 rounded p-1 m-1";
  const selectedToolClassname = "bg-stone-200 rounded p-1 m-1 border-1 border-black";

  const commonBarClassname = "text-black flex fixed";
  const horizontalBarClassname = commonBarClassname + " bottom-2";
  const verticalBarClassname = commonBarClassname + " flex-col justify-center fixed left-2 top-1/4"

  return (
    <div className={verticalBarClassname}>
      <div className="bg-white rounded-md flex flex-col mb-2 shadow-md">
        <Tooltip>
          <TooltipTrigger>
            <button onClick={() => setSelectedTool(Tools.Select)} className={selectedTool == Tools.Select ? selectedToolClassname : defaultButtonClassname}>
              {selectedTool == Tools.Select ?
                <PiCursorFill size={32}></PiCursorFill> :
                <PiCursor size={32}></PiCursor>}
            </button>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">Select</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <button onClick={() => setSelectedTool(Tools.Pencil)} className={selectedTool == Tools.Pencil ? selectedToolClassname : defaultButtonClassname}>
              <PiPencilSimpleLineBold size={32}></PiPencilSimpleLineBold>
            </button>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">Inking</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <button onClick={() => setSelectedTool(Tools.Eraser)} className={selectedTool == Tools.Eraser ? selectedToolClassname : defaultButtonClassname}>
              <PiPencilSimpleLineBold size={32}></PiPencilSimpleLineBold>
            </button>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">Eraser</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <button onClick={() => setSelectedTool(Tools.Text)} className={selectedTool == Tools.Text ? selectedToolClassname : defaultButtonClassname}>
              <PiTextTLight size={32}></PiTextTLight>
            </button>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">Add text</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <button onClick={() => setSelectedTool(Tools.Form)} className={selectedTool == Tools.Form ? selectedToolClassname : defaultButtonClassname}>
              <PiShapesBold size={32}></PiShapesBold>
            </button>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">Add form</TooltipContent>
        </Tooltip>
      </div>
      <div className="bg-white rounded-md flex flex-col shadow-md">
        <Tooltip>
          <TooltipTrigger>
            <button className={defaultButtonClassname}>
              <LuUndo size={32}></LuUndo>
            </button>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">Undo</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <button disabled={true} className={defaultButtonClassname + ' disabled'}>
              <LuRedo size={32}></LuRedo>
            </button>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">Redo</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default Toolbar;
