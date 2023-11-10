import { create } from "zustand";

interface inicio {
  inicio: boolean;
  setInicio: (v: boolean) => void;
}

export const InicioSesion = create<inicio>((set) => ({
  inicio: false,

  setInicio: (v: boolean) => set({ inicio: v }),
}));
