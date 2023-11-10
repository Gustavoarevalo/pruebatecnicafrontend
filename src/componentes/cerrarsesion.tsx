import "./cerrarsesion.css";
import { InicioSesion } from "../store/iniciosesion";

const CerrarSesion = () => {
  const { inicio, setInicio } = InicioSesion();

  const handlecerrarsesion = () => {
    localStorage.clear();
    setInicio(!inicio);
  };

  return (
    <>
      <button onClick={handlecerrarsesion} className="cerrarsesion">
        <p>Cerrar Sesion</p>
      </button>
    </>
  );
};
export default CerrarSesion;
