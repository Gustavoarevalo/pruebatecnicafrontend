const ValidarCorreo = (correo: string) => {
  const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regexCorreo.test(correo);
};

export default ValidarCorreo;
