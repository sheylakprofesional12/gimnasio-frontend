
import { useState, useEffect } from "react";
import MenuUsuario from "../componentes/MenuUsuario";

function Reportes({ usuario, onVolver, onCerrarSesion }) {

  const [reporte, setReporte] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const obtenerReporte = async () => {
    setCargando(true);
    setMensaje("");

    try {
      const respuesta = await fetch("/api/gimnasio/reporte", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${usuario.token}`
        }
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();
        setReporte(datos);
      } else {
        setMensaje(
          `No se pudo obtener el reporte. Error ${respuesta.status}`
        );
      }

    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (usuario.rol === "ADMIN") {
      obtenerReporte();
    }
  }, [usuario.token, usuario.rol]);

  if (usuario.rol !== "ADMIN") {
    return <p>No tienes permisos para consultar reportes.</p>;
  }

  return (
    <div className="home-pagina">

      <header className="home-encabezado">
        <div className="home-marca">
          <div className="home-logo">YF</div>

          <div>
            <h1>YANFITNESS</h1>
            <span>Reportes de socios</span>
          </div>
        </div>

        <div className="home-usuario">
        <div>
            <span>Usuario</span>
            <strong>{usuario.username}</strong>
        </div>

        <MenuUsuario
            usuario={usuario}
            onCerrarSesion={onCerrarSesion}
        />
        </div>
      </header>

      <main className="home-contenedor">

        <button
          className="boton-secundario"
          onClick={onVolver}
        >
          Volver al inicio
        </button>

        <div className="reportes-cabecera">
          <h2>Reportes de socios</h2>

          <p>
            Resumen general de los socios registrados
            en el gimnasio.
          </p>
        </div>

        <button
          className="home-boton-principal"
          onClick={obtenerReporte}
          disabled={cargando}
        >
          {cargando ? "Cargando..." : "Actualizar reporte"}
        </button>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        {reporte && (
          <div className="reportes-grid">

            <div className="reporte-tarjeta">
              <h3>Total de socios</h3>
              <p>{reporte.total}</p>
            </div>

            <div className="reporte-tarjeta">
              <h3>Socios activos</h3>
              <p>{reporte.activos}</p>
            </div>

            <div className="reporte-tarjeta">
              <h3>Socios inactivos</h3>
              <p>{reporte.inactivos}</p>
            </div>

            <div className="reporte-tarjeta">
              <h3>Registrados este mes</h3>
              <p>{reporte.creadosEsteMes}</p>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default Reportes;
