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
import { ObtenerJwtStore } from "./store/JwtStore";

function App() {
  const { inicio } = InicioSesion();
  const [activoS, setActivoS] = useState<boolean>(false);
  const { actualizarFP } = ActualizarFP();
  const { setFamiliaProduct } = ObtenerDatosFP();
  const { setProducto } = ObtenerDatosProductos();
  const { actualizarProductos } = ActualizarProductos();
  const { setFacturaDatos } = ObtenerDatosFactura();
  const [jwt, setjwt] = useState<string>("");
  const { setJWT } = ObtenerJwtStore();
  const [datosleidos, setDatosLeidos] = useState<boolean>(false);

  useEffect(() => {
    obteneriniciosesion();
  }, [inicio]);

  const obteneriniciosesion = () => {
    const iniciar = localStorage.getItem("inicio");

    if (iniciar !== null) {
      const Obtenertoken = JSON.parse(iniciar);
      setjwt(Obtenertoken.token);
      setJWT(Obtenertoken.token);
      setActivoS(true);
    } else {
      setActivoS(false);
    }
    setDatosLeidos(true);
  };

  useEffect(() => {
    if (activoS) {
      obetenerfamiliaProduct();
    }
  }, [actualizarFP, activoS]);

  const obetenerfamiliaProduct = async () => {
    const response = await MetodoGet(linkFamiliaProducto, jwt);

    setFamiliaProduct(response.data);
  };

  useEffect(() => {
    if (activoS) {
      obetenerProduct();
    }
  }, [actualizarProductos, activoS]);

  const obetenerProduct = async () => {
    const response = await MetodoGet(linkProducto, jwt);
    setProducto(response.data);
  };

  useEffect(() => {
    if (activoS) {
      obetenerFacturaDatos();
    }
  }, [actualizarProductos, activoS]);

  const obetenerFacturaDatos = async () => {
    const response = await MetodoGet(linkfactura, jwt);

    setFacturaDatos(response.data);
  };

  return datosleidos ? (
    <>
      {activoS ? (
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </>
  ) : null;
}

export default App;
