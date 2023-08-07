import React from 'react';
import { LuUndo, LuRedo } from 'react-icons/lu';
import { MdZoomIn, MdZoomOut } from "react-icons/md"
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';
import { animated, useSpring } from 'react-spring';

const ZoomBar: React.FC = ({ zoom, setZoom }) => {
  const defaultButtonClassname = "hover:bg-stone-200 rounded p-1 m-1";

  const animatedZoom = useSpring({
    number: zoom,
    config: { duration: 200 }
  });

  const setZoomIfInLimit = (newZoom: number) => {
    if(newZoom < 0.1 || newZoom > 4) return;

    setZoom(newZoom);
  };
  return (
    <div className="fixed bg-white text-black rounded-md flex items-center mb-2 shadow-md bottom-1 justify-items right-1">
      <Tooltip placement='top'>
        <TooltipTrigger>
          <button onClick={() => setZoomIfInLimit(zoom - 0.25)} className={defaultButtonClassname}>
            <MdZoomOut size={24}></MdZoomOut>
          </button>
        </TooltipTrigger>
        <TooltipContent className="Tooltip">Zoom out</TooltipContent>
      </Tooltip>

      <Tooltip placement='top'>
        <TooltipTrigger>
          <button onClick={() => setZoomIfInLimit(1.0)} className={defaultButtonClassname}>
            <animated.span>{animatedZoom.number.interpolate((num) => Math.round(num * 100))}</animated.span>%
          </button>
        </TooltipTrigger>
        <TooltipContent className="Tooltip">Reset zoom</TooltipContent>
      </Tooltip>


      <Tooltip placement='top'>
        <TooltipTrigger>
          <button onClick={() => setZoomIfInLimit(zoom + 0.25)} className={defaultButtonClassname + ' disabled'}>
            <MdZoomIn size={24}></MdZoomIn>
          </button>
        </TooltipTrigger>
        <TooltipContent className="Tooltip">Zoom in</TooltipContent>
      </Tooltip>

    </div>
  );
};

export default ZoomBar;
