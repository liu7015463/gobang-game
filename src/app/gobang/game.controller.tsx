import GameInfo from './game.info';
import GameOperate from './game.operate';
import GameRule from './game.rule';

export default function GameController() {
    return (
        <div className="w-full md:w-80 flex flex-col gap-6">
            <GameInfo />
            <GameRule />
            <GameOperate />
        </div>
    );
}
