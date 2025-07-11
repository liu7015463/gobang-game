'use client';
import { GameContext, GameStateContext } from './context';
import GameController from './game.controller';
import GameFooter from './game.footer';
import GameHead from './game.head';
import GameMain from './game.main';
import './gobang.css';

export default function Game() {
    return (
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <GameHead />
            <GameContext.Provider value={{ currentPlayer: 1, moveHistory: [] }}>
                <GameStateContext.Provider value={{ gameActive: false, winner: undefined }}>
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                        <GameMain />
                        <GameController />
                    </div>
                </GameStateContext.Provider>
            </GameContext.Provider>
            <GameFooter />
        </div>
    );
}
