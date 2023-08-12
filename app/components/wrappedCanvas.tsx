import React from "react";
import KonvaCanvas from "./konvaCanvas";

export default function WrappedCanvas({
  canvasRef,
  ...props
}: any): React.JSX.Element {
  return <KonvaCanvas {...props} ref={canvasRef} />;
}
