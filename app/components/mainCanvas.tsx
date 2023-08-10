/* eslint-disable react/display-name */
"use client";
import React, {
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { Tools } from "../enums/tools";

interface DrawingValue {
  color: string;
  size: number;
  text?: string;
  drawings: any[];
}
interface DrawingZoneProps {
  selectedTool: Tools;
  forms: Map<string, DrawingValue>;
  setForms: (drawings: Map<string, DrawingValue>) => void;
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  currentColor: string;
  zoom: number;
  drawSize: number;
  setZoom: (zoom: number) => void;
  ref: any;
}

// eslint-disable-next-line react/display-name
const MainCanvas: React.ForwardRefRenderFunction<
  HTMLCanvasElement,
  DrawingZoneProps
> = (
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
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDraw, setCurrentDraw] = useState<DrawingValue | undefined>();

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

  useEffect(() => {
    if (canvasRef) {
      const canvas = canvasRef.current as unknown as HTMLCanvasElement;
      canvas.oncontextmenu = function () {
        return false;
      };

      updateCanvas();
      window.addEventListener("resize", updateCanvas);

      return () => {
        window.removeEventListener("resize", updateCanvas);
      };
    }
  }, []);

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
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "canva_export.png";
    link.click();
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

    context.scale(zoom, zoom);
    context.translate(offset.x, offset.y);

    let i = 0;
    forms.forEach((value: DrawingValue, key: string) => {
      if (i == historyIndex) return;
      context.fillStyle = value.color;
      context.strokeStyle = value.color;
      context.lineWidth = value.size;

      if (value.text) {
        context.fillText(
          value.text,
          value.drawings[0].x0,
          value.drawings[0].y0
        );
      } else {
        for (let i = 0; i < value.drawings.length; i++) {
          const draw = value.drawings[i];
          drawLine(draw.x0, draw.y0, draw.x1, draw.y1);
        }
      }
      i++;
    });
  };

  const handleMouseDown = (event: { clientX: number; clientY: number }) => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = (canvas as HTMLCanvasElement).getContext("2d");

    const currentPosition = {
      x: event.clientX - canvas.offsetLeft,
      y: event.clientY - canvas.offsetTop,
    };

    setIsDrawing(true);
    setPrevPosition({
      x: event.clientX - canvas.offsetLeft,
      y: event.clientY - canvas.offsetTop,
    });

    if (selectedTool == Tools.Pencil) {
      setCurrentDraw({ color: currentColor, size: drawSize, drawings: [] });
    } else if (selectedTool == Tools.Text && context) {
      const scaledX = toTrueX(currentPosition.x);
      const scaledY = toTrueY(currentPosition.y);

      const text = "Hello world !"; // Replace with the text you want to add

      const uuid = crypto.randomUUID();

      const textEntry: DrawingValue = {
        color: currentColor,
        size: 3,
        text: text,
        drawings: [{ x0: scaledX, y0: scaledY }],
      };
      if (historyIndex != forms.size) {
        const arrayTmp = Array.from(forms).slice(0, historyIndex);
        arrayTmp.push([uuid, textEntry]);
        setForms(new Map(arrayTmp));
      } else {
        setForms(forms.set(uuid, textEntry));
      }

      setHistoryIndex(historyIndex + 1);

      context.fillStyle = currentColor;

      // Draw the text on the canvas
      context?.fillText(text, scaledX, scaledY);
    }
  };

  const handleMouseMove = (event: { clientX: number; clientY: number }) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = (canvas as HTMLCanvasElement).getContext("2d");

    if (!context) return;

    const currentPosition = {
      x: event.clientX - canvas.offsetLeft,
      y: event.clientY - canvas.offsetTop,
    };

    const scaledX = toTrueX(currentPosition.x);
    const scaledY = toTrueY(currentPosition.y);
    const prevScaledX = toTrueX(prevPosition.x);
    const prevScaledY = toTrueY(prevPosition.y);

    switch (selectedTool) {
      case Tools.Pencil:
        if (!currentDraw) return;
        context.strokeStyle = currentDraw.color;
        context.lineWidth = drawSize;

        // add the line to our drawing history
        currentDraw?.drawings.push({
          x0: prevScaledX,
          y0: prevScaledY,
          x1: scaledX,
          y1: scaledY,
        });
        // draw a line
        drawLine(prevScaledX, prevScaledY, scaledX, scaledY);
        break;
      case Tools.Select:
        // move the screen
        setOffset({
          x: offset.x + (currentPosition.x - prevPosition.x) / zoom,
          y: offset.y + (currentPosition.y - prevPosition.y) / zoom,
        });
        updateCanvas();
        break;
      case Tools.Eraser:
        // Remove lines within a certain range from the current position
        const radius = 6; // Adjust this value as needed

        setForms(new Map());
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
    setPrevPosition(currentPosition);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    if (currentDraw) {
      const uuid = crypto.randomUUID();

      if (historyIndex != forms.size) {
        const arrayTmp = Array.from(forms).slice(0, historyIndex);
        arrayTmp.push([uuid, currentDraw]);
        setForms(new Map(arrayTmp));
      } else {
        setForms(forms.set(uuid, currentDraw));
      }

      setHistoryIndex(historyIndex + 1);
      setCurrentDraw(undefined);
    }
  };
  const handleMouseWheel = (event: {
    deltaY: any;
    pageX: number;
    pageY: number;
    clientX: number;
    clientY: number;
  }) => {
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
    <canvas
      className={
        cursorStyle() +
        " fixed top-0 left-0 absolute w-full h-full bg-slate-100"
      }
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseUp}
      onWheel={handleMouseWheel}
    />
  );
};

export default React.forwardRef(MainCanvas);
