import React, { useEffect } from 'react';
import { PiCursor, PiCursorFill, PiEraser, PiEraserFill, PiPencilSimpleLineDuotone, PiPencilSimpleLineFill, PiTextTLight, PiTextTBold,PiShapesLight, PiShapesBold } from "react-icons/pi";
import { LuUndo, LuRedo } from "react-icons/lu";
import { MdClose } from "react-icons/md"
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { Tools } from '../../enums/tools';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../popOver';

export interface ToolbarProps {
  selectedTool: Tools;
  setSelectedTool: (tool: Tools) => void;
  t?: any;
  lng: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ selectedTool, setSelectedTool, t, lng }) => {
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
            <div>
            <Popover placement='right'>
              <PopoverTrigger onClick={() => setSelectedTool(Tools.Pencil)} className={selectedTool == Tools.Pencil || selectedTool == Tools.Eraser ? selectedToolClassname : defaultButtonClassname}>
                  {selectedTool == Tools.Pencil || selectedTool == Tools.Eraser ?
                    <PiPencilSimpleLineFill size={32}></PiPencilSimpleLineFill> :
                    <PiPencilSimpleLineDuotone size={32}></PiPencilSimpleLineDuotone>}
              </PopoverTrigger>
              <PopoverContent className="Popover bg-white rounded-md flex flex-col shadow-md text-black">
              <button onClick={() => setSelectedTool(Tools.Pencil)} className={selectedTool == Tools.Pencil ? selectedToolClassname : defaultButtonClassname}>
                  {selectedTool == Tools.Pencil ?
                    <PiPencilSimpleLineFill size={32}></PiPencilSimpleLineFill> :
                    <PiPencilSimpleLineDuotone size={32}></PiPencilSimpleLineDuotone>}
                </button>
                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedTool(Tools.Eraser)} className={selectedTool == Tools.Eraser ? selectedToolClassname : defaultButtonClassname}>
                      {selectedTool == Tools.Eraser ?
                        <PiEraserFill size={32}></PiEraserFill> :
                        <PiEraser size={32}></PiEraser>}
                  </TooltipTrigger>
                  <TooltipContent className="Tooltip">{t("toolbarEraserTooltip")}</TooltipContent>
                </Tooltip>

                <PopoverClose>
                  <button className={defaultButtonClassname}>
                    <MdClose size={32}></MdClose>
                  </button>
                </PopoverClose>
              </PopoverContent>
            </Popover>
            </div>
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