import { Cell } from '../types';

/**
 * Creates an initial grid state as a 2D array of cells.
 *
 * @param {Object} params - The parameters for configuring the grid.
 * @param {number} params.rows - The number of rows in the grid.
 * @param {number} params.columns - The number of columns in the grid.
 * @returns {Cell[][]} A 2D array representing the grid state, where each cell has
 *                      `isActive` set to `false`.
 *
 * @typedef {Object} Cell
 * @property {boolean} isActive - Indicates whether the cell is active.
 */
export const createInitialGridState = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}): Cell[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ isActive: false })),
  );
};
