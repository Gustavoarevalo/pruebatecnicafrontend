interface DatosProducto {
  codigo: string;
  nombre: string;
  activo: boolean;
  idFamilia: number;
  precio: number;
  stock: number;
  familiadeProducto: any;
  fechaCreacion: string;
  productos: any[];
  idProducto: number;
}

interface ProductoProps {
  cerrarguardar: (valor: boolean) => void;
  datos: DatosProducto;
}

export default ProductoProps;
