import GameController from './game.controller';
import GameMain from './game.main';

export default function GameArea() {
    return (
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
            <GameMain />
            <GameController />
        </div>
    );
}
