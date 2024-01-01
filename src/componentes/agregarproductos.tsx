import "./agregarproductos.css";
import "./agregarfamiliadeproductos.css";
import React, { useState } from "react";
import { linkProducto } from "../url/Url";
import { MetodoPost } from "../metodos/post";
import { ActualizarProductos } from "../store/actualizarproductos";
import { ObtenerDatosFP } from "../store/obtenerdatos";
import { ObtenerJwtStore } from "../store/JwtStore";
import ValidarNumeros from "./funciones/ValidarNumeros";

interface AgregarProductoProps {
  cerrarguardar: (valor: boolean) => void;
}

const AgregarProducto: React.FC<AgregarProductoProps> = ({ cerrarguardar }) => {
  const [agregarCodigo, setAgregarCodigo] = useState<string>("");
  const [agregarNombre, setAgregarNombre] = useState<string>("");
  const [Precio, setPrecio] = useState<number>(0);
  const [PrecioString, setPrecioString] = useState<string>("");
  const [stock, setStock] = useState<number | null>(null);
  const [stockString, setStockString] = useState<string>("");
  const [agregarActivo, setAgregarActivo] = useState<boolean>(true);
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

  const Nombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAgregarNombre(value);
  };

  const Precioinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecioerror("");
    const value = e.target.value;

    const validarPrecio = ValidarNumeros(value);
    if (validarPrecio === "caracteres") {
      setPrecioerror("Ingrese Solo Numeros");
    }
    if (validarPrecio === "haymasdeunpunto") {
      setPrecioerror("solo se puede agregar un punto decimal");
    }
    if (validarPrecio === true) {
      let convertirnumero: number = 0;
      convertirnumero = parseFloat(value);
      setPrecio(convertirnumero);
    }

    setPrecioString(value);
  };

  const Stockinput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const validarStock = ValidarNumeros(value);

    if (validarStock === "caracteres") {
      setStockerror("Ingrese Solo Numeros");
    }

    if (validarStock === true) {
      let convertirnumero: number = 0;
      convertirnumero = parseInt(value);
      setStock(convertirnumero);
    }
    setStockString(value);
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

      setMensaje: setPrecioerror,
    },
    {
      campo: stock,

      setMensaje: setStockerror,
    },
  ];

  const validarinputs = () => {
    setFamiliaVacio("");
    setCodigyaexiste("");
    setCodigomayor("");
    setCodigoVacio("");
    setNombreVacio("");
    setPrecioerror("");
    setStockerror("");
    var camposVacios: boolean = false;

    campos.forEach(({ campo, mensaje, setMensaje }) => {
      if (campo === "") {
        setMensaje(mensaje);
        camposVacios = true;
      }
    });
    camposNumeros.forEach(({ campo, setMensaje }) => {
      if (!isNaN(Number(campo))) {
        if (Number(campo) < 0) {
          setMensaje("No se puede ingresar 0");
          camposVacios = true;
        }
      } else {
        setMensaje("Ingrese solo números");
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

  const data: object = {
    Nombre: agregarNombre,
    Codigo: agregarCodigo,
    Activo: agregarActivo,
    Precio: Precio,
    Stock: stock,
    IdFamilia: selectFamiliaP.idFamilia,
    //  FamiliadeProductos: selectFamiliaP,
  };

  const guardar = async () => {
    const response = await MetodoPost(linkProducto, data, JWT);
    console.log(response);

    if (response.data == "El código ya existe.") {
      setCodigyaexiste("El código ya existe.");
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
            onChange={Nombre}
          />
        </div>

        <div>
          <p className="vacio">{Precioerror} </p>
          <p>Precio</p>
          <input
            className="input"
            type="text"
            placeholder="Precio"
            value={PrecioString}
            onChange={Precioinput}
          />
        </div>

        <div>
          <p className="vacio">{Stockerror} </p>
          <p>Stock</p>
          <input
            className="input"
            type="text"
            placeholder="Stock"
            value={stockString}
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

export default AgregarProducto;
