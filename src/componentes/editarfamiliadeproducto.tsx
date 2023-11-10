import React, { useState } from "react";
import { EditarFamiliaProductoProps } from "./interfaz/intezaseditardamiliaproduc";
import { ActualizarFP } from "../store/actualizarfamiliaproduct";
import { linkFamiliaProducto } from "../url/Url";
import { MetodoPut } from "../metodos/metodoPut";

const EditarFamiliaProducto: React.FC<EditarFamiliaProductoProps> = ({
  cerrarguardar,
  datos,
}) => {
  const [agregarCodigo, setAgregarCodigo] = useState<string>(datos.codigo);
  const [agregarNombre, setAgregarNombre] = useState<string>(datos.nombre);
  const [agregarActivo, setAgregarActivo] = useState<boolean>(datos.activo);
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
    setCodigomayor("");
    setCodigoVacio("");
    setNombreVacio("");
    setCodigyaexiste("");
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
    const url = `${linkFamiliaProducto}${"/"}${datos.idFamilia} `;
    guardar(url);
  };

  const validacodigo = (codigo: string) => {
    if (codigo.length > 15) {
      setCodigomayor("el solo se permite 15 caracteres en el codigo");

      return true;
    }
    return false;
  };

  const data: object = {
    idFamilia: datos.idFamilia,
    Nombre: agregarNombre,
    Codigo: agregarCodigo,
    Activo: agregarActivo,
    FechaCreacion: new Date(),
  };

  const guardar = async (url: string) => {
    const response = await MetodoPut(url, data);

    if (response.data == "El codigo ya existe") {
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
          <p>Actualizar</p>
        </button>
      </div>
    </>
  );
};

export default EditarFamiliaProducto;
