import React, { useState, useEffect } from "react";
import "./llenarfactura.css";
import LlenarFacturaProps from "./interfaz/interfazllenarfactura";
import { MetodoPost } from "../metodos/post";
import { linkfactura, linkdetallefactura } from "../url/Url";
import { ActualizarProductos } from "../store/actualizarproductos";

const LlenarFactura: React.FC<LlenarFacturaProps> = ({
  ItemsFactura,
  cerrar,
}) => {
  const [ruc, setRuc] = useState<string>("");
  const [razonsocial, setRazonSocial] = useState<string>("");
  const [subtotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [rucVacio, setRucVacio] = useState<string>("");
  const [razonVacio, setRazonVacio] = useState<string>("");
  const [igv, setIgv] = useState<number>(0);
  const { actualizarProductos, setActualizarProductos } = ActualizarProductos();

  const ObtenerRuc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuc(e.target.value);
  };

  const ObtenerRazonSocial = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRazonSocial(e.target.value);
  };

  useEffect(() => {
    obtenersubtotal(ItemsFactura);
  }, [ItemsFactura]);

  const obtenersubtotal = (items: any) => {
    let subtotal = 0;
    for (let i = 0; i < items.length; i++) {
      const cantidad = items[i].cantidad;
      const precio = items[i].precio;
      const multiplicacion = cantidad * precio;
      subtotal = subtotal + multiplicacion;
    }

    setSubTotal(subtotal);

    obtenerIGV(subtotal);
  };

  const obtenerIGV = (sub: number) => {
    const iva = sub * 0.12;
    const ivaFormateado = iva.toFixed(2);

    const convertiranumber = parseFloat(ivaFormateado);

    setIgv(convertiranumber);

    obtenertotal(sub, convertiranumber);
  };

  const obtenertotal = (sub: number, igv: number) => {
    let total = 0;

    total = sub + igv;

    setTotal(total);
  };

  const CamposVacios = [
    {
      campo: ruc,
      mensaje: "Por Favor Ingrese El Ruc",
      setMensaje: setRucVacio,
    },

    {
      campo: razonsocial,
      mensaje: "Por Favor Ingrese su Razon Social",
      setMensaje: setRazonVacio,
    },
  ];

  const ValidarCamposVacios = () => {
    setRucVacio("");
    setRazonVacio("");

    let camposvacios: boolean = false;

    CamposVacios.forEach(({ campo, mensaje, setMensaje }) => {
      if (campo === "") {
        setMensaje(mensaje);
        camposvacios = true;
      }
    });

    if (camposvacios) {
      return;
    }
    //  cerrar(false);
    Guardar();
  };

  const data: object = {
    Ruc: ruc,
    Razonsocial: razonsocial,
    Subtotal: subtotal,
    FechaCreacion: new Date(),
    IGV: igv,
    Total: total,
    //  DetalleFacturas: ItemsFactura,
  };

  const Guardar = async () => {
    const response = await MetodoPost(linkfactura, data);

    if (response.status == 200) {
      const ID = response.data;

      GuardarDetalleFactura(ID);
    }
  };

  const GuardarDetalleFactura = (id: number) => {
    try {
      ItemsFactura.forEach((element) => {
        const datos = {
          Codigo: element.codigo,
          Nombre: element.nombre,
          Precio: element.precio,
          Cantidad: element.cantidad,
          Subtotal: element.cantidad * element.precio,
          IdFactura: id,
        };

        const url = `${linkdetallefactura}?Idproducto=${element.idProducto}`;

        MetodoPost(url, datos);
        setActualizarProductos(!actualizarProductos);
        cerrar(false);
      });
    } catch (error) {
      console.log("error", error);
    }

    //    const respuesta = MetodoPost(url, detalle);
    // console.log(detalle);
    // console.log(respuesta);
  };
  //  console.log(ItemsFactura);

  return (
    <div className="containerllenarfactura">
      <div className="display">
        <div className="alturamensajesvacios">
          <p className="mensajevacio">{rucVacio}</p>
          <p className="mensajevacio">{razonVacio}</p>
        </div>
        <div className="flex">
          <div className="flex">
            <p>Ingrese El Ruc: </p>
            <input
              type="text"
              placeholder="RUC"
              value={ruc}
              onChange={ObtenerRuc}
              className="estilosruc "
            />
          </div>

          <div className="flex ml">
            <p>Razon Social: </p>
            <input
              type="text"
              placeholder="Ingrese Razon Social"
              value={razonsocial}
              onChange={ObtenerRazonSocial}
              className="estilosruc "
            />
          </div>
        </div>

        <div className="flex">
          <div className="flex">
            <p>Porcentaje IGV: </p>
            <p className="ImpuestoIGV ml-3"> {""}12%</p>
          </div>

          <div className="flex ml">
            <p>Subtotal: </p>
            <p className="totalllenarfactura">$ {subtotal} </p>
          </div>

          <div className="flex ml">
            <p>IGV: </p>
            <p className="ImpuestoIGV ml-3"> {igv} </p>
          </div>

          <div className="flex ml">
            <p>Total: </p>
            <p className="totalllenarfactura ">$ {total} </p>
          </div>
        </div>
        <button className="guardarfactura" onClick={ValidarCamposVacios}>
          Guardar
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
              {ItemsFactura.map((FP) => (
                <tr key={FP.idProducto} className="cabezeratbody">
                  <td className="text-center px-1">{FP.codigo}</td>
                  <td className="text-center px-1">{FP.nombre}</td>
                  <td className="text-center px-1">{FP.precio}</td>
                  <td className="text-center px-1">{FP.cantidad}</td>
                  <td className="text-center px-1">
                    {FP.precio * FP.cantidad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LlenarFactura;
