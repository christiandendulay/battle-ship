import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { BattleShipContextType, BattleShipContext } from '../../context/battleship-context';
import { Cell, Coordinate, ShipLayout, ShipType } from '../../types';
import { createInitialGridState } from '../../utils/createInitialGridState';

type BattleShipProviderProps = PropsWithChildren<{
  shipTypes: ShipType;
  layout: ShipLayout[];
}>;

const initializeBoard = createInitialGridState({
  columns: 10,
  rows: 10,
});

export function BattleShipProvider({ shipTypes, layout, children }: BattleShipProviderProps) {
  const [battleShip, setBattleShip] = useState<Cell[][]>(initializeBoard);
  const allShipPositions = useMemo(() => layout.flatMap(({ positions }) => positions), [layout]);

  const updateBattleShip = useCallback(
    ({ x, y }: Coordinate) =>
      () => {
        setBattleShip((prevState) =>
          prevState.map((rowArr, rowIndex) =>
            rowIndex === x
              ? rowArr.map((cell, colIndex) =>
                  colIndex === y ? { ...cell, isActive: true } : cell,
                )
              : rowArr,
          ),
        );
      },
    [],
  );
  const checkIfAllHit = useCallback(() => {
    return allShipPositions.every(([x, y]) => battleShip[x][y].isActive);
  }, [allShipPositions, battleShip]);

  const isCellHit = useCallback(
    ({ x, y }: Coordinate) => {
      return allShipPositions.some((position) => position[0] === x && position[1] == y);
    },
    [allShipPositions],
  );
  const resetBoard = useCallback(() => {
    setBattleShip(initializeBoard);
  }, []);

  const value: BattleShipContextType = useMemo(() => {
    return {
      shipTypes,
      layout,
      battleShip,
      updateBattleShip,
      isCellHit,
      checkIfAllHit,
      resetBoard,
    };
  }, [shipTypes, layout, battleShip, updateBattleShip, isCellHit, checkIfAllHit, resetBoard]);

  return <BattleShipContext.Provider value={value}>{children}</BattleShipContext.Provider>;
}
