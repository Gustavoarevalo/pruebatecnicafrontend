import "./agregarproductos.css";
import "./agregarfamiliadeproductos.css";
import React, { useState } from "react";
import { linkProducto } from "../url/Url";
import { MetodoPut } from "../metodos/metodoPut";
import { ActualizarProductos } from "../store/actualizarproductos";
import { ObtenerDatosFP } from "../store/obtenerdatos";
import ProductoProps from "./interfaz/interfazProducto";
import { ObtenerJwtStore } from "../store/JwtStore";

const EditarProduct: React.FC<ProductoProps> = ({ cerrarguardar, datos }) => {
  const [agregarCodigo, setAgregarCodigo] = useState<string>(datos.codigo);
  const [agregarNombre, setAgregarNombre] = useState<string>(datos.nombre);
  const [Precio, setAgregarPrecio] = useState<number>(datos.precio);
  const [stock, setAgregarStock] = useState<number>(datos.stock);
  const [agregarActivo, setAgregarActivo] = useState<boolean>(datos.activo);
  const [codigoVacio, setCodigoVacio] = useState<string>("");
  const [NombreVacio, setNombreVacio] = useState<string>("");
  const [codigomayor, setCodigomayor] = useState<string>("");
  const { actualizarProductos, setActualizarProductos } = ActualizarProductos();
  const [codigoyaexiste, setCodigyaexiste] = useState<string>("");
  const [Precioerror, setPrecioerror] = useState<string>("");
  const [Stockerror, setStockerror] = useState<string>("");
  const { familiaproduct } = ObtenerDatosFP();
  const [selectFamiliaP, setSelectFamiliaP] = useState<any>("");
  const [familiaeVacio, setFamiliaVacio] = useState<string>("");
  const { JWT } = ObtenerJwtStore();

  const codigo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAgregarCodigo(value);
  };

  const Precioinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let convertirnumero: number = 0;
    convertirnumero = parseInt(value);
    setAgregarPrecio(convertirnumero);
  };

  const Stockinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let convertirnumero: number = 0;
    convertirnumero = parseInt(value);
    setAgregarStock(convertirnumero);
  };

  const itemselect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const n = e.target.value;

    if (n) {
      const id = parseInt(n);

      const FP = familiaproduct.find((FP) => FP.idFamilia === id);

      setSelectFamiliaP(FP);
    }
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
    {
      campo: selectFamiliaP,
      mensaje: "Selecione una familia de producto",
      setMensaje: setFamiliaVacio,
    },
    {
      campo: selectFamiliaP,
      mensaje: "Familia no disponible",
      setMensaje: setFamiliaVacio,
    },
  ];

  const camposNumeros = [
    {
      campo: Precio,
      mensaje: "no puede ser cero",
      setMensaje: setPrecioerror,
    },
    {
      campo: stock,
      mensaje: "no puede ser cero",
      setMensaje: setStockerror,
    },
  ];

  const validarinputs = () => {
    setFamiliaVacio("");
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

    camposNumeros.forEach(({ campo, mensaje, setMensaje }) => {
      if (campo <= 0) {
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
    const url = `${linkProducto}${"/"}${datos.idProducto}`;
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
    Nombre: agregarNombre,
    Codigo: agregarCodigo,
    Activo: agregarActivo,
    precio: Precio,
    Stock: stock,
    FechaCreacion: new Date(),
    IdFamilia: selectFamiliaP.idFamilia,
    FamiliadeProducto: selectFamiliaP,
  };

  const guardar = async (url: string) => {
    const response = await MetodoPut(url, data, JWT);

    if (response.data == "El codigo ya existe") {
      setCodigyaexiste("El cédigo ya existe.");
      return;
    }
    setActualizarProductos(!actualizarProductos);
    cerrarguardar(false);
  };

  return (
    <>
      <div className="container mt">
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAgregarNombre(e.target.value)
            }
          />
        </div>

        <div>
          <p className="vacio">{Precioerror} </p>
          <p>Precio</p>
          <input
            className="input"
            type="number"
            placeholder="Precio"
            value={Precio}
            onChange={Precioinput}
          />
        </div>

        <div>
          <p className="vacio">{Stockerror} </p>
          <p>Stock</p>
          <input
            className="input"
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={Stockinput}
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
        <div>
          <p className="vacio">{familiaeVacio} </p>
          <select
            className="button"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              itemselect(e)
            }
            value={selectFamiliaP?.idFamilia}
          >
            {familiaproduct.map((FP) => (
              <option key={FP.idFamilia} value={FP.idFamilia}>
                {FP.activo ? FP.nombre : "Familia no disponible"}
              </option>
            ))}
          </select>
        </div>

        <button className="botonagregar" onClick={validarinputs}>
          <p>Agregar</p>
        </button>
      </div>
    </>
  );
};

export default EditarProduct;
