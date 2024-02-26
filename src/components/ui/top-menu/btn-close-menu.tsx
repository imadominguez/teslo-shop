'use client';

import { useUiStore } from '@/store';

// Componente de botón para cerrar el menú lateral
export const BtnCloseMenu = () => {
  // Obtener la función para abrir el menú lateral desde el estado global
  const openMenu = useUiStore((state) => state.openSideMenu);

  return (
    // Botón que ejecuta la función para abrir el menú lateral al hacer clic
    <button
      onClick={() => openMenu()}
      className="m-2 rounded-md p-2 transition-all hover:bg-gray-100 dark:hover:bg-bg-dark-300"
    >
      Menu
    </button>
  );
};
