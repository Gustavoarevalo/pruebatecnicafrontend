import React, { useState } from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import CerrarSesion from "./cerrarsesion";

const Nav: React.FC = () => {
  const [openCatalogo, setOpenCatalogo] = useState<boolean>(false);
  const [openDocumentos, setOpenDocumentos] = useState<boolean>(false);

  interface navegacion {
    id: number;
    url: string;
    nombre: string;
  }

  const navegacion: navegacion[] = [
    { id: 1, url: "/", nombre: "Producto" },
    { id: 2, url: "familiadeproductos", nombre: "Familia de Productos" },
  ];

  const handleCatalogoClick = () => {
    setOpenDocumentos(false);
    setOpenCatalogo(!openCatalogo);
  };

  const handleDocumentosClick = () => {
    setOpenDocumentos(!openDocumentos);
    setOpenCatalogo(false);
  };

  return (
    <>
      <nav className="navlarge">
        <div className="nav">
          <div className="flex-row ">
            <div className="buttons">
              <button className="button" onClick={handleCatalogoClick}>
                Catálogos
              </button>
              {openCatalogo && (
                <div
                  className="dropdown"
                  style={{
                    position: "absolute",
                    top: "49px",
                    marginRight: "100px",
                    alignItems: "center",
                    zIndex: 10,
                  }}
                >
                  {navegacion.map((link) => (
                    <Link
                      to={link.url}
                      key={link.id}
                      className="quitardecoracion"
                      onClick={() => setOpenCatalogo(false)}
                    >
                      <p className="buttonsdropdown">{link.nombre}</p>
                    </Link>
                  ))}
                </div>
              )}

              <button className="button" onClick={handleDocumentosClick}>
                Documentos
              </button>

              {openDocumentos && (
                <div
                  className="dropdown"
                  style={{
                    position: "absolute",
                    top: "49px",
                    marginLeft: "110px",
                    alignItems: "center",
                    zIndex: 10,
                  }}
                >
                  <Link
                    to="factura"
                    className="quitardecoracion"
                    onClick={() => setOpenDocumentos(false)}
                  >
                    <p className="buttonsdropdown">Factura</p>
                  </Link>
                </div>
              )}
              <CerrarSesion />
            </div>
          </div>
        </div>
      </nav>

      <nav className="navsmall">
        <p>nav para pantallas pequeñas</p>
      </nav>
    </>
  );
};

export default Nav;
