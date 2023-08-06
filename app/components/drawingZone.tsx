'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Tools } from '../enums/tools';

interface DrawingZoneProps {
    selectedTool: Tools;
    setSelectedTool: (tool: Tools) => void;
  }

const DrawingZone: React.FC<DrawingZoneProps>  = ({selectedTool, setSelectedTool}) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
    let scale = 1.0;
    useEffect(() => {
        if(canvasRef)
        {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;

        const context = (canvas as HTMLCanvasElement).getContext('2d');

        if(context)
        {
            context.lineWidth = 3;
            context.lineCap = 'round';
            context.strokeStyle = 'black';
    
            canvas.oncontextmenu = function () {
                return false;
            }
            canvas.width= window.innerWidth;
            canvas.height=window.innerHeight;
            
          
              window.addEventListener('resize', handleResize);
          
              return () => {
                window.removeEventListener('resize', handleResize);
              };
            }
        }
   

    }, []);

    const handleResize = () => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    const handleMouseDown = (event: { clientX: number; clientY: number; }) => {
        if(selectedTool == Tools.Pencil && canvasRef.current)
        {
            const canvas = canvasRef.current as HTMLCanvasElement;
            setIsDrawing(true);
            setPrevPosition({
                x: event.clientX - canvas.offsetLeft,
                y: event.clientY - canvas.offsetTop,
            });
        }
    };

    const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
        if (!isDrawing || !canvasRef.current) return;

        const canvas = canvasRef.current as HTMLCanvasElement;
        const context = canvas.getContext('2d');

        const currentPosition = {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
        };

        if(context)
        {
            context.beginPath();
            context.moveTo(prevPosition.x, prevPosition.y);
            context.lineTo(currentPosition.x, currentPosition.y);
            context.stroke();
            setPrevPosition(currentPosition);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };
    return (
        <canvas className="flex-1 w-full bg-gray-200"
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseUp}
        />
    );
};

export default DrawingZone;
