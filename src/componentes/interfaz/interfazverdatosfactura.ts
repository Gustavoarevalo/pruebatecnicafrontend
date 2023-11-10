interface detallefacturaprops {
  cantidad: number;
  codigo: string;
  idItem: number;
  nombre: string;
  precio: number;
  subtotal: number;
}

interface Datosfactura {
  idFactura: number;
  fechaCreacion: string;
  igv: number;
  numerodefactura: number;
  razonsocial: string;
  ruc: string;
  subtotal: number;
  detalleFactura: detallefacturaprops[];
}

export interface verdatosfacturaProps {
  cerrar: (valor: boolean) => void;
  datos: Datosfactura[];
}
