/* eslint-disable react/display-name */
"use client";
import React, { useRef, useState, useImperativeHandle } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { Tools } from "../enums/tools";

interface DrawingValue {
  color: string;
  size: number;
  text?: string;
  tool: Tools;
  points: number[];
}
interface DrawingZoneProps {
  selectedTool: Tools;
  forms: DrawingValue[];
  setForms: (drawings: DrawingValue[]) => void;
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  currentColor: string;
  setZoom: (index: number) => void;
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
    setZoom,
    setHistoryIndex,
  },
  ref
) => {
  const canvasRef = useRef(null);
  const isDrawing = React.useRef(false);

  useImperativeHandle(ref, () => ({
    exportCanvas: () => {
      exportCanvas();
    },
    updateScale: (newScale: number) => {
      const stage = canvasRef.current;

      if (!stage) return;

      const pointer = {
        x: stage.width() / 2,
        y: stage.height() / 2,
      };

      const newPos = {
        x: pointer.x - pointer.x * newScale,
        y: pointer.y - pointer.y * newScale,
      };
      setZoom(newScale);

      stage.scale({ x: newScale, y: newScale });
      stage.position(newPos);
    },
  }));

  const exportCanvas = () => {
    const stage = canvasRef.current;

    const uri = stage.toDataURL("image/jpeg");

    var link = document.createElement("a");
    link.download = "canva_export.jpg";
    link.href = uri;
    document.body.appendCild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMouseDown = (event) => {
    isDrawing.current = true;

    const pointer = getTruePointer();

    if (
      selectedTool == Tools.Pencil ||
      selectedTool == Tools.Eraser ||
      selectedTool == Tools.Highlighter
    ) {
      setForms([
        ...forms.slice(0, historyIndex),
        {
          color: currentColor,
          size: drawSize,
          points: [pointer.x, pointer.y],
          tool: selectedTool,
        },
      ]);
      setHistoryIndex(historyIndex + 1);
    } else if (selectedTool == Tools.Text) {
      const text = "Hello world !"; // Replace with the text you want to add

      const textEntry: DrawingValue = {
        color: currentColor,
        size: drawSize,
        text: text,
        points: [pointer.x, pointer.y],
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

    switch (selectedTool) {
      case Tools.Pencil:
      case Tools.Eraser:
      case Tools.Highlighter:
        let lastLine = forms[forms.length - 1];

        if (!lastLine) return;

        const pointer = getTruePointer();

        // add point
        lastLine.points = lastLine.points.concat([pointer.x, pointer.y]);

        // replace last
        forms.splice(forms.length - 1, 1, lastLine);
        setForms(forms.concat());

        break;
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  const handleMouseWheel = (event) => {
    var scaleBy = 1.02;
    const stage = event.target.getStage();
    const pointer = stage.getPointerPosition();

    var oldScale = stage.scaleX();

    // how to scale? Zoom in? Or zoom out?
    let direction = event.evt.deltaY > 0 ? 1 : -1;
    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    if (oldScale == newScale) return;
    if (newScale < 0.25) newScale = 0.25;
    if (newScale > 5.0) newScale = 5.0;

    var mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    stage.scale({ x: newScale, y: newScale });
    setZoom(newScale);

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
      width={document.body.clientWidth}
      height={document.body.clientHeight}
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
        {forms.slice(0, historyIndex).map((value, key) => (
          <Line
            key={key}
            points={value.points}
            stroke={value.color}
            strokeWidth={value.size}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            opacity={value.tool == Tools.Highlighter ? 0.5 : 1}
            globalCompositeOperation={
              value.tool == Tools.Eraser ? "destination-out" : "source-over"
            }
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default React.forwardRef(KonvaCanvas);
