import { Route, Routes } from "react-router-dom";
import Layoutpublic from "../layout/layout";
import Producto from "../pages/productos";
import FamiliadeProductos from "../pages/FamiliadeProductos";
import Factura from "../pages/Factura";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layoutpublic />}>
          <Route index element={<Producto />} />
          <Route path="familiadeproductos" element={<FamiliadeProductos />} />
          <Route path="factura" element={<Factura />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
