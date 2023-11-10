import "./agregarfamiliadeproductos.css";
import React, { useState } from "react";
import { AgregarFamiliaProducto } from "../url/Url";
import { MetodoPost } from "../metodos/post";
import { ActualizarFP } from "../store/actualizarfamiliaproduct";

interface AgregarFamiliadeProductoProps {
  cerrarguardar: (valor: boolean) => void;
}

const AgregarFamiliadeProducto: React.FC<AgregarFamiliadeProductoProps> = ({
  cerrarguardar,
}) => {
  const [agregarCodigo, setAgregarCodigo] = useState<string>("");
  const [agregarNombre, setAgregarNombre] = useState<string>("");
  const [agregarActivo, setAgregarActivo] = useState<boolean>(true);
  const [codigoVacio, setCodigoVacio] = useState<string>("");
  const [NombreVacio, setNombreVacio] = useState<string>("");
  const [codigomayor, setCodigomayor] = useState<string>("");
  const { actualizarFP, setActualizarFP } = ActualizarFP();
  const [codigoyaexiste, setCodigyaexiste] = useState<string>("");

  const codigo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAgregarCodigo(value);
  };

  const Nombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAgregarNombre(value);
  };

  const campos = [
    {
      campo: agregarCodigo,
      mensaje: "Por Favor Ingrese el codigo",
      setMensaje: setCodigoVacio,
    },
    {
      campo: agregarNombre,
      mensaje: "Por Favor Ingrese el Nombre",
      setMensaje: setNombreVacio,
    },
  ];

  const validarinputs = () => {
    setCodigyaexiste("");
    setCodigomayor("");
    setCodigoVacio("");
    setNombreVacio("");
    var camposVacios: boolean = false;

    campos.forEach(({ campo, mensaje, setMensaje }) => {
      if (campo === "") {
        setMensaje(mensaje);
        camposVacios = true;
      }
    });

    if (camposVacios) {
      return;
    }
    const codigo = validacodigo(agregarCodigo);

    if (codigo) {
      return;
    }

    guardar();
  };

  const validacodigo = (codigo: string) => {
    if (codigo.length > 15) {
      setCodigomayor("el solo se permite 15 caracteres en el codigo");

      return true;
    }
    return false;
  };

  const fechaCreacion = new Date().toISOString();

  const data: object = {
    Nombre: agregarNombre,
    Codigo: agregarCodigo,
    Activo: agregarActivo,
    FechaCreacion: fechaCreacion,
  };

  const guardar = async () => {
    const response = await MetodoPost(AgregarFamiliaProducto, data);

    if (response.data == "el codigo ya existe") {
      setCodigyaexiste("el codigo ya existe");
      return;
    }
    setActualizarFP(!actualizarFP);
    cerrarguardar(false);
  };

  return (
    <>
      <div className="container">
        <div className="mt-8">
          <p className="vacio"> {codigoVacio}</p>
          <p className="vacio"> {codigomayor} </p>
          <p className="vacio"> {codigoyaexiste} </p>
          <p>Codigo</p>
          <input
            className="input"
            type="text"
            placeholder="Codigo"
            value={agregarCodigo}
            onChange={codigo}
            maxLength={15}
          />
        </div>

        <div>
          <p className="vacio">{NombreVacio} </p>
          <p>Nombre</p>
          <input
            className="input"
            type="text"
            placeholder="Nombre"
            value={agregarNombre}
            onChange={Nombre}
          />
        </div>

        <div>
          <p>Activo</p>
          <input
            type="checkbox"
            checked={agregarActivo}
            onChange={() => setAgregarActivo(!agregarActivo)}
          />
        </div>
        <button className="botonagregar" onClick={validarinputs}>
          <p>Agregar</p>
        </button>
      </div>
    </>
  );
};

export default AgregarFamiliadeProducto;
