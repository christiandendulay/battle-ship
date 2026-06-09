import {
  BattleShipBoard,
  PlayerCount,
  BattleShipProvider,
  Header,
  Ships,
  AssetsProvider,
} from '@battleship/ui';
import { battleShipPosition } from '../constants/battle-ship';
import './BattleShip.css';

export function BattleShip() {
  const { layout, shipTypes } = battleShipPosition;
  return (
    <div className="container">
      <Header />
      <AssetsProvider apiUrl={import.meta.env.VITE_API_URL}>
        <BattleShipProvider shipTypes={shipTypes} layout={layout}>
          <div className="battle-ship-board">
            <BattleShipBoard />
            <div className="battle-ship-score">
              <PlayerCount />
              <Ships />
            </div>
          </div>
        </BattleShipProvider>
      </AssetsProvider>
    </div>
  );
}

export default BattleShip;
