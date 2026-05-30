import { useBattleShipContext } from '../../context/battleship-context';
import './Ships.css';

import Ship from './Ship';
import { getAssetUrl } from '../../utils/assets';
import { SHIP_TYPE } from '../../types/enum';

export function Ships() {
  const { layout, shipTypes } = useBattleShipContext();
  const ships = layout.map(({ ship, positions }) => {
    const size = shipTypes[ship].size ?? 0;
    return {
      alt: ship,
      src: getImageSrc(ship),
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
      return getAssetUrl(SHIP_TYPE.CARRIER);
    case 'battleship':
      return getAssetUrl(SHIP_TYPE.BATTLESHIP);
    case 'cruiser':
      return getAssetUrl(SHIP_TYPE.CRUISER);
    case 'submarine':
      return getAssetUrl(SHIP_TYPE.SUBMARINE);
    case 'destroyer':
      return getAssetUrl(SHIP_TYPE.DESTROYER);
    default:
      return '';
  }
}
export default Ships;
