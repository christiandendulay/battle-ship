import { useBattleShipContext } from '../../context/battleship-context';
import './Ships.css';
import Cruiser from '../../assets/Cruiser Shape.png';
import Carrier from '../../assets/Carrier Shape.png';
import Submarine from '../../assets/Submarine Shape.png';
import Aircraft from '../../assets/Aircraft Shape.png';
import Battleship from '../../assets/Battleship Shape.png';
import Ship from './Ship';

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
      return Carrier;
    case 'battleship':
      return Battleship;
    case 'cruiser':
      return Cruiser;
    case 'submarine':
      return Submarine;
    case 'destroyer':
      return Aircraft;
    default:
      return '';
  }
}
export default Ships;
