interface Items {
  idProducto: number;
  codigo: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface LlenarFacturaProps {
  cerrar: (valor: boolean) => void;
  ItemsFactura: Items[];
}

export default LlenarFacturaProps;
