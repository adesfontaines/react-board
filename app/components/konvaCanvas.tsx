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
  setZoom: (zoom: number) => void;
  ref: any;
}

// eslint-disable-next-line react/display-name
const KonvaCanvas: React.ForwardRefRenderFunction<any, DrawingZoneProps> = (
  {
    selectedTool,
    forms,
    setForms,
    zoom,
    setZoom,
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
    updateCanvas: () => {
      updateCanvas();
    },
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

  const toTrueX = (xScreen: number) => {
    return xScreen / zoom - offset.x;
  };
  const toTrueY = (yScreen: number) => {
    return yScreen / zoom - offset.y;
  };

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
  const updateCanvas = () => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = (canvas as HTMLCanvasElement).getContext("2d");

    if (!context) return;

    // set the canvas to the size of the window
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    context.lineCap = "round";
    context.font = "32px Arial";

    drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height);

    context.scale(zoom, zoom);
    context.translate(offset.x, offset.y);
  };

  const handleMouseDown = (event) => {
    isDrawing.current = true;

    const pos = event.target.getStage().getPointerPosition();

    if (selectedTool == Tools.Pencil) {
      setForms([
        ...forms,
        {
          color: currentColor,
          size: 3,
          points: [pos.x, pos.y],
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

  const handleMouseMove = (event) => {
    if (!isDrawing.current) return;

    const stage = event.target.getStage();
    const point = stage.getPointerPosition();

    switch (selectedTool) {
      case Tools.Pencil:
        let lastLine = forms[forms.length - 1];

        if (!lastLine) return;

        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

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
        updateCanvas();
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
        updateCanvas();
        break;
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  const handleMouseWheel = (event) => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;

    const deltaY = event.deltaY;
    const scaleAmount = -deltaY / 500;
    let newZoom = zoom * (1 + scaleAmount);

    if (newZoom < 0.25) newZoom = 0.25;

    if (newZoom > 5) newZoom = 5;

    if (newZoom == zoom) return;

    setZoom(newZoom);
    // zoom the page based on where the cursor is
    var distX = event.pageX / canvas.clientWidth;
    var distY = event.pageY / canvas.clientHeight;

    // calculate how much we need to zoom
    const unitsZoomedX = (canvas.clientWidth / zoom) * scaleAmount;
    const unitsZoomedY = (canvas.clientHeight / zoom) * scaleAmount;

    const unitsAddLeft = unitsZoomedX * distX;
    const unitsAddTop = unitsZoomedY * distY;

    setOffset({
      x: offset.x - unitsAddLeft,
      y: offset.y - unitsAddTop,
    });

    updateCanvas();
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
      width={window.innerWidth}
      height={window.innerHeight}
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
