export interface SubMenuItem {
  id: string;
  label: string;
  href: string;
  target?: "_blank" | "_self";
}

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  target?: "_blank" | "_self";
  external?: boolean;
  submenu?: SubMenuItem[];
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
    id: "filiales",
    label: "Filiales",
    href: "/filiales",
  },
  {
    id: "eventos",
    label: "Eventos",
    href: "/eventosFiliales",
  },
  {
    id: "conferencias",
    label: "Conferencias",
    href: "/conferencias",
  },
  {
    id: "ediciones",
    label: "Ediciones Anteriores",
    href: "/ediciones",
  },
  {
    id: "publicaciones",
    label: "Publicaciones",
    submenu: [
      {
        id: "boletines",
        label: "Boletines",
        href: "/boletines",
      },
      {
        id: "libros",
        label: "Libros",
        href: "/libros",
      },
    ],
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
