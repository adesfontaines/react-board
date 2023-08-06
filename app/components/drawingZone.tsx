'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Tools } from '../whiteboard/page';

const DrawingZone: React.FC = ({selectedTool}) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
    let scale = 1.0;
    useEffect(() => {
        const canvas = canvasRef.current;
        if(canvas)
        {

        const context = canvas.getContext('2d');
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.strokeStyle = 'black';

        canvas.oncontextmenu = function () {
            return false;
        }
        canvas.width= window.innerWidth;
        canvas.height=window.innerHeight;
        
        function handleResize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
          }
      
          window.addEventListener('resize', handleResize);
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }

    }, []);

    const handleMouseDown = (event) => {
        if(selectedTool == Tools.Pencil)
        {
            setIsDrawing(true);
            setPrevPosition({
                x: event.clientX - canvasRef.current.offsetLeft,
                y: event.clientY - canvasRef.current.offsetTop,
            });
        }
    };

    const handleMouseMove = (event) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const currentPosition = {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
        };

        context.beginPath();
        context.moveTo(prevPosition.x, prevPosition.y);
        context.lineTo(currentPosition.x, currentPosition.y);
        context.stroke();

        setPrevPosition(currentPosition);
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
