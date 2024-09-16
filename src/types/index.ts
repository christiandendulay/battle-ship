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
