export default function GameOperate({
    handleRestartAction,
    handleUndoAction,
}: {
    handleRestartAction: () => void;
    handleUndoAction: () => void;
}) {
    return (
        <div className="flex gap-3">
            <button
                id="restartBtn"
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium btn-hover flex items-center justify-center"
                onClick={() => handleRestartAction()}
            >
                <i className="fa-solid fa-refresh mr-2"></i>重新开始
            </button>
            <button
                id="undoBtn"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium btn-hover flex items-center justify-center"
                onClick={() => handleUndoAction()}
            >
                <i className="fa-solid fa-undo mr-2"></i>悔棋
            </button>
        </div>
    );
}
