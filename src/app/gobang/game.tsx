import { GameContext, GameStateContext } from './context';
import GameArea from './game.area';
import GameFooter from './game.footer';
import GameHead from './game.head';
import './gobang.css';

export default function Game() {
    return (
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <GameHead />
            <GameContext value={{ currentPlayer: 1, moveHistory: [] }}>
                <GameStateContext value={{ gameActive: false, winner: undefined }}>
                    <GameArea />
                </GameStateContext>
            </GameContext>
            <GameFooter />
        </div>
    );
}
