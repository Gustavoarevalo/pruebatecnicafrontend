export interface DatosFamiliaProducto {
  codigo: string;
  nombre: string;
  activo: boolean;
  idFamilia: number;
  fechaCreacion: string;
  productos: any[];
}

export interface EditarFamiliaProductoProps {
  cerrarguardar: (valor: boolean) => void;
  datos: DatosFamiliaProducto;
}
