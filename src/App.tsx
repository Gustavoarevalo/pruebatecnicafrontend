import { useState, useEffect } from "react";
import Login from "./componentes/login";
import { InicioSesion } from "./store/iniciosesion";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import MetodoGet from "./metodos/metodoget";
import { linkFamiliaProducto, linkProducto, linkfactura } from "./url/Url";
import { ActualizarFP } from "./store/actualizarfamiliaproduct";
import {
  ObtenerDatosFP,
  ObtenerDatosProductos,
  ObtenerDatosFactura,
} from "./store/obtenerdatos";
import { ActualizarProductos } from "./store/actualizarproductos";

function App() {
  const { inicio } = InicioSesion();
  const [activoS, setActivoS] = useState<boolean>(false);
  const { actualizarFP } = ActualizarFP();
  const { setFamiliaProduct } = ObtenerDatosFP();
  const { setProducto } = ObtenerDatosProductos();
  const { actualizarProductos } = ActualizarProductos();
  const { setFacturaDatos } = ObtenerDatosFactura();

  useEffect(() => {
    obteneriniciosesion();
  }, [inicio]);

  const obteneriniciosesion = () => {
    const iniciar = localStorage.getItem("inicio");

    if (iniciar !== null) {
      setActivoS(true);
    } else {
      setActivoS(false);
    }
  };

  useEffect(() => {
    obetenerfamiliaProduct();
  }, [actualizarFP]);

  const obetenerfamiliaProduct = async () => {
    const response = await MetodoGet(linkFamiliaProducto);

    setFamiliaProduct(response.data);
  };

  useEffect(() => {
    obetenerProduct();
  }, [actualizarProductos]);

  const obetenerProduct = async () => {
    const response = await MetodoGet(linkProducto);

    setProducto(response.data);
  };

  useEffect(() => {
    obetenerFacturaDatos();
  }, [actualizarProductos]);

  const obetenerFacturaDatos = async () => {
    const response = await MetodoGet(linkfactura);

    setFacturaDatos(response.data);
  };

  return (
    <>
      {activoS ? (
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
