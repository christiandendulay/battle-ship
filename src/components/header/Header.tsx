import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header__block" />
      <div className="search">
        <div className="search__input"></div>
        <div className="search__block"></div>
      </div>
      <div className="icons">
        <div className="icons__block" />
        <div className="icons__block" />
        <div className="icons__block" />
      </div>
    </header>
  );
}
