import { create } from "zustand";

interface ActualizarFP {
  actualizarFP: boolean;
  setActualizarFP: (v: boolean) => void;
}

export const ActualizarFP = create<ActualizarFP>((set) => ({
  actualizarFP: false,

  setActualizarFP: (v: boolean) => set({ actualizarFP: v }),
}));
