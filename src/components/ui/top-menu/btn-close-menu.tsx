"use client";

import { useUiStore } from "@/store";

export const BtnCloseMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu);
  return (
    <button
      onClick={() => openMenu()}
      className="m-2 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-black"
    >
      Menu
    </button>
  );
};
