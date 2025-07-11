'use client';
import { useRef, useEffect, useState } from 'react';
import { BOARD_SIZE } from './context';

export default function GameBoard() {
    const [canvasSize, setCanvasSize] = useState(400); // 默认尺寸

    useEffect(() => {
        // 在客户端计算Canvas尺寸
        const size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.6);
        setCanvasSize(size);
    }, []);

    const canvasRef = useRef(null);
    function handleCanvasClick() {}
    function handleCanvasMouseMove() {}
    function handleCanvasMouseLeave() {}
    return (
        <div
            className="aspect-square bg-board rounded-lg shadow-lg overflow-hidden board-grid"
            style={{ backgroundSize: `calc(100% / ${BOARD_SIZE - 1}) calc(100% / ${BOARD_SIZE - 1})` }}
        >
            <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                className="w-full h-full cursor-pointer"
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={handleCanvasMouseLeave}
            ></canvas>
        </div>
    );
}
