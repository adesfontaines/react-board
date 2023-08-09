import React, { useEffect } from 'react';
import { PiCursor, PiCursorFill, PiEraser, PiEraserFill, PiPencilSimpleLineDuotone, PiPencilSimpleLineFill, PiTextTLight, PiTextTBold, PiShapesLight, PiShapesBold } from "react-icons/pi";
import { LuUndo, LuRedo } from "react-icons/lu";
import { MdClose } from "react-icons/md"
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { Tools } from '../../enums/tools';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../popOver';

export interface ToolbarProps {
  selectedTool: Tools;
  setSelectedTool: (tool: Tools) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  t?: any;
  lng: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectedTool, setSelectedTool, t, lng, currentColor, setCurrentColor }) => {
  const commonColors: string[] = [
    '#000000', // Black
    '#FFFFFF', // White
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Purple
    '#008000', // Dark Green
    '#800000', // Maroon
    '#008080', // Teal
    '#808080', // Gray
    '#FFC0CB', // Pink
    '#A52A2A', // Brown
  ];

  const defaultButtonClassname = "hover:bg-stone-200 rounded p-1 m-1";
  const selectedToolClassname = "bg-stone-200 rounded p-1 m-1 border-1 border-black";

  const commonBarClassname = "text-black flex fixed";
  const horizontalBarClassname = commonBarClassname + " bottom-2";
  const verticalBarClassname = commonBarClassname + " flex-col justify-center fixed left-2 top-1/4"

  return (
    <div className={verticalBarClassname}>
      <div className="bg-white rounded-md flex flex-col mb-2 shadow-md">
        <Tooltip>
          <TooltipTrigger onClick={() => setSelectedTool(Tools.Select)} className={selectedTool == Tools.Select ? selectedToolClassname : defaultButtonClassname}>
            {selectedTool == Tools.Select ?
              <PiCursorFill size={32}></PiCursorFill> :
              <PiCursor size={32}></PiCursor>}
          </TooltipTrigger>
          <TooltipContent className="Tooltip">{t('toolbarSelectTooltip')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Popover placement='right'>
              <PopoverTrigger onClick={() => setSelectedTool(Tools.Pencil)} className={selectedTool == Tools.Pencil || selectedTool == Tools.Eraser ? selectedToolClassname : defaultButtonClassname}>
                {selectedTool == Tools.Pencil || selectedTool == Tools.Eraser ?
                  <PiPencilSimpleLineFill size={32}></PiPencilSimpleLineFill> :
                  <PiPencilSimpleLineDuotone size={32}></PiPencilSimpleLineDuotone>}
              </PopoverTrigger>
              <PopoverContent className="Popover ml-2 bg-white rounded-md flex flex-col shadow-md text-black">
                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedTool(Tools.Pencil)} className={selectedTool == Tools.Pencil ? selectedToolClassname : defaultButtonClassname}>
                    {selectedTool == Tools.Pencil ?
                      <PiPencilSimpleLineFill size={32}></PiPencilSimpleLineFill> :
                      <PiPencilSimpleLineDuotone size={32}></PiPencilSimpleLineDuotone>}
                  </TooltipTrigger>
                  <TooltipContent className="Tooltip">{t("toolbarPencilTooltip")}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedTool(Tools.Eraser)} className={selectedTool == Tools.Eraser ? selectedToolClassname : defaultButtonClassname}>
                    {selectedTool == Tools.Eraser ?
                      <PiEraserFill size={32}></PiEraserFill> :
                      <PiEraser size={32}></PiEraser>}
                  </TooltipTrigger>
                  <TooltipContent className="Tooltip">{t("toolbarEraserTooltip")}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Popover placement='right'>
                      <PopoverTrigger className={defaultButtonClassname}>
                        <MdClose size={32}></MdClose>
                      </PopoverTrigger>
                      <PopoverContent className="Popover ml-2 p-2 bg-white rounded-md flex flex-col shadow-md text-black">
                          <div className="mb-2 flex items-center">
                            <input type="range" className="slider h-1 w-full" min="" max={8} step={1} />
                            <span className="ml-2">8</span>
                          </div>
                          <div className="my-4 flex flex-1 items-center space-x-2 border-t" />
                          <div className="grid grid-cols-4 gap-2">
                            {commonColors.map((color, index) => (
                            <button onClick={() => setCurrentColor(color)} key={index} style={{ backgroundColor: color }} className="color-btn bg-white-500" />
                            ))}
                          </div>

                      </PopoverContent>
                    </Popover>
                  </TooltipTrigger>
                  <TooltipContent className="Tooltip">{t("close")}</TooltipContent>
                </Tooltip>
                
                <PopoverClose>
                  <Tooltip>
                    <TooltipTrigger className={defaultButtonClassname}>
                      <MdClose size={32}></MdClose>
                    </TooltipTrigger>
                    <TooltipContent className="Tooltip">{t("close")}</TooltipContent>
                  </Tooltip>
                </PopoverClose>

              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">{t('toolbarPencilTooltip')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger onClick={() => setSelectedTool(Tools.Text)} className={selectedTool == Tools.Text ? selectedToolClassname : defaultButtonClassname}>
            {selectedTool == Tools.Text ?
              <PiTextTBold size={32}></PiTextTBold> :
              <PiTextTLight size={32}></PiTextTLight>}
          </TooltipTrigger>
          <TooltipContent className="Tooltip">{t('toolbarTextTooltip')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger onClick={() => setSelectedTool(Tools.Form)} className={selectedTool == Tools.Form ? selectedToolClassname : defaultButtonClassname}>
            {selectedTool == Tools.Form ?
              <PiShapesBold size={32}></PiShapesBold> :
              <PiShapesLight size={32}></PiShapesLight>}
          </TooltipTrigger>
          <TooltipContent className="Tooltip">{t('toolbarFormTooltip')}</TooltipContent>
        </Tooltip>
      </div>
      <div className="bg-white rounded-md flex flex-col shadow-md">
        <Tooltip>
          <TooltipTrigger className={defaultButtonClassname}>
            <LuUndo size={32}></LuUndo>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">{t('undo')}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger disabled={true} className={defaultButtonClassname + ' disabled'}>
            <LuRedo size={32}></LuRedo>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">{t('redo')}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default Toolbar;