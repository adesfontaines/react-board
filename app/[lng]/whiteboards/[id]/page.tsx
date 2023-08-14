"use client";
import NavigationBar from "../../../components/navigationBar";
import React, { useEffect, useRef } from "react";
import { Tools } from "../../../enums/tools";
import ZoomBar from "../../../components/zoomBar";
import ToolbarBase from "@/app/components/toolbar";
import { useTranslation } from "@/app/i18n/client";
import {
  PiCloudArrowUp,
  PiHouse,
  PiUpload,
  PiCloudCheck,
} from "react-icons/pi";
import Link from "next/link";
import dynamic from "next/dynamic";
import DrawingCursor from "@/app/components/drawingCursor";
import { getBoardByIdAction, updateBoardAction } from "@/app/_action";
import { BoardClass } from "@/app/models/board";

const Canvas = dynamic(() => import("../../../components/wrappedCanvas"), {
  ssr: false,
});

export default function Whiteboard({ params: { lng, id } }: { params: any }) {
  const [selectedTool, setSelectedTool] = React.useState(Tools.Pencil);
  const [forms, setForms] = React.useState<any[]>();
  const [historyIndex, setHistoryIndex] = React.useState<number>(0);

  const [board, setBoard] = React.useState<BoardClass>();
  const [zoom, setZoom] = React.useState(1.0);
  const [currentColor, setCurrentColor] = React.useState("#000000");
  const [drawSize, setDrawSize] = React.useState(3);

  const [isEdited, setIsEdited] = React.useState(false);

  const drawingZoneRef = useRef<any>(null);

  const { t } = useTranslation(lng, "common");

  useEffect(() => {
    getBoardByIdAction({ ownerId: "", id: id, path: "/" }).then((data) => {
      if (data.board && !data.error) {
        setBoard(data.board);
        setForms(data.board.drawings);
        setHistoryIndex(data.board.drawings.length);
      }
    });

    const timer = setTimeout(() => isEdited && saveBoard(), 10000);
    return () => clearTimeout(timer);
  }, [id, isEdited]);

  const updateScale = (newScale: number) => {
    if (drawingZoneRef.current) {
      drawingZoneRef.current.updateScale(newScale);
    }
  };

  async function saveBoard(): Promise<void> {
    if (!board) return;

    const updatedBoard = board;
    updatedBoard.drawings = forms!;
    setBoard(updatedBoard);
    setIsEdited(false);
    await updateBoardAction(updatedBoard._id, board, "/");
  }

  if (board)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <DrawingCursor tool={selectedTool} color={currentColor}></DrawingCursor>
        <NavigationBar
          lng={lng}
          childleft={
            <div className="flex items-center">
              <div className="ml-2 p-2 rounded hover:bg-sky-600">
                <Link href="/">
                  <PiHouse size={24} />
                </Link>
              </div>
              <Link href={"/" + lng}>
                <h2>Whiteboard</h2>
              </Link>
              <button
                onClick={() => drawingZoneRef.current.exportCanvas()}
                className="ml-2 p-2 rounded hover:bg-sky-600"
              >
                <PiUpload size={24} />
              </button>
              <div className="ml-2 p-2">
                {isEdited ? (
                  <PiCloudArrowUp size={24} />
                ) : (
                  <PiCloudCheck size={24} />
                )}
              </div>
            </div>
          }
        ></NavigationBar>
        <Canvas
          historyIndex={historyIndex}
          setHistoryIndex={setHistoryIndex}
          drawSize={drawSize}
          currentColor={currentColor}
          canvasRef={drawingZoneRef}
          setZoom={setZoom}
          forms={forms}
          setForms={setForms}
          selectedTool={selectedTool}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
        ></Canvas>
        <ToolbarBase
          maxHistory={forms.length}
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
        ></ToolbarBase>
        <ZoomBar
          zoom={zoom}
          updateScale={updateScale}
          t={t}
          lng={lng}
        ></ZoomBar>
      </main>
    );
  else <h1>BOARD NOT FOUND</h1>;
}
