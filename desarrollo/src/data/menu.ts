export interface MenuItem {
  id: string;
  label: string;
  href: string;
  target?: "_blank" | "_self";
  external?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Inicio",
    href: "/",
  },
  {
    id: "historia",
    label: "Historia",
    href: "/historia",
  },
  {
    id: "estatutos",
    label: "Estatutos",
    href: "/estatutos",
  },
  {
    id: "directivas",
    label: "Directivas",
    href: "/directivas",
  },
  {
    id: "conferencias",
    label: "Conferencias",
    href: "/conferencias",
  },

];

// Función helper para obtener items del menú
export const getMenuItems = (): MenuItem[] => {
  return menuItems;
};

// Función para obtener un item específico por ID
export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find((item) => item.id === id);
};
