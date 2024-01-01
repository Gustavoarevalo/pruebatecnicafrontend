import { create } from "zustand";

interface ObtenerJwtStore {
  JWT: string;
  setJWT: (v: string) => void;
}

export const ObtenerJwtStore = create<ObtenerJwtStore>((set) => ({
  JWT: "",
  setJWT: (v) => set({ JWT: v }),
}));
