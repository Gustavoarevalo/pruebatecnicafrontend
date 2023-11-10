import "./productos.css";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BsFillXOctagonFill, BsFillTrashFill } from "react-icons/bs";
import AgregarFamiliadeProducto from "../componentes/agregarfamiliadeproductos";
import { ObtenerDatosFP } from "../store/obtenerdatos";
import { FiEdit } from "react-icons/fi";
import "./tablas.css";
import { ActualizarFP } from "../store/actualizarfamiliaproduct";
import { linkFamiliaProducto } from "../url/Url";
import { MetodoDelete } from "../metodos/metodoDelete";
import EditarFamiliaProducto from "../componentes/editarfamiliadeproducto";

const FamiliadeProductos: React.FC = () => {
  const [OnpressAgregar, setOnpressAgregar] = useState<boolean>(false);
  const { familiaproduct } = ObtenerDatosFP();
  const { actualizarFP, setActualizarFP } = ActualizarFP();
  const [datos, setDatos] = useState<any>(null);
  const [OnpressEditar, setOnpressEditar] = useState<boolean>(false);

  const customStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    height: 308,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflow: "auto",
    maxHeight: "80vh",
  };

  const cerrar = (valor: boolean) => {
    setOnpressAgregar(valor);
  };

  const handleDelete = async (id: number) => {
    const url = `${linkFamiliaProducto}${"/"}${id}`;
    await MetodoDelete(url);
    setActualizarFP(!actualizarFP);
  };

  const handleEditar = (fp: object) => {
    setDatos(fp);
    setOnpressEditar(!OnpressEditar);
  };

  const cerrareditar = (valor: boolean) => {
    setOnpressEditar(valor);
  };

  return (
    <div className="container">
      <div className="centrar">
        <div className="anchomaximo ">
          <button
            className="botonagregar"
            onClick={() => setOnpressAgregar(!OnpressAgregar)}
          >
            <p>Agregar Familia de Productos</p>
          </button>

          <div className="mt24">
            <table>
              <thead>
                <tr className="ancho">
                  <th className="espacio">Codigo </th>
                  <th className="espacio">Nombre</th>
                  <th className="espacio">Activo</th>

                  <th className="espacio">Editar</th>

                  <th className="espacio">Eliminar</th>
                </tr>
              </thead>
              <tbody className="mt-4">
                {familiaproduct.map((FP) => (
                  <tr key={FP.idFamilia} className="cabezeratbody">
                    <td className="text-center px-4">{FP.codigo}</td>
                    <td className="text-center px-4">{FP.nombre}</td>

                    {FP.activo ? (
                      <td className="text-center px-4">SI</td>
                    ) : (
                      <td className="text-center px-4">No</td>
                    )}

                    <td className="text-center">
                      <button
                        className="boton"
                        onClick={() => handleEditar(FP)}
                      >
                        <FiEdit className="botoneditar" />
                      </button>
                    </td>

                    <td className="text-center">
                      <button className="boton">
                        <BsFillTrashFill
                          className="botoneliminar"
                          onClick={() => handleDelete(FP.idFamilia)}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        open={OnpressAgregar}
        onClose={() => setOnpressAgregar(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={customStyles}>
          <button
            onClick={() => setOnpressAgregar(false)}
            className="botoncerrar"
          >
            <BsFillXOctagonFill style={{ width: 30, height: 30 }} />
          </button>

          <AgregarFamiliadeProducto cerrarguardar={cerrar} />
        </Box>
      </Modal>

      <Modal
        open={OnpressEditar}
        onClose={() => setOnpressEditar(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={customStyles}>
          <button
            onClick={() => setOnpressEditar(false)}
            className="botoncerrar"
          >
            <BsFillXOctagonFill style={{ width: 30, height: 30 }} />
          </button>

          <EditarFamiliaProducto cerrarguardar={cerrareditar} datos={datos} />
        </Box>
      </Modal>
    </div>
  );
};
export default FamiliadeProductos;
