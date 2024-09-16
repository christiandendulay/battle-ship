import './BattleShip.css';
import Ships from '../components/ship/Ships';
import BattleShipBoard from '../components/battleship-board/BattleShipBoard';
import { Header } from '../components/header/Header';
import { BattleShipProvider } from '../components/provider/BattleShipProvider';
import { battleShipPosition } from '../constants/battle-ship';
import PlayerCount from '../components/player/PlayerCount';

export function BattleShip() {
  const { layout, shipTypes } = battleShipPosition;
  return (
    <div className="container">
      <Header />
      <BattleShipProvider shipTypes={shipTypes} layout={layout}>
        <div className="battle-ship-board">
          <BattleShipBoard />
          <div className="battle-ship-score">
            <PlayerCount />
            <Ships />
          </div>
        </div>
      </BattleShipProvider>
    </div>
  );
}

export default BattleShip;
