import { create } from "zustand";

interface ObtenerDatos {
  familiaproduct: any[];
  setFamiliaProduct: (v: any[]) => void;
}

export const ObtenerDatosFP = create<ObtenerDatos>((set) => ({
  familiaproduct: [],

  setFamiliaProduct: (v) => set({ familiaproduct: v }),
}));

interface ObtenerDatosProductos {
  product: any[];
  setProducto: (v: any[]) => void;
}

export const ObtenerDatosProductos = create<ObtenerDatosProductos>((set) => ({
  product: [],

  setProducto: (v) => set({ product: v }),
}));

interface ObtenerDatosFactura {
  FacturaDatos: any[];
  setFacturaDatos: (v: any[]) => void;
}

export const ObtenerDatosFactura = create<ObtenerDatosFactura>((set) => ({
  FacturaDatos: [],

  setFacturaDatos: (v) => set({ FacturaDatos: v }),
}));
