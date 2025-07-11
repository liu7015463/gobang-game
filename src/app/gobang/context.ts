'use client';
import { createContext } from 'react';

export const BOARD_SIZE = 15; // 15x15的棋盘

/**
 * 游戏上下文context，主要保存currentPlayer，moveHistory
 */
// 定义游戏上下文类型
export type GameContextValue = {
    currentPlayer: number;
    moveHistory: { row: number; col: number }[];
};

export const GameContext = createContext<GameContextValue>({ currentPlayer: 0, moveHistory: [] });
/**
 * 游戏状态的context，主要保存gameActive，winner
 */
// 定义游戏状态类型
export type GameState = {
    gameActive: boolean;
    winner: number | null;
};

export const GameStateContext = createContext<GameState>({ gameActive: false, winner: null });

//初始玩家  1-黑棋 0-白棋
export const STARTER_PLAYER = 1;

/**
 *
 * @param obj
 */
export function isNil(obj: unknown) {
    return obj === null || obj === undefined;
}
