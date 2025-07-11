import GameBoard from './game.board';
import GameStatus from './game.status';

export default function GameMain() {
    return (
        <div className="flex-1 relative">
            <GameBoard />
            <GameStatus />
        </div>
    );
}
