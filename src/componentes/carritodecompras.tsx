import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BsFillXOctagonFill } from "react-icons/bs";
import LlenarFactura from "./llenarfactura";
import "./carritodecompras.css";

const CarritoDeCompras: React.FC<any> = ({ items }) => {
  const [onPressCarrito, setOnpressCarrito] = useState<boolean>(false);
  const [totalCarrito, setTotalCarrito] = useState<number>(0);

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

  useEffect(() => {
    ObtenerTotal();
  }, [items]);

  const ObtenerTotal = () => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const numero = items[i].cantidad;
      total = total + numero;
    }

    setTotalCarrito(total);
  };

  const abrirmodal = () => {
    if (totalCarrito > 0) {
      setOnpressCarrito(!onPressCarrito);
    }
  };

  return (
    <div className="  margintop ">
      <button className="botonagregar " onClick={abrirmodal}>
        <div className="div1">
          <p>Carrito de Compras </p>
          <p className="total">{totalCarrito}</p>
        </div>
      </button>
      <Modal
        open={onPressCarrito}
        onClose={() => setOnpressCarrito(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={customStyles}>
          <button
            onClick={() => setOnpressCarrito(false)}
            className="botoncerrar"
          >
            <BsFillXOctagonFill style={{ width: 30, height: 30 }} />
          </button>

          <LlenarFactura ItemsFactura={items} cerrar={setOnpressCarrito} />
        </Box>
      </Modal>
    </div>
  );
};

export default CarritoDeCompras;
