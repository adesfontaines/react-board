'use client'
import NavigationBar from '../../components/navigationBar'
import DrawingZone from '../../components/drawingZone'
import React, { useRef } from 'react'
import { Tools } from '../../enums/tools'
import ZoomBar from '../../components/zoomBar'
import { Toolbar } from '@/app/components/toolbar'

export default function Whiteboard({ params: { lng } }) {
  const [selectedTool, setSelectedTool] = React.useState(Tools.Select);
  const [drawings, setDrawings] = React.useState<any[]>([]);
  const [zoom, setZoom] = React.useState(1.0);

  const drawingZoneRef = useRef<any>(null);

  const requestRedraw = () => {
    setTimeout(() => {
      if (drawingZoneRef.current) {

        drawingZoneRef.current.updateCanvas();
      }
    }, 10);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavigationBar></NavigationBar>
      <DrawingZone ref={drawingZoneRef} zoom={zoom} setZoom={setZoom} drawings={drawings} setDrawings={setDrawings} selectedTool={selectedTool}></DrawingZone>
      <Toolbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} lng={lng} ></Toolbar>
      <ZoomBar zoom={zoom} setZoom={setZoom} requestRedraw={requestRedraw}></ZoomBar>
    </main>
  )
}
