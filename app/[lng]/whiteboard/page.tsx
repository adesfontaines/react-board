'use client'
import NavigationBar from '../../components/navigationBar'
import MainCanvas from '../../components/mainCanvas'
import React, { useRef } from 'react'
import { Tools } from '../../enums/tools'
import ZoomBar from '../../components/zoomBar'
import ToolbarBase from '@/app/components/toolbar/toolbarBase'
import { useTranslation } from '@/app/i18n/client'

export default function Whiteboard({ params: { lng} }) {
  const [selectedTool, setSelectedTool] = React.useState(Tools.Pencil);
  const [forms, setForms] = React.useState<Map<string, any>>(new Map());
  const [zoom, setZoom] = React.useState(1.0);
  const [currentColor, setCurrentColor] = React.useState("#000000");

  const drawingZoneRef = useRef<any>(null);

  const { t } = useTranslation(lng, 'common', {})

  
  const requestRedraw = () => {
    setTimeout(() => {
      if (drawingZoneRef.current) {

        drawingZoneRef.current.updateCanvas();
      }
    }, 10);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavigationBar lng={lng}></NavigationBar>
      <MainCanvas currentColor={currentColor} ref={drawingZoneRef} zoom={zoom} setZoom={setZoom} forms={forms} setForms={setForms} selectedTool={selectedTool}></MainCanvas>
      <ToolbarBase currentColor={currentColor} setCurrentColor={setCurrentColor} selectedTool={selectedTool} setSelectedTool={setSelectedTool} t={t} lng={lng} ></ToolbarBase>
      <ZoomBar zoom={zoom} setZoom={setZoom} requestRedraw={requestRedraw}></ZoomBar>
    </main>
  )
}
