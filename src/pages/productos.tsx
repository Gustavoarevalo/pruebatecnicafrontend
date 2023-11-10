import "./productos.css";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BsFillXOctagonFill, BsFillTrashFill } from "react-icons/bs";
import AgregarProducto from "../componentes/agregarproductos";
import { ObtenerDatosProductos } from "../store/obtenerdatos";
import { FiEdit } from "react-icons/fi";
import "./tablas.css";
import { ActualizarProductos } from "../store/actualizarproductos";
import { linkProducto } from "../url/Url";
import { MetodoDelete } from "../metodos/metodoDelete";
import EditarProduct from "../componentes/editarproduct";
import CarritodeCompras from "../componentes/carritodecompras";

const Producto: React.FC = () => {
  const [OnpressAgregar, setOnpressAgregar] = useState<boolean>(false);
  const { product } = ObtenerDatosProductos();
  const { actualizarProductos, setActualizarProductos } = ActualizarProductos();
  const [datos, setDatos] = useState<any>(null);
  const [OnpressEditar, setOnpressEditar] = useState<boolean>(false);
  const [item, setItems] = useState<any[]>([]);

  const customStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    height: 558,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 5,
    borderRadius: 2,
    overflow: "auto",
  };

  const cerrar = (valor: boolean) => {
    setOnpressAgregar(valor);
  };

  const handleDelete = async (id: number) => {
    const url = `${linkProducto}${"/"}${id}`;
    await MetodoDelete(url);
    setActualizarProductos(!actualizarProductos);
  };

  const handleEditar = (fp: object) => {
    setDatos(fp);
    setOnpressEditar(!OnpressEditar);
  };

  const cerrareditar = (valor: boolean) => {
    setOnpressEditar(valor);
  };

  const handleagregar = (producto: any) => {
    const productoExistente = item.find(
      (item) => item.idProducto === producto.idProducto
    );

    if (productoExistente) {
      if (productoExistente.cantidad + 1 <= producto.stock) {
        productoExistente.cantidad += 1;
        setItems([...item]);
      } else {
        // Muestra un mensaje de que no se puede agregar más
        console.log("No puedes agregar más de este producto");
      }
    } else {
      if (1 <= producto.stock) {
        const nuevoItem = { ...producto, cantidad: 1 };
        setItems([...item, nuevoItem]);
      } else {
        console.log("No puedes agregar más de este producto");
      }
    }
  };

  const handlerestar = (id: number) => {
    const itemEliminar = item.find((i) => i.idProducto === id);

    if (itemEliminar) {
      if (itemEliminar.cantidad > 1) {
        itemEliminar.cantidad -= 1;
        setItems([...item]);
      } else {
        const nuevosItems = item.filter((i) => i.idProducto !== id);
        setItems(nuevosItems);
      }
    }
  };

  return (
    <div className="containerTablaproduct">
      <div className="centrar">
        <div className="anchomaximo ">
          <div className="flexdirection">
            <button
              className="botonagregar"
              onClick={() => setOnpressAgregar(!OnpressAgregar)}
            >
              <p>Agregar Producto</p>
            </button>
            <CarritodeCompras items={item} />
          </div>

          <div className="mt24">
            <table>
              <thead>
                <tr className="ancho">
                  <th className="espacio">Codigo </th>
                  <th className="espacio">Nombre</th>
                  <th className="espacio">Precio</th>
                  <th className="espacio">Stock</th>

                  <th className="espacio">Editar</th>

                  <th className="espacio">Eliminar</th>
                  <th className="espacio">Agregar</th>
                </tr>
              </thead>
              <tbody className="mt-4">
                {product.map((FP) => (
                  <tr key={FP.idProducto} className="cabezeratbody">
                    <td className="text-center px-4">{FP.codigo}</td>
                    <td className="text-center px-4">{FP.nombre}</td>
                    <td className="text-center px-4">{FP.precio}</td>
                    <td className="text-center px-4">{FP.stock}</td>

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
                          onClick={() => handleDelete(FP.idProducto)}
                        />
                      </button>
                    </td>

                    {FP.activo ? (
                      <>
                        <td className="text-center">
                          <button
                            className="boton"
                            onClick={() => handleagregar(FP)}
                          >
                            <p className="  botonAgregar">Agregar</p>
                          </button>
                          <button
                            className="boton marginleft"
                            onClick={() => handlerestar(FP.idProducto)}
                          >
                            <p className="botoneliminar">Restar</p>
                          </button>
                        </td>
                      </>
                    ) : (
                      <td className="text-center">
                        <p>Botones desactivado</p>
                      </td>
                    )}
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

          <AgregarProducto cerrarguardar={cerrar} />
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

          <EditarProduct cerrarguardar={cerrareditar} datos={datos} />
        </Box>
      </Modal>
    </div>
  );
};
export default Producto;
