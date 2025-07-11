import { useContext } from 'react';
import { GameContext } from './context';

export default function GameInfo() {
    const context = useContext(GameContext);
    return (
        <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
                <i className="fa-solid fa-info-circle mr-2 text-primary"></i>游戏信息
            </h2>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">当前回合</span>
                    <div className="flex items-center">
                        <div
                            id="currentPlayer"
                            className={`w-6 h-6 rounded-full ${context.currentPlayer === 1 ? 'bg-black' : 'bg-white border border-gray-300'} mr-2 piece-shadow`}
                        ></div>
                        <span id="playerText">{context.currentPlayer === 1 ? '黑棋' : '白棋'}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">游戏时间</span>
                    <span id="gameTime" className="font-mono">
                        00:00
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">步数</span>
                    <span id="moveCount">{context.moveHistory.length}</span>
                </div>
            </div>
        </div>
    );
}
