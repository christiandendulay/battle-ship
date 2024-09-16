import './PlayerCount.css';
import { useBattleShipContext } from '../../context/battleship-context';

export function PlayerCount() {
  const { battleShip } = useBattleShipContext();
  const moveCounter = battleShip.reduce(
    (count, row) => count + row.filter((cell) => cell.isActive).length,
    0,
  );

  return (
    <div className="player-count">
      <div className="player-count__block">
        <div className="player-count__block--1">
          <p className="player-count__moves">{moveCounter}</p>
          <hr className="divider" />
          <p className="player-count__number">Player 1</p>
        </div>
      </div>
      <div className="player-count__block">
        <div className="player-count__block--2">
          <p className="player-count__moves">0</p>
          <hr className="divider" />
          <p className="player-count__number">Player 2</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerCount;
