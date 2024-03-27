import Formulario from "./Formulario";
import Resultado from "./Resultado";
import useClima from "../hooks/useClima";
import Spinners from "./Spinners";
const AppClima = () => {
  const { resultado, cargando, noResultado } = useClima();
  return (
    <div>
      <main className="dos-columnas">
        <Formulario />

        {cargando ? (
          <Spinners />
        ) : resultado?.name ? (
          <Resultado />
        ) : noResultado ? (
          <p>{noResultado}</p>
        ) : (
          <p>El clima se mostrara aqui</p>
        )}
      </main>
    </div>
  );
};

export default AppClima;
