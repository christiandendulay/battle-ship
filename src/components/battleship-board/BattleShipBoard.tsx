import { useMemo } from 'react';
import { useBattleShipContext } from '../../context/battleship-context';
import { Cell } from '../cell/Cell';
import './BattleShipBoard.css';
import Dialog from '../dialog/Dialog';

export function BattleShipBoard() {
  const { battleShip, checkIfAllHit, resetBoard } = useBattleShipContext();
  const battleShipBoard = useMemo(
    () =>
      battleShip.flatMap((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} row={rowIndex} column={colIndex} cell={cell} />
        )),
      ),
    [battleShip],
  );

  const isOpen = checkIfAllHit();

  return (
    <>
      <div className="grid-container">{battleShipBoard}</div>
      <Dialog isOpen={isOpen} buttonLabel="Play again??" onClickButton={resetBoard} />
    </>
  );
}

export default BattleShipBoard;
