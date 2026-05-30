import { memo } from 'react';
import { useBattleShipContext } from '../../context/battleship-context';
import { Cell as CellType } from '../../types';
import './Cell.css';
import { getAssetUrl } from '../../utils/assets';
import { RESULT_TYPE } from '../../types/enum';


export type CellProps = {
  cell: CellType;
  row: number;
  column: number;
};

export function Cell({ cell, row, column }: CellProps) {
  const { updateBattleShip, isCellHit } = useBattleShipContext();
  const { isActive } = cell;
  const cellPosition = {
    x: row,
    y: column,
  };
  const handleOnClick = updateBattleShip(cellPosition);

  const isHit = isCellHit(cellPosition);
  const src =   getAssetUrl(isHit ? RESULT_TYPE.HIT : RESULT_TYPE.MISS);
  return (
    <button onClick={handleOnClick} disabled={isActive} className="cell">
      {isActive ? <img className="cell__img" src={src} draggable={false} /> : <div className="cell__placeholder" />}
    </button>
  );
}

export default memo(Cell);
