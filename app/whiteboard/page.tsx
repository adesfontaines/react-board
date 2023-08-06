'use client'
import Image from 'next/image'
import Toolbar from '../components/toolbar'
import NavigationBar from '../components/navigationBar'
import DrawingZone from '../components/drawingZone'
import WhiteboardBar from '../components/whiteboardBar'
import React from 'react'
import { Tools } from '../enums/tools'

export default function Whiteboard() {
  const [selectedTool, setSelectedTool] = React.useState(Tools.Select);
  
  const changeTool = (tool: Tools) =>
  {
    setSelectedTool(tool)
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavigationBar></NavigationBar>
      <WhiteboardBar></WhiteboardBar>
      <DrawingZone selectedTool={selectedTool} setSelectedTool={changeTool}></DrawingZone>
      <Toolbar selectedTool={selectedTool} setSelectedTool={changeTool} ></Toolbar>
    </main>
  )
}