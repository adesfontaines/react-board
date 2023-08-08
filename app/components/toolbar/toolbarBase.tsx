import React, { useEffect } from 'react';
import { PiCursor, PiCursorFill, PiEraser, PiEraserFill, PiPencilSimpleLineDuotone, PiPencilSimpleLineFill, PiTextTLight, PiTextTBold,PiShapesLight, PiShapesBold } from "react-icons/pi";
import { LuUndo, LuRedo } from "react-icons/lu";
import { MdClose } from "react-icons/md"
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { Tools } from '../../enums/tools';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../popOver';
import { useTranslation } from '../../i18n';

interface ToolbarProps {
  selectedTool: Tools;
  setSelectedTool: (tool: Tools) => void;
  lng: string;
}

const Toolbar: React.FC<ToolbarProps> = async ({ selectedTool, setSelectedTool, lng }) => {
  const defaultButtonClassname = "hover:bg-stone-200 rounded p-1 m-1";
  const selectedToolClassname = "bg-stone-200 rounded p-1 m-1 border-1 border-black";

  const commonBarClassname = "text-black flex fixed";
  const horizontalBarClassname = commonBarClassname + " bottom-2";
  const verticalBarClassname = commonBarClassname + " flex-col justify-center fixed left-2 top-1/4"

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'common');

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
          <TooltipContent className="Tooltip">{t('toolbarSelectTooltip')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Popover placement='right'>
              <PopoverTrigger>
                <button onClick={() => setSelectedTool(Tools.Pencil)} className={selectedTool == Tools.Pencil || selectedTool == Tools.Eraser ? selectedToolClassname : defaultButtonClassname}>
                  {selectedTool == Tools.Pencil || selectedTool == Tools.Eraser ?
                    <PiPencilSimpleLineFill size={32}></PiPencilSimpleLineFill> :
                    <PiPencilSimpleLineDuotone size={32}></PiPencilSimpleLineDuotone>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="Popover bg-white rounded-md flex flex-col shadow-md text-black">
              <button onClick={() => setSelectedTool(Tools.Pencil)} className={selectedTool == Tools.Pencil ? selectedToolClassname : defaultButtonClassname}>
                  {selectedTool == Tools.Pencil ?
                    <PiPencilSimpleLineFill size={32}></PiPencilSimpleLineFill> :
                    <PiPencilSimpleLineDuotone size={32}></PiPencilSimpleLineDuotone>}
                </button>
                <Tooltip>
                  <TooltipTrigger>
                    <button onClick={() => setSelectedTool(Tools.Eraser)} className={selectedTool == Tools.Eraser ? selectedToolClassname : defaultButtonClassname}>
                      {selectedTool == Tools.Eraser ?
                        <PiEraserFill size={32}></PiEraserFill> :
                        <PiEraser size={32}></PiEraser>}
                    </button>
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
          </TooltipTrigger>
          <TooltipContent className="Tooltip">{t('toolbarPencilTooltip')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <button onClick={() => setSelectedTool(Tools.Text)} className={selectedTool == Tools.Text ? selectedToolClassname : defaultButtonClassname}>
              {selectedTool == Tools.Text ?
                <PiTextTBold size={32}></PiTextTBold> :
                <PiTextTLight size={32}></PiTextTLight>}
            </button>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">Add text</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <button onClick={() => setSelectedTool(Tools.Form)} className={selectedTool == Tools.Form ? selectedToolClassname : defaultButtonClassname}>
            {selectedTool == Tools.Form ?
                <PiShapesBold size={32}></PiShapesBold> :
                <PiShapesLight size={32}></PiShapesLight>}
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