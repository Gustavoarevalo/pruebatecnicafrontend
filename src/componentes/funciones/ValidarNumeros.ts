const ValidarNumeros = (numero: string) => {
  let nuevoValor = numero;

  if (/[^0-9.]/.test(nuevoValor)) {
    return "caracteres";
  } else {
    const puntos = nuevoValor.split(".").length - 1;
    if (puntos > 1) {
      nuevoValor = nuevoValor.slice(0, nuevoValor.lastIndexOf("."));
      return "haymasdeunpunto";
    }
  }

  return true;
};

export default ValidarNumeros;
