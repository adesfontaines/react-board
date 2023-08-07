'use client'
import Image from 'next/image'
import Toolbar from '../components/toolbar'
import NavigationBar from '../components/navigationBar'
import DrawingZone from '../components/drawingZone'
import React from 'react'
import { Tools } from '../enums/tools'
import ZoomBar from '../components/zoomBar'

export default function Whiteboard() {
  const [selectedTool, setSelectedTool] = React.useState(Tools.Select);
  const [historyPosition, setHistoryPosition] = React.useState(0);
  const [drawings, setDrawings] = React.useState<any[]>([]);
  const [zoom, setZoom] = React.useState(1.0);
  
  const changeTool = (tool: Tools) =>
  {
    setSelectedTool(tool)
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavigationBar></NavigationBar>
      <DrawingZone zoom={zoom} setZoom={setZoom}drawings={drawings} setDrawings={setDrawings} selectedTool={selectedTool} historyPosition={historyPosition}></DrawingZone>
      <Toolbar selectedTool={selectedTool} setSelectedTool={changeTool} ></Toolbar>
      <ZoomBar zoom={zoom} setZoom={setZoom}></ZoomBar>
    </main>
  )
}
