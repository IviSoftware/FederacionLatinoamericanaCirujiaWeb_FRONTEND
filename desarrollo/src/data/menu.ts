export interface MenuItem {
  id: string;
  label: string;
  href: string;
  target?: '_blank' | '_self';
  external?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    href: '/',
    target: '_self'
  },
  {
    id: 'historia',
    label: 'Historia',
    href: '/historia',
    target: '_self'
  },
    {
    id: 'conferencias',
    label: 'Conferencias',
    href: '/conferencias',
    target: '_self'
  },
  
];

// Función helper para obtener items del menú
export const getMenuItems = (): MenuItem[] => {
  return menuItems;
};

// Función para obtener un item específico por ID
export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};