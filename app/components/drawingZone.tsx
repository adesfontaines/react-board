'use client'
import React, { useEffect, useRef, useState } from 'react';

const DrawingZone: React.FC = () => {
    const canvasRef = useRef(null);
    const drawingMode = useState('pencil');
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if(canvas)
        {

        const context = canvas.getContext('2d');
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.strokeStyle = 'black';

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
        setIsDrawing(true);
        setPrevPosition({
            x: event.clientX - canvasRef.current.offsetLeft,
            y: event.clientY - canvasRef.current.offsetTop,
        });
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
        />
    );
};

export default DrawingZone;
