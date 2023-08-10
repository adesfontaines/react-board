"use client";
import NavigationBar from "../../components/navigationBar";
import MainCanvas from "../../components/mainCanvas";
import React, { useRef } from "react";
import { Tools } from "../../enums/tools";
import ZoomBar from "../../components/zoomBar";
import ToolbarBase from "@/app/components/toolbar";
import { useTranslation } from "@/app/i18n/client";
import { PiShareNetwork } from "react-icons/pi";
import { LuUpload } from "react-icons/lu";

export default function Whiteboard({
  params: { lng },
}: {
  params: any;
}): React.JSX.Element {
  const [selectedTool, setSelectedTool] = React.useState(Tools.Pencil);
  const [forms, setForms] = React.useState<Map<string, any>>(new Map());
  const [historyIndex, setHistoryIndex] = React.useState<number>(0);

  const [zoom, setZoom] = React.useState(1.0);
  const [currentColor, setCurrentColor] = React.useState("#000000");
  const [drawSize, setDrawSize] = React.useState(3);

  const drawingZoneRef = useRef<any>(null);

  const { t } = useTranslation(lng, "common");

  const requestRedraw = () => {
    setTimeout(() => {
      if (drawingZoneRef.current) {
        drawingZoneRef.current.updateCanvas();
      }
    }, 10);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavigationBar
        t={t}
        lng={lng}
        childleft={
          <button
            onClick={() => drawingZoneRef.current.exportCanvas()}
            className="ml-2 p-2 rounded hover:bg-blue-300"
          >
            <LuUpload size={28} />
          </button>
        }
        childright={
          <button>
            <PiShareNetwork size={28} />
          </button>
        }
      ></NavigationBar>
      <MainCanvas
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
        drawSize={drawSize}
        currentColor={currentColor}
        ref={drawingZoneRef}
        zoom={zoom}
        setZoom={setZoom}
        forms={forms}
        setForms={setForms}
        selectedTool={selectedTool}
      ></MainCanvas>
      <ToolbarBase
        maxHistory={forms.size}
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
        drawSize={drawSize}
        setDrawSize={setDrawSize}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        t={t}
        lng={lng}
        requestRedraw={requestRedraw}
      ></ToolbarBase>
      <ZoomBar
        zoom={zoom}
        setZoom={setZoom}
        t={t}
        lng={lng}
        requestRedraw={requestRedraw}
      ></ZoomBar>
    </main>
  );
}
