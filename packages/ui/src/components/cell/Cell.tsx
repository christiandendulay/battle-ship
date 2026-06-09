import { useBattleShipContext, useImageUrl } from '../../context';
import { RESULT_TYPE } from '../../types/enum';
import { Cell as CellType } from '../../types';
import { memo } from 'react';
import './Cell.css';

export type CellProps = {
  cell: CellType;
  row: number;
  column: number;
};

export function Cell({ cell, row, column }: CellProps) {
  const { updateBattleShip, isCellHit } = useBattleShipContext();
  const cellPosition = {
    x: row,
    y: column,
  };
  const isHit = isCellHit(cellPosition);

  const src = useImageUrl(isHit ? RESULT_TYPE.HIT : RESULT_TYPE.MISS);
  const { isActive } = cell;

  const handleOnClick = updateBattleShip(cellPosition);

  return (
    <button onClick={handleOnClick} disabled={isActive} className="cell">
      {isActive && src ? (
        <img className="cell__img" src={src} draggable={false} />
      ) : (
        <div className="cell__placeholder" />
      )}
    </button>
  );
}

export default memo(Cell);
