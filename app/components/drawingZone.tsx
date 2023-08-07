'use client'
import React, { Ref, RefObject, useEffect, useRef, useState } from 'react';
import { Tools } from '../enums/tools';

interface DrawingZoneProps {
    selectedTool: Tools;
    drawings: any[];
    setDrawings: (tool: any[]) => void;
    zoom: number;
    setZoom: (zoom: number) => void;
    ref: React.ForwardedRef<unknown>;
}

const DrawingZone: React.ForwardRefRenderFunction<HTMLCanvasElement, DrawingZoneProps> = (
    { selectedTool, drawings, setDrawings, zoom, setZoom },
    ref
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Pass the ref object to useImperativeHandle

    useEffect(() => {
        if (canvasRef) {
            const canvas = canvasRef.current as unknown as HTMLCanvasElement;
            const context = (canvas as HTMLCanvasElement).getContext('2d');

            if (context) {
                context.lineWidth = 4;
                context.lineCap = 'round';
                context.strokeStyle = 'black';

                // Set text style properties
                context.fillStyle = 'black';
                context.font = '32px Arial';
            }

            canvas.oncontextmenu = function () {
                return false;
            }

            updateCanvas();

            window.addEventListener('resize', updateCanvas);

            return () => {
                window.removeEventListener('resize', updateCanvas);
            };
        }


    }, []);

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
        context.stroke();
    }
    const updateCanvas = () => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const context = (canvas as HTMLCanvasElement).getContext('2d');

        if (!context) return;

        // set the canvas to the size of the window
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;

        context.scale(zoom, zoom);
        context.translate(offset.x, offset.y);

        for (let i = 0; i < drawings.length; i++) {
            const draw = drawings[i];
            if (draw.text) {
                context.fillText(draw.text, draw.x0, draw.y0);
            }
            else {
                drawLine(draw.x0, draw.y0, draw.x1, draw.y1);
            }
        };

    }

    React.useImperativeHandle(ref, () => refObject);

    const refObject: any = {
        updateCanvas: updateCanvas
    };

    const handleMouseDown = (event: { clientX: number; clientY: number; }) => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const currentPosition = {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
        };

        setIsDrawing(true);
        setPrevPosition({
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop,
        });

        if (selectedTool == Tools.Text) {
            const scaledX = toTrueX(currentPosition.x);
            const scaledY = toTrueY(currentPosition.y);

            const text = 'Hello world !'; // Replace with the text you want to add
            setDrawings([
                ...drawings,
                { text: text, x0: scaledX, y0: scaledY }
            ]);

            const context = (canvas as HTMLCanvasElement).getContext('2d');

            // Draw the text on the canvas
            context?.fillText(text, scaledX, scaledY);
        }
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

        switch (selectedTool) {
            case Tools.Pencil:
                // add the line to our drawing history
                setDrawings([
                    ...drawings,
                    { x0: prevScaledX, y0: prevScaledY, x1: scaledX, y1: scaledY }
                ]);
                // draw a line
                drawLine(prevScaledX, prevScaledY, scaledX, scaledY);
                break;
            case Tools.Select:
                // move the screen
                setOffset({
                    x: offset.x + (currentPosition.x - prevPosition.x) / zoom,
                    y: offset.y + (currentPosition.y - prevPosition.y) / zoom
                });
                updateCanvas();
                break;
            case Tools.Eraser:
                // Remove lines within a certain range from the current position
                const radius = 6; // Adjust this value as needed
                const linesToRemove = drawings.filter((line) => {
                    const distance = Math.sqrt(
                        Math.pow(toTrueX(prevPosition.x) - line.x0, 2) +
                        Math.pow(toTrueY(prevPosition.y) - line.y0, 2)
                    );
                    return distance <= radius;
                });
                setDrawings(drawings.filter((line) => !linesToRemove.includes(line)));
                updateCanvas();
                break;
        };
        setPrevPosition(currentPosition);

    }

    const handleMouseUp = () => {
        setIsDrawing(false);
    };
    const handleMouseWheel = (event: { deltaY: any; pageX: number; pageY: number; clientX: number; clientY: number }) => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;

        const deltaY = event.deltaY;
        const scaleAmount = -deltaY / 500;
        let newZoom = zoom * (1 + scaleAmount);

        if (newZoom < 0.25)
            newZoom = 0.25;

        if (newZoom > 5)
            newZoom = 5;

        if (newZoom == zoom) return;

        setZoom(newZoom);
        // zoom the page based on where the cursor is
        var distX = event.pageX / canvas.clientWidth;
        var distY = event.pageY / canvas.clientHeight;

        // calculate how much we need to zoom
        const unitsZoomedX = (canvas.clientWidth / zoom) * scaleAmount;
        const unitsZoomedY = (canvas.clientHeight / zoom) * scaleAmount;

        const unitsAddLeft = unitsZoomedX * distX;
        const unitsAddTop = unitsZoomedY * distY;

        setOffset({
            x: offset.x - unitsAddLeft,
            y: offset.y - unitsAddTop
        })

        updateCanvas();
    }


    const cursorStyle = () => {
        switch (selectedTool) {
            case Tools.Select:
                return 'cursor-pointer';
            case Tools.Pencil:
                return 'cursor-crosshair'
            case Tools.Text:
                return 'cursor-text'
            default:
                return '';
        }
    };
    return (
        <canvas className={cursorStyle() + " fixed top-0 left-0 absolute w-full h-full bg-slate-100"}
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseOut={handleMouseUp}
            onWheel={handleMouseWheel}
        />
    );
};
DrawingZone.displayName = 'DrawingZone';
export default DrawingZone;