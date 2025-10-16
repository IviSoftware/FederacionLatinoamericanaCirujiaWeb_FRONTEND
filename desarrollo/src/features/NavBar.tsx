import { useState } from 'react';
import pkg from 'react-burger-menu';
import { menuItems } from '../data/menu.ts';
import type { MenuItem } from '../data/menu.ts';

const { slide: Menu } = pkg;

export const Navbar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (itemId: string) => {
    setOpenSubmenu(openSubmenu === itemId ? null : itemId);
  };
  const menuStyles = {
    bmBurgerButton: {
      position: 'fixed' as const,
      width: '36px',
      height: '30px',
      right: '20px',
      top: '26px',
      zIndex: '1000'
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
      position: 'fixed' as const,
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
      display: 'block' as const,
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
        {menuItems.map((item: MenuItem) => (
          <div key={item.id} className="mb-2">
            {item.submenu ? (
              // Item con submenú
              <div className="menu-item-group">
                <button
                  onClick={() => toggleSubmenu(item.id)}
                  className="menu-item w-full text-left flex items-center justify-between hover:text-white"
                >
                  <span>{item.label}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSubmenu === item.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openSubmenu === item.id && (
                  <div className="submenu pl-4 mt-2">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.id}
                        id={subItem.id}
                        className="menu-item block py-2 text-base hover:text-white"
                        href={subItem.href}
                        target={subItem.target || '_self'}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Item simple sin submenú
              <a
                id={item.id}
                className="menu-item"
                href={item.href}
                target={item.target || '_self'}
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </Menu>

      <nav className="w-full p-4 bg-primaryEvent text-white fixed top-0 left-0 z-50 shadow-md">
        <a href='/' rel='noreferrer' className='inline-block' >
          <img src="/img/home/logoEvento.png" alt="Logo FELAC" className="h-14" />
        </a>
      </nav>
    </div>
  );
};
