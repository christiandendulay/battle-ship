import { RESULT_TYPE, SHIP_TYPE } from './enum';

export type ShipDetails = {
  size: number;
  count: number;
};

export type ShipType = {
  [key: string]: ShipDetails;
};

export type ShipLayout = {
  ship: string;
  positions: [number, number][];
};

export type Cell = {
  isActive: boolean;
};

export type Coordinate = { x: number; y: number };

export const ASSET_KEYS = [...Object.values(SHIP_TYPE), ...Object.values(RESULT_TYPE)];
