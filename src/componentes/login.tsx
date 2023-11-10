import "./login.css";
import { useState } from "react";
import { HiEye } from "react-icons/hi2";
import { HiEyeSlash } from "react-icons/hi2";
import { registro, login } from "../url/Url";
import { MetodoPost } from "../metodos/post";
import ValidarCorreo from "./validarcorreo";
import { InicioSesion } from "../store/iniciosesion";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [presspassword, setPresspassword] = useState<boolean>(false);
  const [crearcuenta, setCrearcuenta] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [repetirpass, setRepetirpass] = useState<string>("");
  const [repetirpresspassword, setRepetirPresspassword] =
    useState<boolean>(false);
  const [userV, setUserv] = useState<string>("");
  const [emailV, setEmailv] = useState<string>("");
  const [passwordV, setPasswordv] = useState<string>("");
  const [repetirpassV, setRepetirpassv] = useState<string>("");
  const [userB, setUserB] = useState<string>("");
  const [usuariocreado, setUsuarioCreado] = useState<string>("");
  const { inicio, setInicio } = InicioSesion();

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleRepetirPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepetirpass(value);
  };

  const handlepresscrearcuenta = () => {
    setCrearcuenta(!crearcuenta);
    setUserv("");
    setEmailv("");
    setPasswordv("");
    setRepetirpassv("");
    setUserB("");
  };

  const campos = [
    { campo: user, mensaje: "Por Favor Ingrese Nombre", setMensaje: setUserv },
    {
      campo: email,
      mensaje: "Por Favor Ingrese Correo Electronico",
      setMensaje: setEmailv,
    },
    {
      campo: password,
      mensaje: "Por Favor Ingrese Contraseña",
      setMensaje: setPasswordv,
    },
    {
      campo: repetirpass,
      mensaje: "Confirme Contraseña",
      setMensaje: setRepetirpassv,
    },
  ];

  const camposlogin = [
    {
      campo: email,
      mensaje: "Por Favor Ingrese Correo Electronico",
      setMensaje: setEmailv,
    },
    {
      campo: password,
      mensaje: "Por Favor Ingrese Contraseña",
      setMensaje: setPasswordv,
    },
  ];

  const data: object = {
    correo: email,
    contrasenia: password,
  };

  const verificarConstLogin = () => {
    var camposVacios: boolean = false;

    camposlogin.forEach(({ campo, mensaje, setMensaje }) => {
      if (campo === "") {
        setMensaje(mensaje);
        camposVacios = true;
      }
    });

    if (camposVacios) {
      return;
    }

    camposlogin.forEach(({ campo, setMensaje }) => {
      if (campo) {
        setMensaje("");
      }
    });

    const validar = ValidarCorreo(email);
    if (validar) {
      Login(data);
    } else {
      setUserB("Ingrese un correo electrónico valido");
    }
  };

  const Login = async (data: object) => {
    setUserB("");
    const response = await MetodoPost(login, data);

    if (response.data === "usuario bloqueado") {
      setUserB("Usuario Bloqueaqdo, Intente con otro correo");
      return;
    }
    if (response.data === "Invalid credentials") {
      setUserB("Contraseña Incorrecta");
      return;
    }
    if (response.status === 200) {
      guardariniciosesion(response.data);
    }
  };
  const guardariniciosesion = (nombre: string) => {
    interface data {
      nombre: string;
      verdadero: boolean;
    }
    const data: data = {
      nombre: nombre,
      verdadero: true,
    };
    localStorage.setItem("inicio", JSON.stringify(data));
    setInicio(!inicio);
  };

  const verificarConstRegistro = () => {
    setUsuarioCreado("");
    setUserB("");
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

    campos.forEach(({ setMensaje }) => {
      setMensaje("");
    });

    const validar = ValidarCorreo(email);
    if (validar) {
      if (password === repetirpass) {
        const nuevaData: object = {
          nombre: user,
          ...data,
        };

        RegistarUsuario(nuevaData);
      } else {
        setUserB("las contraseñas no coinciden");
      }
    } else {
      setUserB("Ingrese un correo electrónico valido");
    }
  };

  const RegistarUsuario = async (data: object) => {
    const response = await MetodoPost(registro, data);

    if (response.status === 200) {
      setUsuarioCreado("Usuario Creado");
    }
    if (response.status === 401) {
      setUserB("Correo Electrónico ya existe");
    }
  };

  return (
    <div className="container">
      <p className="usuariocreado"> {usuariocreado} </p>
      <p className="camposVacios">{userB}</p>
      <div className="divInterno">
        <div className="alinearitems">
          <p className="login">{crearcuenta ? "Registro" : "Iniciar Sesión"}</p>

          {crearcuenta && (
            <div className="margintop-5">
              <p className="camposVacios">{userV}</p>
              <input
                className="nombre"
                type="text"
                placeholder="Nombres"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
          )}
          <div className="margintop-5">
            <p className="camposVacios">{emailV}</p>
            <input
              className="email"
              type="email"
              placeholder="Emaiil"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="margintop-5">
              <p className="camposVacios">{passwordV}</p>
              <div className="divdepassword">
                <input
                  className="password "
                  type={presspassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={handlePassword}
                />

                <button
                  onClick={() => setPresspassword(!presspassword)}
                  className="ml-8"
                >
                  {presspassword ? (
                    <HiEyeSlash
                      style={{
                        width: 20,
                        height: 20,
                        color: "green",
                        background: "transparent",
                        border: "none",
                        display: "inline-block",
                      }}
                    />
                  ) : (
                    <HiEye
                      style={{
                        width: 20,
                        height: 20,
                        color: "green",
                      }}
                    />
                  )}
                </button>
              </div>
            </div>

            {crearcuenta && (
              <div className="margintop-5">
                <p className="camposVacios">{repetirpassV}</p>
                <div className="divrepetirpassword">
                  <input
                    className="password"
                    type={repetirpresspassword ? "text" : "password"}
                    placeholder=" Confirmar Contraseña"
                    value={repetirpass}
                    onChange={handleRepetirPassword}
                  />

                  <button
                    onClick={() =>
                      setRepetirPresspassword(!repetirpresspassword)
                    }
                    className="ml-8"
                  >
                    {repetirpresspassword ? (
                      <HiEyeSlash
                        style={{
                          width: 20,
                          height: 20,
                          color: "green",
                          background: "transparent",
                          border: "none",
                          display: "inline-block",
                        }}
                      />
                    ) : (
                      <HiEye
                        style={{
                          width: 20,
                          height: 20,
                          color: "green",
                        }}
                      />
                    )}
                  </button>
                </div>
              </div>
            )}

            <button
              className="buttoniniciarsesion"
              onClick={
                crearcuenta ? verificarConstRegistro : verificarConstLogin
              }
            >
              <p className="iniciar">
                {crearcuenta ? "Registrar" : "Iniciar Sesión"}
              </p>
            </button>
          </div>

          <button
            className="buttoncrearcuenta"
            onClick={handlepresscrearcuenta}
          >
            <p className="iniciar">
              {crearcuenta ? "Ya, Tengo Cuenta" : "Crear Cuenta"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
