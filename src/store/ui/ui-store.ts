import { create } from 'zustand';

interface State {
  isSideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUiStore = create<State>()((set) => ({
  isSideMenuOpen: false,

  // Método para abrir el menú lateral
  openSideMenu: () => set({ isSideMenuOpen: true }),

  // Método para cerrar el menú lateral
  closeSideMenu: () => set({ isSideMenuOpen: false }),
}));
