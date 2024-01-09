import React, { useContext } from "react";
import { Tools } from "../enums/tools";
import useMousePosition from "../hooks/useMousePosition";

const DrawingCursor: React.FC<{ tool: Tools; color: string }> = ({
  tool,
  color,
}) => {
  const { x, y } = useMousePosition();

  if (tool == Tools.Eraser) {
    return (
      <div
        className="dot fixed border border-dashed border-black rounded-full bg-transparent z-10 w-5 h-5 pointer-events-none"
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    );
  } else {
    return (
      <div
        className={
          tool == Tools.Pencil || tool == Tools.Highlighter
            ? "fixed dot border border-white rounded-full z-10 w-2 h-2 pointer-events-none"
            : "hidden"
        }
        style={{ left: `${x}px`, top: `${y}px`, backgroundColor: color }}
      ></div>
    );
  }
};

export default DrawingCursor;
