'use client'
import { useRef } from 'react';
import { BOARD_SIZE } from './context';

export default function GameBoard() {
    // 计算Canvas尺寸
    const canvasSize = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.6);

    const canvasRef = useRef(null);
    function handleCanvasClick(){

    }
    function handleCanvasMouseMove(){

    }
    function handleCanvasMouseLeave(){

    }
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
