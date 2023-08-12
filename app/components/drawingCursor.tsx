import React, { useContext } from "react";
import { Tools } from "../enums/tools";
import useMousePosition from "../hooks/useMousePosition";

const DrawingCursor: React.FC<{ tool: Tools; color: string }> = ({
  tool,
  color,
}) => {
  const { x, y } = useMousePosition();
  return (
    <div
      className={tool == Tools.Pencil ? "dot border border-white" : "hidden"}
      style={{ left: `${x}px`, top: `${y}px`, backgroundColor: color }}
    >
      {tool}
    </div>
  );
};

export default DrawingCursor;
