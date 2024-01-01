import React, { useState } from "react";
import { ObtenerDatosFactura } from "../store/obtenerdatos";
import { HiEye } from "react-icons/hi2";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import VerDatosFactura from "../componentes/Verdatosfactura";
import { BsFillXOctagonFill, BsFillTrashFill } from "react-icons/bs";
import { ActualizarProductos } from "../store/actualizarproductos";
import { ObtenerJwtStore } from "../store/JwtStore";
import { linkfactura } from "../url/Url";
import { MetodoDelete } from "../metodos/metodoDelete";

const Factura: React.FC = () => {
  const { FacturaDatos } = ObtenerDatosFactura();
  const [abrir, setAbrir] = useState<boolean>(false);
  const [odatos, setDatos] = useState<object>([]);
  const { actualizarProductos, setActualizarProductos } = ActualizarProductos();
  const { JWT } = ObtenerJwtStore();

  const customStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 558,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 5,
    borderRadius: 2,
    overflow: "auto",
  };

  const handlepressVer = (Fp: object) => {
    setDatos(Fp);
    setAbrir(!abrir);
  };

  const handleDelete = async (id: number) => {
    const url = `${linkfactura}${"/"}${id}`;
    await MetodoDelete(url, JWT);
    setActualizarProductos(!actualizarProductos);
  };

  console.log(FacturaDatos);
  return (
    <>
      <div>
        <div className="mt24">
          <table>
            <thead>
              <tr className="ancho">
                <th className="espacio">Numero</th>
                <th className="espacio">Ruc</th>
                <th className="espacio">RAzon Social</th>
                <th className="espacio">IGV</th>
                <th className="espacio">Subtotal</th>
                <th className="espacio">{""}</th>
                <th className="espacio">Eliminar</th>
              </tr>
            </thead>
            <tbody className="mt-4">
              {FacturaDatos.map((FP) => (
                <tr key={FP.idFactura} className="cabezeratbody">
                  <td className="text-center px-4">{FP.numerodeFactura}</td>
                  <td className="text-center px-4">{FP.ruc}</td>
                  <td className="text-center px-4">{FP.razonsocial}</td>
                  <td className="text-center px-4">{FP.igv}</td>
                  <td className="text-center px-4">{FP.subtotal}</td>

                  <td className="text-center">
                    <button
                      className="boton"
                      onClick={() => handlepressVer(FP)}
                    >
                      <HiEye
                        style={{
                          width: 20,
                          height: 20,
                          color: "green",
                        }}
                      />
                    </button>
                  </td>
                  <td className="text-center">
                    <button className="boton">
                      <BsFillTrashFill
                        className="botoneliminar"
                        onClick={() => handleDelete(FP.idFactura)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={abrir}
        onClose={() => setAbrir(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={customStyles}>
          <button onClick={() => setAbrir(false)} className="botoncerrar">
            <BsFillXOctagonFill style={{ width: 30, height: 30 }} />
          </button>

          <VerDatosFactura cerrar={setAbrir} datos={odatos} />
        </Box>
      </Modal>
    </>
  );
};

export default Factura;
