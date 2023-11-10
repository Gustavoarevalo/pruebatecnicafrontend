import { create } from "zustand";

interface ActualizarProductos {
  actualizarProductos: boolean;
  setActualizarProductos: (v: boolean) => void;
}

export const ActualizarProductos = create<ActualizarProductos>((set) => ({
  actualizarProductos: false,

  setActualizarProductos: (v: boolean) => set({ actualizarProductos: v }),
}));
