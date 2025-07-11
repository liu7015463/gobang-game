'use client';
import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE, GameContext, GameStateContext, STARTER_PLAYER } from './context';
import GameFooter from './game.footer';
import GameHead from './game.head';
import './gobang.css';
import GameBoard from './game.board';
import GameStatus from './game.status';
import GameInfo from './game.info';
import GameOperate from './game.operate';
import GameRule from './game.rule';

export default function Game() {
    const [gameBoard, setGameBoard] = useState(
        Array(BOARD_SIZE)
            .fill([])
            .map(() => Array(BOARD_SIZE).fill(-1)),
    );
    //当前玩家  1-黑棋  0-白棋
    const [currentPlayer, setCurrentPlayer] = useState(STARTER_PLAYER);
    //游戏是否进行中
    const [gameActive, setGameActive] = useState(true);
    //
    const [winner, setWinner] = useState<number | null>(null);
    //
    const [moveHistory, setMoveHistory] = useState<{ row: number; col: number }[]>([]);

    const [gameTime, setGameTime] = useState(0);
    const [showModal, setShowModal] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        initGame();
        startTimer();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        drawBoard();
    }, [gameBoard]);

    useEffect(() => {
        const minutes = Math.floor(gameTime / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (gameTime % 60).toString().padStart(2, '0');
        const timeElement = document.getElementById('gameTime');
        if (timeElement) {
            timeElement.textContent = `${minutes}:${seconds}`;
        }
    }, [gameTime]);

    useEffect(() => {
        if (winner !== null) {
            setShowModal(true);
            setGameActive(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, [winner]);

    /**
     * 初始化
     */
    function initGame() {
        setGameBoard(
            Array(BOARD_SIZE)
                .fill([])
                .map(() => Array(BOARD_SIZE).fill(-1)),
        );
        setCurrentPlayer(STARTER_PLAYER);
        setGameActive(true);
        setGameTime(0);
        setMoveHistory([]);
        setShowModal(false);
        setWinner(null);

        drawBoard();
    }

    function startTimer() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => setGameTime((p) => p + 1), 1000);
    }

    function starterPoints() {
        return [
            { x: 3, y: 3 },
            { x: 3, y: 11 },
            { x: 7, y: 7 },
            { x: 11, y: 3 },
            { x: 11, y: 11 },
        ];
    }
    /**
     *
     */
    function drawBoard() {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        const cell_size = canvas.width / (BOARD_SIZE - 1);
        const piece_size = cell_size * 0.8;

        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 1.5;

        for (let i = 0; i < BOARD_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * cell_size);
            ctx.lineTo(canvas.width, i * cell_size);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(i * cell_size, 0);
            ctx.lineTo(i * cell_size, canvas.height);
            ctx.stroke();
        }

        starterPoints().forEach((point) => {
            ctx.beginPath();
            ctx.arc(point.x * cell_size, point.y * cell_size, 4, 0, Math.PI);
            ctx.fillStyle = '#8B4513';
            ctx.fill();
        });

        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (gameBoard[i][j] !== -1) {
                    drawPiece(ctx, i, j, gameBoard[i][j], cell_size, piece_size);
                }
            }
        }
    }

    /**
     * 绘制棋子
     * @param ctx
     * @param row
     * @param col
     * @param player
     * @param cellSize
     * @param pieceSize
     */
    function drawPiece(
        ctx: CanvasRenderingContext2D,
        row: number,
        col: number,
        player: number,
        cellSize: number,
        pieceSize: number,
    ) {
        const x = col * cellSize;
        const y = row * cellSize;

        ctx.beginPath();
        ctx.arc(x, y, pieceSize / 2 + 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, pieceSize / 2, 0, Math.PI * 2);

        if (player === 1) {
            const gradient = ctx.createRadialGradient(
                x - pieceSize / 6,
                y - pieceSize / 6,
                pieceSize / 10,
                x,
                y,
                pieceSize / 2,
            );
            gradient.addColorStop(0, '#555');
            gradient.addColorStop(1, '#000');
            ctx.fillStyle = gradient;
        } else {
            const gradient = ctx.createRadialGradient(
                x - pieceSize / 6,
                y - pieceSize / 6,
                pieceSize / 10,
                x,
                y,
                pieceSize / 2,
            );
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(1, '#ddd');
            ctx.fillStyle = gradient;
        }
        ctx.fill();

        ctx.strokeStyle = player === 1 ? '#333' : '#ccc';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    /**
     * 检查胜利条件
     * @param row
     * @param col
     * @param player
     */
    function checkWin(row: number, col: number, player: number) {
        const directions = [
            [1, 0], // 水平
            [0, 1], // 垂直
            [1, 1], // 对角线
            [1, -1], // 反对角线
        ];

        for (const [dx, dy] of directions) {
            let count = 1; // 当前位置已经有一个棋子

            // 正向检查
            for (let i = 1; i < 5; i++) {
                const newRow = row + i * dy;
                const newCol = col + i * dx;

                if (newRow < 0 || newRow >= BOARD_SIZE || newCol < 0 || newCol >= BOARD_SIZE) {
                    break;
                }

                if (gameBoard[newRow][newCol] === player) {
                    count++;
                } else {
                    break;
                }
            }

            // 反向检查
            for (let i = 1; i < 5; i++) {
                const newRow = row - i * dy;
                const newCol = col - i * dx;

                if (newRow < 0 || newRow >= BOARD_SIZE || newCol < 0 || newCol >= BOARD_SIZE) {
                    break;
                }

                if (gameBoard[newRow][newCol] === player) {
                    count++;
                } else {
                    break;
                }
            }

            if (count >= 5) {
                return true;
            }
        }

        return false;
    }

    /**
     * 检查平局
     */
    function checkDraw() {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (gameBoard[i][j] === -1) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 下棋
     */
    function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
        if (!gameActive) return;

        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // 计算点击的格子坐标
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const CELL_SIZE = canvas.width / (BOARD_SIZE - 1);
        const col = Math.round(x / CELL_SIZE);
        const row = Math.round(y / CELL_SIZE);

        // 检查坐标是否在棋盘内且为空
        if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && gameBoard[row][col] === -1) {
            // 更新棋盘状态
            setGameBoard((prevBoard) => {
                const newBoard = [...prevBoard];
                newBoard[row][col] = currentPlayer;
                return newBoard;
            });

            // 更新历史记录
            setMoveHistory((prevHistory) => [...prevHistory, { row, col }]);

            // 检查是否胜利
            if (checkWin(row, col, currentPlayer)) {
                setWinner(currentPlayer);
                return;
            }

            // 检查是否平局
            if (checkDraw()) {
                setGameActive(false);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
                const statusElement = document.getElementById('statusText');
                if (statusElement) {
                    statusElement.textContent = '游戏结束 - 平局!';
                }
                return;
            }

            // 切换玩家
            setCurrentPlayer((p) => 1 - p);
        }
    }

    /**
     * 鼠标悬停预览效果
     */
    function handleCanvasMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
        if (!gameActive) {
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // 计算鼠标所在的格子坐标
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const cellSize = canvas.width / (BOARD_SIZE - 1);
        const col = Math.round(x / cellSize);
        const row = Math.round(y / cellSize);

        // 清除之前的预览并重新绘制棋盘
        drawBoard();

        // 如果坐标在棋盘内且为空，绘制预览棋子
        if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && gameBoard[row][col] === -1) {
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return;
            }
            const pieceSize = cellSize * 0.8;

            ctx.beginPath();
            ctx.arc(col * cellSize, row * cellSize, pieceSize / 2, 0, Math.PI * 2);

            if (currentPlayer === 1) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            } else {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            }

            ctx.fill();
        }
    }

    /**
     * 鼠标离开棋盘
     */
    function handleCanvasMouseLeave() {
        drawBoard();
    }
    /**
     * 重新开始
     */
    function handleRestart() {
        initGame();
        startTimer();
    }

    /**
     * 悔棋
     */
    function handleUndo() {
        const steps = moveHistory.length;
        if (moveHistory.length === 0 || !gameActive) {
            return;
        }

        const lastMove = moveHistory[moveHistory.length - 1];

        setGameBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[lastMove.row][lastMove.col] = 0;
            return newBoard;
        });

        setMoveHistory((prevHistory) => prevHistory.slice(0, -1));
        setCurrentPlayer(steps % 2 === 1 ? 1 - STARTER_PLAYER : STARTER_PLAYER); // 回到上一个玩家
    }

    return (
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <GameHead />
            <GameContext.Provider value={{ currentPlayer: currentPlayer, moveHistory: moveHistory }}>
                <GameStateContext.Provider value={{ gameActive: gameActive, winner: winner }}>
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                        <div className="flex-1 relative">
                            <GameBoard
                                canvasRef={canvasRef}
                                handleCanvasClick={handleCanvasClick}
                                handleCanvasMouseMove={handleCanvasMouseMove}
                                handleCanvasMouseLeave={handleCanvasMouseLeave}
                            />
                            <GameStatus />
                        </div>
                        <div className="w-full md:w-80 flex flex-col gap-6">
                            <GameInfo />
                            <GameRule />
                            <GameOperate handleRestart={handleRestart} handleUndo={handleUndo} />
                        </div>
                    </div>
                </GameStateContext.Provider>
            </GameContext.Provider>
            <GameFooter />
        </div>
    );
}
