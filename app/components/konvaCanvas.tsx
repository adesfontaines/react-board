/* eslint-disable react/display-name */
"use client";
import React, { useRef, useState, useImperativeHandle } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import { Tools } from "../enums/tools";
import Konva from "konva";

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
  isEdited: boolean;
  setIsEdited: (edited: boolean) => void;
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
    isEdited,
    setIsEdited,
  },
  ref
) => {
  const canvasRef = useRef<Konva.Stage>(null);
  const isDrawing = React.useRef(false);

  useImperativeHandle(ref, () => ({
    getCanvasURL: () => {
      const stage = canvasRef.current!;
      return stage.toDataURL({ pixelRatio: 1 / 3 });
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

  const handleMouseDown = () => {
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
      // const text = "Hello world !"; // Replace with the text you want to add
      // const textEntry: DrawingValue = {
      //   color: currentColor,
      //   size: drawSize,
      //   text: text,
      //   tool: Tools.Text,
      //   points: [pointer.x, pointer.y],
      // };
    }
  };

  const getTruePointer = () => {
    const stage = canvasRef.current!;

    const pointer = stage.getPointerPosition()!;

    return {
      x: (pointer.x - stage.x()) / stage.scaleX(),
      y: (pointer.y - stage.y()) / stage.scaleY(),
    };
  };
  const handleMouseMove = () => {
    if (!isDrawing.current) return;

    switch (selectedTool) {
      case Tools.Pencil:
      case Tools.Eraser:
      case Tools.Highlighter:
        let lastLine = forms[forms.length - 1];

        if (!isDrawing.current) return;

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
    if (isDrawing.current) {
      setIsEdited(true);
    }
    isDrawing.current = false;
  };
  const handleMouseOut = () => {
    if (isDrawing.current) {
      setIsEdited(true);
    }
    isDrawing.current = false;
  };
  const handleMouseWheel = (event: {
    target: { getStage: () => any };
    evt: { deltaY: number };
  }) => {
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
      case Tools.Highlighter:
      case Tools.Eraser:
        return "cursor-none";
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
      onMouseLeave={handleMouseOut}
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
            strokeWidth={value.tool == Tools.Eraser ? 18 : value.size}
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
