'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Tools } from '../enums/tools';

interface DrawingZoneProps {
    selectedTool: Tools;
    setSelectedTool: (tool: Tools) => void;
}

const DrawingZone: React.FC<DrawingZoneProps> = ({ selectedTool, setSelectedTool }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [drawings, setDrawings] = useState<any[]>([]);

    let zoom = 1.0;
    useEffect(() => {
        if (canvasRef) {
            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            const context = (canvas as HTMLCanvasElement).getContext('2d');

            if (context) {
                context.lineWidth = 3;
                context.lineCap = 'round';
                context.strokeStyle = 'black';
            }

            canvas.oncontextmenu = function () {
                return false;
            }

            redrawCanvas();

            window.addEventListener('resize', redrawCanvas);

            return () => {
                window.removeEventListener('resize', redrawCanvas);
            };
        }


    }, []);

    const toScreenX = (xTrue: number) => {
        return (xTrue + offset.x) * zoom;
    }
    const toScreenY = (yTrue: number) => {
        return (yTrue + offset.y) * zoom;
    }
    const toTrueX = (xScreen: number) => {
        return (xScreen / zoom) - offset.x;
    }
    const toTrueY = (yScreen: number) => {
        return (yScreen / zoom) - offset.y;
    }

    const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const context = (canvas as HTMLCanvasElement).getContext('2d');

        if (!context) return;
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = '#000';
        context.lineWidth = 2;
        context.stroke();
    }
    const redrawCanvas = () => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;

        const context = (canvas as HTMLCanvasElement).getContext('2d');

        if (context) {
            // set the canvas to the size of the window
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;

            for (let i = 0; i < drawings.length; i++) {
                const line = drawings[i];
                drawLine(toScreenX(line.x0), toScreenY(line.y0), toScreenX(line.x1), toScreenY(line.y1));
            }
        }
    }

    const handleMouseDown = (event: { clientX: number; clientY: number; }) => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        setIsDrawing(true);
        setPrevPosition({
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
        });
    };

    const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
        if (!isDrawing || !canvasRef.current) return;

        const canvas = canvasRef.current as HTMLCanvasElement;

        const currentPosition = {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
        };

        const scaledX = toTrueX(currentPosition.x);
        const scaledY = toTrueY(currentPosition.y);
        const prevScaledX = toTrueX(prevPosition.x);
        const prevScaledY = toTrueY(prevPosition.y);


        if (selectedTool == Tools.Pencil) {
            // add the line to our drawing history
            setDrawings((prevDrawings) => [
                ...prevDrawings,
                { x0: prevScaledX, y0: prevScaledY, x1: scaledX, y1: scaledY },
            ]);

            // draw a line
            drawLine(prevPosition.x, prevPosition.y, currentPosition.x, currentPosition.y);
        }
        else if (selectedTool == Tools.Select) {
            // move the screen
            setOffset({
                x: offset.x + (currentPosition.x - prevPosition.x) / zoom,
                y: offset.y + (currentPosition.y - prevPosition.y) / zoom
            });
            redrawCanvas();
        }
        setPrevPosition(currentPosition);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };
    const handleMouseWheel = (event: { deltaY: any; pageX: number; pageY: number; }) => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;

        const deltaY = event.deltaY;
        const scaleAmount = -deltaY / 500;
        zoom = zoom * (1 + scaleAmount);

        // zoom the page based on where the cursor is
        var distX = event.pageX / canvas.clientWidth;
        var distY = event.pageY / canvas.clientHeight;

        // calculate how much we need to zoom
        const unitsZoomedX = (canvas.clientWidth / zoom) * scaleAmount;
        const unitsZoomedY = (canvas.clientHeight / zoom) * scaleAmount;

        const unitsAddLeft = unitsZoomedX * distX;
        const unitsAddTop = unitsZoomedY * distY;

        offsetX -= unitsAddLeft;
        offsetY -= unitsAddTop;

        redrawCanvas();
    }


    const cursorStyle = () => {
        switch (selectedTool) {

            case Tools.Select:
                return 'cursor-pointer'
            case Tools.Text:
                return 'cursor-text'
            default:
                return '';
        }
    };
    return (
        <canvas className={cursorStyle() + " fixed top-0 left-0 absolute w-full h-full bg-gray-200"}
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseUp}
            onWheel={handleMouseWheel}
        />
    );
};

export default DrawingZone;
