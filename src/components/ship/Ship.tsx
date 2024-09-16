import Miss from '../../assets/Miss small.png';
import Hit from '../../assets/Hit small.png';

import { useBattleShipContext } from '../../context/battleship-context';
import { ShipLayout } from '../../types';
import './Ship.css';

export type ShipProps = {
  src: string;
  size: number;
  alt: string;
  positions: ShipLayout['positions'];
};

export function Ship({ src, size, alt, positions }: ShipProps) {
  const { battleShip } = useBattleShipContext();

  const hit = positions.map(([x, y]) => battleShip[x][y].isActive).filter((hit) => hit).length;
  return (
    <div className="ship">
      <div className="ship__img-container">
        <img className="ship__img" src={src} alt={alt} />
      </div>

      <div className="ship__status">
        {Array.from({ length: hit }, (_, sizeIndex) => (
          <img alt="hit" src={Hit} key={`hit-${sizeIndex}`} className="ship__status-icon"></img>
        ))}
        {Array.from({ length: size - hit }, (_, sizeIndex) => (
          <img alt="miss" src={Miss} key={`miss-${sizeIndex}`} className="ship__status-icon"></img>
        ))}
      </div>
    </div>
  );
}
export default Ship;
