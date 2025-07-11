'use client';
import { createContext } from 'react';

export const BOARD_SIZE = 15; // 15x15的棋盘

/**
 * 游戏上下文context，主要保存currentPlayer，moveHistory
 */
export const GameContext = createContext({ currentPlayer: 0, moveHistory: [] });
/**
 * 游戏状态的context，主要保存gameActive，winner
 */
export const GameStateContext = createContext({ gameActive: false, winner: undefined });

/**
 *
 * @param obj
 */
export function isNil(obj: unknown) {
    return obj === null || obj === undefined;
}
