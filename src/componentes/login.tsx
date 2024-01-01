import "./login.css";
import { useState } from "react";
import { HiEye } from "react-icons/hi2";
import { HiEyeSlash } from "react-icons/hi2";
import { registro, login } from "../url/Url";
import ValidarCorreo from "./validarcorreo";
import { InicioSesion } from "../store/iniciosesion";
import { MetodoPostLogin } from "../metodos/MetodoPostLogin";

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
    {
      campo: user,
      mensaje: "Por Favor Ingrese El User Name",
      setMensaje: setUserv,
    },
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
      campo: user,
      mensaje: "Por Favor Ingrese El User Name",
      setMensaje: setUserv,
    },
    {
      campo: password,
      mensaje: "Por Favor Ingrese Contraseña",
      setMensaje: setPasswordv,
    },
  ];

  const data: object = {
    username: user.trim(),
    password: password.trim(),
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

    Login(data);
  };

  const Login = async (data: object) => {
    setUserB("");

    const response = await MetodoPostLogin(login, data);

    console.log(response);

    if (response.data === "usuariobloqueado") {
      setUserB("Usuario Bloqueaqdo, Intente con otro correo");
      return;
    }
    if (response.data === "Login incorrecto") {
      setUserB("Login Incorrecto");
      return;
    }
    if (response.data === "contraseña Invalida") {
      setUserB("Contraseña Incorrecta");
      return;
    }
    if (response.status === 200) {
      guardariniciosesion(response.data);
    }
  };

  interface response {
    token: string;
    expiracion: string;
  }

  const guardariniciosesion = (dtaGuardar: response) => {
    const data: object = {
      token: dtaGuardar.token,
      expiracion: dtaGuardar.expiracion,
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
          email: email.trim(),
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
    const response = await MetodoPostLogin(registro, data);

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
              <p className="camposVacios">{emailV}</p>
              <input
                className="nombre"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div className="margintop-5">
            <p className="camposVacios">{userV}</p>
            <input
              className="email"
              type="text"
              placeholder="User Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
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
                  required
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
                    required
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
