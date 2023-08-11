/* eslint-disable react/display-name */
"use client";
import React, { useRef, useState, useImperativeHandle } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { Tools } from "../enums/tools";

interface DrawingValue {
  color: string;
  size: number;
  text?: string;
  points: number[];
}
interface DrawingZoneProps {
  selectedTool: Tools;
  forms: DrawingValue[];
  setForms: (drawings: DrawingValue[]) => void;
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  currentColor: string;
  zoom: number;
  drawSize: number;
  ref: any;
}

// eslint-disable-next-line react/display-name
const KonvaCanvas: React.ForwardRefRenderFunction<any, DrawingZoneProps> = (
  {
    selectedTool,
    forms,
    setForms,
    currentColor,
    drawSize,
    historyIndex,
    setHistoryIndex,
  },
  ref
) => {
  const canvasRef = useRef(null);
  const isDrawing = React.useRef(false);
  const [currentDrawId, setCurrentDrawId] = useState<string>("");

  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    exportCanvas: () => {
      exportCanvas();
    },
  }));

  // useEffect(() => {
  //   if (canvasRef) {
  //     const canvas = canvasRef.current as unknown as HTMLCanvasElement;
  //     canvas.oncontextmenu = function () {
  //       return false;
  //     };

  //     updateCanvas();
  //     window.addEventListener("resize", updateCanvas);

  //     return () => {
  //       window.removeEventListener("resize", updateCanvas);
  //     };
  //   }
  // }, []);

  const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = (canvas as HTMLCanvasElement).getContext("2d");

    if (!context) return;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
  };

  const exportCanvas = () => {
    // const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    // const link = document.createElement("a");
    // link.href = canvas.toDataURL("image/png");
    // link.download = "canva_export.png";
    // link.click();
  };

  const handleMouseDown = (event) => {
    isDrawing.current = true;

    const pointer = getTruePointer();

    if (selectedTool == Tools.Pencil) {
      setForms([
        ...forms,
        {
          color: currentColor,
          size: 3,
          points: [pointer.x, pointer.y],
        },
      ]);
    } else if (selectedTool == Tools.Text) {
      const text = "Hello world !"; // Replace with the text you want to add

      const textEntry: DrawingValue = {
        color: currentColor,
        size: 3,
        text: text,
        points: [pos.x, pos.y],
      };
      // if (historyIndex != forms.size) {
      //   const arrayTmp = Array.from(forms).slice(0, historyIndex);
      //   arrayTmp.push([uuid, textEntry]);
      //   setForms(new Map(arrayTmp));
      // } else {
      //   setForms(forms.set(uuid, textEntry));
      // }

      //   setHistoryIndex(historyIndex + 1);

      //   context.fillStyle = currentColor;

      //   // Draw the text on the canvas
      //   context?.fillText(text, scaledX, scaledY);
    }
  };

  const getTruePointer = () => {
    const stage = canvasRef.current;
    if (!stage) return;

    const pointer = stage.getPointerPosition();

    return {
      x: (pointer.x - stage.x()) / stage.scaleX(),
      y: (pointer.y - stage.y()) / stage.scaleY(),
    };
  };
  const handleMouseMove = (event) => {
    if (!isDrawing.current) return;

    const stage = event.target.getStage();

    switch (selectedTool) {
      case Tools.Pencil:
        let lastLine = forms[forms.length - 1];

        if (!lastLine) return;

        const pointer = getTruePointer();

        // add point
        lastLine.points = lastLine.points.concat([pointer.x, pointer.y]);

        // replace last
        forms.splice(forms.length - 1, 1, lastLine);
        setForms(forms.concat());

        break;
      case Tools.Select:
        // move the screen
        // setOffset({
        //   x: offset.x + (currentPosition.x - prevPosition.x) / zoom,
        //   y: offset.y + (currentPosition.y - prevPosition.y) / zoom,
        // });
        // updateCanvas();
        break;
      case Tools.Eraser:
        // Remove lines within a certain range from the current position
        const radius = 6; // Adjust this value as needed

        setForms([]);
        setHistoryIndex(0);
        // const linesToRemove = [];

        // drawings.forEach((value: DrawingValue, key: string) => {
        //     if(!value.text)
        //     {

        //     }
        // });
        // const linesToRemove = drawings.values.filter((line) => {
        //     const distance = Math.sqrt(
        //         Math.pow(toTrueX(prevPosition.x) - line.x0, 2) +
        //         Math.pow(toTrueY(prevPosition.y) - line.y0, 2)
        //     );
        //     return distance <= radius;
        // });
        // setForms(drawings.filter((line) => !linesToRemove.includes(line)));
        break;
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  const handleMouseWheel = (event) => {
    var scaleBy = 1.03;
    const stage = event.target.getStage();
    const pointer = stage.getPointerPosition();

    var oldZoom = stage.scaleX();

    var mousePointTo = {
      x: (pointer.x - stage.x()) / oldZoom,
      y: (pointer.y - stage.y()) / oldZoom,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = event.evt.deltaY > 0 ? 1 : -1;
    var newScale = direction > 0 ? oldZoom * scaleBy : oldZoom / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    var newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  };

  const cursorStyle = () => {
    switch (selectedTool) {
      case Tools.Select:
        return "cursor-pointer";
      case Tools.Pencil:
        return "cursor-crosshair";
      case Tools.Eraser:
        return "cursor-crosshair";
      case Tools.Text:
        return "cursor-text";
      default:
        return "";
    }
  };
  return (
    <Stage
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={selectedTool == Tools.Select}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleMouseWheel}
      className={
        cursorStyle() +
        " fixed top-0 left-0 absolute w-full h-full bg-slate-100"
      }
    >
      <Layer>
        <Text text="Just start drawing" x={5} y={80} />
        {forms.map((value, key) => (
          <Line
            key={key}
            points={value.points}
            stroke={value.color}
            strokeWidth={value.size}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation="source-over"
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default React.forwardRef(KonvaCanvas);
