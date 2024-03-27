import { createContext, useState } from "react";
import axios from "axios";
const ClimaContext = createContext();

// eslint-disable-next-line react/prop-types
const ClimaProvider = ({ children }) => {
  //manera de ver variable de entorno
  /*
  console.log(import.meta.env.VITE_API_KEY);*/
  //state de almacenamiento de busqueda
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState({});
  const [noResultado, setNoResultado] = useState(false);
  //funcion para guardar los datos de la busqueda
  const datosBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };
  const ConsultarClima = async (datos) => {
    setCargando(true);
    try {
      const { ciudad, pais } = datos;
      const appId = import.meta.env.VITE_API_KEY;
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;
      const { data } = await axios(url);
      const { lat, lon } = data[0];
      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
      //axios siempre retorna data, para evitar colisiones podes usar la sintaxis variable:nuevo nombre, asi se extrae y se crea y evitas conflictos
      const { data: clima } = await axios(urlClima);
      setResultado(clima);

      setNoResultado(false);
    } catch (error) {
      setNoResultado("NO HAY RESULTADOS");
    } finally {
      setCargando(false);
    }
  };
  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        datosBusqueda,
        ConsultarClima,
        resultado,
        cargando,
        noResultado,
      }}
    >
      {children}
    </ClimaContext.Provider>
  );
};

export { ClimaProvider };
export default ClimaContext;
