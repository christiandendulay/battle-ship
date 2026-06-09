import { useBattleShipContext } from '../../context/battleship-context';
import { ShipLayout } from '../../types';
import './Ship.css';

import { RESULT_TYPE } from '../../types/enum';
import { useImageUrl } from '../../context';

export type ShipProps = {
  src: string;
  size: number;
  alt: string;
  positions: ShipLayout['positions'];
};

export function Ship({ src, size, alt, positions }: ShipProps) {
  const { battleShip } = useBattleShipContext();

  const hit = positions.map(([x, y]) => battleShip[x][y].isActive).filter((hit) => hit).length;
  const hitSrc = useImageUrl(RESULT_TYPE.HIT_SMALL);
  const missSrc = useImageUrl(RESULT_TYPE.MISS_SMALL);

  return (
    <div className="ship">
      <div className="ship__img-container">
        <img className="ship__img" src={src} alt={alt} draggable={false} />
      </div>

      <div className="ship__status">
        {Array.from({ length: hit }, (_, sizeIndex) => (
          <img
            alt="hit"
            src={hitSrc}
            key={`hit-${sizeIndex}`}
            className="ship__status-icon"
            draggable={false}
          ></img>
        ))}
        {Array.from({ length: size - hit }, (_, sizeIndex) => (
          <img
            alt="miss"
            src={missSrc}
            key={`miss-${sizeIndex}`}
            className="ship__status-icon"
            draggable={false}
          ></img>
        ))}
      </div>
    </div>
  );
}
export default Ship;
