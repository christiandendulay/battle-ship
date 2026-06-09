import { useBattleShipContext } from '../../context/battleship-context';
import { SHIP_TYPE } from '../../types/enum';
import { useImageUrl } from '../../context';
import Ship from './Ship';
import './Ships.css';

export function Ships() {
  const { layout, shipTypes } = useBattleShipContext();
  const ships = layout.map(({ ship, positions }) => {
    const size = shipTypes[ship].size ?? 0;
    return {
      alt: ship,
      src: useImageUrl(getImageSrc(ship)) ?? '',
      size,
      positions,
    };
  });

  return (
    <div className="ships">
      {ships.map((ship) => (
        <Ship {...ship} key={JSON.stringify(ship)} />
      ))}
    </div>
  );
}

function getImageSrc(ship: string) {
  switch (ship) {
    case 'carrier':
      return SHIP_TYPE.CARRIER;
    case 'battleship':
      return SHIP_TYPE.BATTLESHIP;
    case 'cruiser':
      return SHIP_TYPE.CRUISER;
    case 'submarine':
      return SHIP_TYPE.SUBMARINE;
    case 'destroyer':
      return SHIP_TYPE.DESTROYER;
    default:
      return '';
  }
}
export default Ships;
