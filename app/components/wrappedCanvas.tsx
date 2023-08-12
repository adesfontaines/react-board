import React from "react";
import KonvaCanvas from "./konvaCanvas";

export default function WrappedCanvas({ canvasRef, ...props }) {
  return <KonvaCanvas {...props} ref={canvasRef} />;
}
