import React from "react";
import {
  PiCursor,
  PiCursorFill,
  PiPencilSimpleLineDuotone,
  PiPencilSimpleLineFill,
  PiSquare,
} from "react-icons/pi";
import {
  LuUndo,
  LuRedo,
  LuHighlighter,
  LuEraser,
  LuType,
  LuX,
} from "react-icons/lu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Tools } from "../enums/tools";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "./popOver";

export interface ToolbarProps {
  selectedTool: Tools;
  setSelectedTool: (tool: Tools) => void;
  currentColor: string;
  setCurrentColor: (color: string) => void;
  drawSize: number;
  setDrawSize: (size: number) => void;
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  maxHistory: number;
  t?: any;
}

const Toolbar: React.FC<ToolbarProps> = ({
  selectedTool,
  setSelectedTool,
  t,
  currentColor,
  setCurrentColor,
  drawSize,
  setDrawSize,
  historyIndex,
  setHistoryIndex,
  maxHistory,
}) => {
  const commonColors: string[] = [
    "#263238",
    "#2E3C43",
    "#314549",
    "#546E7A",
    "#B2CCD6",
    "#EEFFFF",
    "#EEFFFF",
    "#FFFFFF",
    "#F07178",
    "#F78C6C",
    "#FFCB6B",
    "#C3E88D",
    "#89DDFF",
    "#82AAFF",
    "#C792EA",
    "#FF5370",
  ];

  const defaultButtonClassname =
    "cursor-pointer hover:bg-stone-200 rounded p-1 m-1 disabled:opacity-50";
  const selectedToolClassname =
    "cursor-pointer bg-stone-200 rounded p-1 m-1 border-black";

  const horizontalBarClassname = "text-black flex fixed bottom-2";
  const verticalBarClassname =
    "Toolbar text-black flex fixed flex-col justify-center fixed left-2 top-1/4";

  const handleUndo = () => {
    setHistoryIndex(historyIndex - 1);
  };

  const handleRedo = () => {
    setHistoryIndex(historyIndex + 1);
  };

  return (
    <div className={verticalBarClassname}>
      <div className="bg-white rounded-md flex flex-col mb-2 shadow-md">
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={() => setSelectedTool(Tools.Select)}
              className={
                selectedTool == Tools.Select
                  ? selectedToolClassname
                  : defaultButtonClassname
              }
            >
              {selectedTool == Tools.Select ? (
                <PiCursorFill size={28}></PiCursorFill>
              ) : (
                <PiCursor size={28}></PiCursor>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">
            {t("toolbarSelectTooltip")}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Popover placement="right">
              <PopoverTrigger
                onClick={() => setSelectedTool(Tools.Pencil)}
                className={
                  selectedTool == Tools.Pencil ||
                  selectedTool == Tools.Highlighter ||
                  selectedTool == Tools.Eraser
                    ? selectedToolClassname
                    : defaultButtonClassname
                }
              >
                <PiPencilSimpleLineDuotone size={28} />
              </PopoverTrigger>
              <PopoverContent className="Popover ml-2 bg-white rounded-md flex flex-col shadow-md text-black">
                <PopoverClose>
                  <Tooltip>
                    <TooltipTrigger className="rounded p-1 m-1 hover:color-blue">
                      <LuX size={28} />
                    </TooltipTrigger>
                    <TooltipContent className="Tooltip">
                      {t("close")}
                    </TooltipContent>
                  </Tooltip>
                </PopoverClose>

                <Tooltip>
                  <TooltipTrigger
                    onClick={() => setSelectedTool(Tools.Pencil)}
                    className={
                      selectedTool == Tools.Pencil
                        ? selectedToolClassname
                        : defaultButtonClassname
                    }
                  >
                    {selectedTool == Tools.Pencil ? (
                      <PiPencilSimpleLineFill size={28} />
                    ) : (
                      <PiPencilSimpleLineDuotone size={28} />
                    )}
                  </TooltipTrigger>
                  <TooltipContent className="Tooltip">
                    {t("toolbarPencilTooltip")}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    onClick={() => setSelectedTool(Tools.Highlighter)}
                    className={
                      selectedTool == Tools.Highlighter
                        ? selectedToolClassname
                        : defaultButtonClassname
                    }
                  >
                    <LuHighlighter size={28} />
                  </TooltipTrigger>
                  <TooltipContent className="Tooltip">
                    {t("toolbarHighlighterTooltip")}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    onClick={() => setSelectedTool(Tools.Eraser)}
                    className={
                      selectedTool == Tools.Eraser
                        ? selectedToolClassname
                        : defaultButtonClassname
                    }
                  >
                    <LuEraser size={28} />
                  </TooltipTrigger>
                  <TooltipContent className="Tooltip">
                    {t("toolbarEraserTooltip")}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Popover dismissOutside={true} placement="right">
                      <PopoverTrigger className={defaultButtonClassname}>
                        <div
                          className="color-btn"
                          style={{ background: currentColor }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="Popover ml-2 p-2 bg-white rounded-md flex flex-col shadow-md text-black">
                        <div className="mb-2 flex items-center">
                          <input
                            type="range"
                            value={drawSize}
                            onChange={(event) =>
                              setDrawSize(event?.target.valueAsNumber)
                            }
                            className="slider h-1 w-full"
                            min="2"
                            max={12}
                            step={2}
                          />
                          <span className="ml-2">{drawSize}</span>
                        </div>
                        <div className="my-4 flex flex-1 items-center space-x-2 border-t" />
                        <div className="grid grid-cols-4 gap-2">
                          {commonColors.map((color, index) => (
                            <button
                              onClick={() => setCurrentColor(color)}
                              key={index}
                              style={{ backgroundColor: color }}
                              className={
                                currentColor == color
                                  ? "border-2 border-black rounded-full"
                                  : "color-btn"
                              }
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TooltipTrigger>
                  <TooltipContent className="Tooltip">
                    {t("pickColor")}
                  </TooltipContent>
                </Tooltip>
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">
            {t("toolbarPencilTooltip")}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={() => setSelectedTool(Tools.Text)}
            className={
              selectedTool == Tools.Text
                ? selectedToolClassname
                : defaultButtonClassname
            }
          >
            <LuType size={28} />
          </TooltipTrigger>
          <TooltipContent className="Tooltip">
            {t("toolbarTextTooltip")}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            disabled={true}
            className={
              selectedTool == Tools.Form
                ? selectedToolClassname
                : defaultButtonClassname
            }
          >
            <PiSquare size={28} />
          </TooltipTrigger>
          <TooltipContent className="Tooltip">
            {t("toolbarFormTooltip")}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="bg-white rounded-md flex flex-col shadow-md">
        <Tooltip>
          <TooltipTrigger
            disabled={historyIndex <= 0}
            onClick={() => handleUndo()}
            className={defaultButtonClassname}
          >
            <LuUndo size={28}></LuUndo>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">{t("undo")}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            disabled={historyIndex >= maxHistory}
            onClick={() => handleRedo()}
            className={defaultButtonClassname}
          >
            <LuRedo size={28}></LuRedo>
          </TooltipTrigger>
          <TooltipContent className="Tooltip">{t("redo")}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default Toolbar;
