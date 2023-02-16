import {useRef, useState} from 'react';
enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}
export const useCalculadora = () => {
  const initalStateNumero = '0';
  const initalStateNumeroAnterior = '0';
  const [numero, setnumero] = useState(initalStateNumero);
  const [numeroAnterior, setnumeroAnterior] = useState(
    initalStateNumeroAnterior,
  );

  const ultimaOperacion = useRef<Operadores>();
  const limpiar = () => {
    setnumero('0');
    setnumeroAnterior('0');
  };

  const del = () => {
    if (numero.includes('-') && numero.length === 2) {
      setnumero('0');
      return;
    }
    const nuevoNumero = numero.slice(0, -1);
    nuevoNumero.length === 0 ? setnumero('0') : setnumero(nuevoNumero);
  };

  const armarNumero = (numeroTexto: string) => {
    // No aceptar doble punto decimal
    if (numero.includes('.') && numeroTexto === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // Punto decimal
      if (numeroTexto === '.') {
        setnumero(numero + numeroTexto);

        // Evaluar si es otro cero, y hay un punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setnumero(numero + numeroTexto);

        // Evaluar si es diferente de cero y no tiene un punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setnumero(numeroTexto);

        // Evitar 0000.0
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setnumero(numero);
      } else {
        setnumero(numero + numeroTexto);
      }
    } else {
      setnumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    numero.includes('-')
      ? setnumero(numero.replace('-', ''))
      : setnumero(`-${numero}`);
  };

  const cambiarNumPorAnterior = () => {
    numero.endsWith('.')
      ? setnumeroAnterior(numero.slice(0, -1))
      : setnumeroAnterior(numero);

    setnumero('0');
  };

  const botonDividir = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };
  const botonMultiplicar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };
  const botonRestar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  };
  const botonSumar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };

  const calcular = () => {
    if (numeroAnterior === '0') return;
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setnumero(`${num1 + num2}`);
        break;
      case Operadores.restar:
        setnumero(`${num2 - num1}`);
        break;
      case Operadores.multiplicar:
        setnumero(`${num2 * num1}`);
        break;
      case Operadores.dividir:
        setnumero(`${num2 / num1}`);
        break;
    }
    setnumeroAnterior('0');
  };

  return {
    numeroAnterior,
    numero,
    del,
    limpiar,
    positivoNegativo,
    armarNumero,
    botonDividir,
    botonMultiplicar,
    botonRestar,
    botonSumar,
    calcular,
    cambiarNumPorAnterior,
  };
};
