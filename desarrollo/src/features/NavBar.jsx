import pkg from 'react-burger-menu';
const { slide: Menu } = pkg;

export const Navbar = () => {
  const menuStyles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      right: '20px',
      top: '26px',
      zIndex: 1000
    },
    bmBurgerBars: {
      background: '#ffffff'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'block',
      color: '#d1d1d1',
      marginBottom: '10px',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  };

  return (
    <div>
      <Menu right styles={menuStyles}>
        <a id="home" className="menu-item" href="/">
          Inicio
        </a>
        <a id="about" className="menu-item" href="/about">
          Acerca de
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contacto
        </a>
        <a id="events" className="menu-item" href="/events">
          Eventos
        </a>
      </Menu>
      
      <nav className="w-full p-4 bg-primaryEvent text-white fixed top-0 left-0 z-50 shadow-md">
        <a href='/' target='_blank' rel='noreferrer'>
          <img src="/img/home/logoEvento.png" alt="Logo FELAC" className="h-14" />
        </a>
      </nav>
    </div>
  );
};
