import { createContext, useContext } from 'react';
import { createInitialGridState } from '../utils/createInitialGridState';
import { Cell, Coordinate, ShipLayout, ShipType } from '../types';

export type BattleShipContextType = {
  battleShip: Cell[][];
  shipTypes: ShipType;
  layout: ShipLayout[];
  updateBattleShip: (__coordinate: Coordinate) => () => void;
  isCellHit: (__coordinate: Coordinate) => boolean;
  checkIfAllHit: () => boolean;
  resetBoard: () => void;
};

export const BattleShipContext = createContext<BattleShipContextType>({
  battleShip: createInitialGridState({
    columns: 10,
    rows: 10,
  }),
  shipTypes: {},
  layout: [],
  /* eslint-disable @typescript-eslint/no-unused-vars */
  updateBattleShip: (__coordinate: Coordinate) => () => {},
  isCellHit: (__coordinate: Coordinate) => false,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  checkIfAllHit: () => false,
  resetBoard: () => {},
});

export function useBattleShipContext() {
  const context = useContext(BattleShipContext);

  if (!context) {
    throw Error('Battle Ship Context is undefined');
  }
  return context;
}
