import React from "react";
import { verdatosfacturaProps } from "./interfaz/interfazverdatosfactura";
import "./llenarfactura.css";

const VerDatosFactura: React.FC<verdatosfacturaProps> = ({ cerrar, datos }) => {
  const Cerrarmodal = () => {
    cerrar(false);
  };

  return (
    <div className="containerllenarfactura">
      <div className="display">
        <div className="alturamensajesvacios"></div>
        <div className="flex">
          <div className="flex">
            <p>Ingrese El Ruc: </p>
            <p className="estilosruc ">{datos.ruc}</p>
          </div>

          <div className="flex ml">
            <p>Razon Social: </p>
            <p className="estilosruc "> {datos.razonsocial}</p>
          </div>
        </div>

        <div className="flex">
          <div className="flex">
            <p>Porcentaje IGV: </p>
            <p className="ImpuestoIGV ml-3"> {""}12%</p>
          </div>

          <div className="flex ml">
            <p>Subtotal: </p>
            <p className="totalllenarfactura">$ {datos.subtotal} </p>
          </div>

          <div className="flex ml">
            <p>IGV: </p>
            <p className="ImpuestoIGV ml-3"> {datos.igv} </p>
          </div>

          <div className="flex ml">
            <p>Total: </p>
            <p className="totalllenarfactura ">
              $ {datos.igv + datos.subtotal}{" "}
            </p>
          </div>
        </div>
        <button className="guardarfactura" onClick={Cerrarmodal}>
          Cerrar
        </button>

        <div className="mt24">
          <table>
            <thead>
              <tr className="ancho">
                <th className="espaciollenarfactura">Codigo </th>
                <th className="espaciollenarfactura">Nombre</th>
                <th className="espaciollenarfactura">Precio</th>
                <th className="espaciollenarfactura">Cantidad</th>
                <th className="espaciollenarfactura">Subtotal</th>
              </tr>
            </thead>
            <tbody className="mt-4">
              {datos.detalleFactura.map((FP: any) => (
                <tr key={FP.idItem} className="cabezeratbody">
                  <td className="text-center px-1">{FP.codigo}</td>
                  <td className="text-center px-1">{FP.nombre}</td>
                  <td className="text-center px-1">{FP.precio}</td>
                  <td className="text-center px-1">{FP.cantidad}</td>
                  <td className="text-center px-1">{FP.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerDatosFactura;
