'use client';
import { useEffect, useState, Ref } from 'react';
import { BOARD_SIZE } from './context';

export default function GameBoard({
    canvasRef,
    handleCanvasClickAction,
    handleCanvasMouseMoveAction,
    handleCanvasMouseLeaveAction,
}: {
    canvasRef: Ref<HTMLCanvasElement>;
    handleCanvasClickAction: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    handleCanvasMouseMoveAction: (e: React.MouseEvent<HTMLCanvasElement>) => void;
    handleCanvasMouseLeaveAction: () => void;
}) {
    const [canvasSize, setCanvasSize] = useState(400); // 默认尺寸

    useEffect(() => {
        // 在客户端计算Canvas尺寸
        const size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.6);
        setCanvasSize(size);
    }, []);

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
                onClick={(e) => handleCanvasClickAction(e)}
                onMouseMove={(e) => handleCanvasMouseMoveAction(e)}
                onMouseLeave={() => handleCanvasMouseLeaveAction()}
            ></canvas>
        </div>
    );
}
