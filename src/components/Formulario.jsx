import { useState } from "react";
import useClima from "../hooks/useClima";
const Formulario = () => {
  //de aca se extraen los datos del provider
  const { busqueda, datosBusqueda, ConsultarClima } = useClima();
  //states normales
  const [alerta, setAlerta] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(busqueda).includes("")) {
      setAlerta("Todos los campos son obligatorios");
      return;
    }
    setAlerta("");
    ConsultarClima(busqueda);
  };
  return (
    <div className="contenedor">
      {alerta && <p>{alerta}</p>}
      <form action="">
        <div className="campo">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            onChange={datosBusqueda}
            value={busqueda.ciudad}
          />
        </div>
        <div className="campo">
          <label htmlFor="pais">Pais</label>
          <select
            name="pais"
            id="pais"
            onChange={datosBusqueda}
            value={busqueda.pais}
          >
            <option value="">Selecciona un Pais</option>
            <option value="US">Estados Unidos</option>
            <option value="MX">Mexico</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
            <option value="CR">Costa Rica</option>
            <option value="ES">España</option>
            <option value="PE">Perú</option>
            <option value="SV">El salvador</option>
            <option value="HN">Honduras</option>
            <option value="GT">Guatemala</option>
          </select>
        </div>
        <input type="submit" onClick={handleSubmit} value={"Consultar clima"} />
      </form>
    </div>
  );
};

export default Formulario;
