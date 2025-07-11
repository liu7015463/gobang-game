'use client';
import { useContext } from 'react';
import { GameContext, GameStateContext, isNil } from './context';

export default function GameStatus() {
    const context = useContext(GameContext);
    const stateContext = useContext(GameStateContext);

    return (
        <div id="gameStatus" className="mt-4 p-3 bg-secondary/20 rounded-lg text-center">
            <p id="statusText" className="font-medium">
                {stateContext.gameActive
                    ? `游戏进行中 - ${context.currentPlayer === 1 ? '黑棋' : '白棋'}回合`
                    : isNil(stateContext.winner)
                      ? '游戏结束 - 平局!'
                      : `${stateContext.winner === 1 ? '黑棋' : '白棋'}获胜!`}
            </p>
        </div>
    );
}
