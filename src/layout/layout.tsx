import { Outlet } from "react-router-dom";
import Nav from "../componentes/nav";

const Layoutpublic = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layoutpublic;
