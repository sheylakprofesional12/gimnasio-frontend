import { useState } from "react";
import EditarSocio from "../componentes/EditarSocio";
import FormularioSocio from "../componentes/FormularioSocio";
import DetalleSocio from "../componentes/DetalleSocio";
import MenuUsuario from "../componentes/MenuUsuario";

function Socios({ usuario, onVolver, onCerrarSesion }) {

  // =========================
  // ESTADOS
  // =========================

  const [socios, setSocios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [socioDetalle, setSocioDetalle] = useState(null);


  // =========================
  // LISTAR SOCIOS - FINALIDAD DE LA PÁGINA
  // GET /gimnasio
  // =========================

  const listarSocios = async () => {

    try {

      const respuesta = await fetch(
        "/api/gimnasio",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${usuario.token}`
          }
        }
      );

      if (respuesta.ok) {

        const datos = await respuesta.json();

        setSocios(datos);
        setMensaje("");

      } else {

        setMensaje("No se pudo obtener la lista de socios.");

      }

    } catch (error) {

      console.error(error);

      setMensaje("Error de conexión con el servidor.");

    }
  };


  // =========================
  // CAMBIAR ESTADO
  // PATCH /gimnasio/{id}/estado
  // =========================

  
const cambiarEstado = async (socio) => {
  try {
    const respuesta = await fetch(`/api/gimnasio/${socio.id}/estado`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${usuario.token}`
      },

      body: JSON.stringify({
        activo: !socio.activo
      })
    });

    if (respuesta.ok) {
      setMensaje("Estado actualizado correctamente.");
      listarSocios();
    } else {
      const detalle = await respuesta.text();

      console.error("Error HTTP:", respuesta.status);
      console.error("Respuesta del backend:", detalle);

      setMensaje(`No se pudo cambiar el estado. Error ${respuesta.status}`);
    }

  } catch (error) {
    console.error(error);
    setMensaje("Error de conexión con el servidor.");
  }
};




  // =========================
  // VER DETALLE DEL SOCIO
  // GET /gimnasio/{id}
  // =========================

  const verDetalleSocio = async (id) => {
    try {
      setMensaje("");

      const respuesta = await fetch(`/api/gimnasio/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${usuario.token}`
        }
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();

        setSocioSeleccionado(null);
        setSocioDetalle(datos);
      } else {
        setMensaje(
          `No se pudo consultar el socio. Error ${respuesta.status}`
        );
      }

    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor.");
    }
  };


  // =========================
  // ELIMINAR SOCIO - SOLO ADMIN
  // DELETE /gimnasio/{id}
  // =========================

  const eliminarSocio = async (socio) => {

    if (usuario.rol !== "ADMIN") {
      setMensaje("No tienes permisos para eliminar socios.");
      return;
    }

    const confirmar = window.confirm(
      `¿Estás seguro de eliminar al socio ${socio.nombre} ${socio.apellido}?`
    );

    if (!confirmar) return;

    try {

      const respuesta = await fetch(
        `/api/gimnasio/${socio.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${usuario.token}`
          }
        }
      );

      if (respuesta.ok) {

        setSocioSeleccionado(null);
        setSocioDetalle(null);

        await listarSocios();

        setMensaje("Socio eliminado correctamente.");

      } else {

        const detalle = await respuesta.text();

        console.error("Error al eliminar:", detalle);

        setMensaje(
          `No se pudo eliminar el socio. Error ${respuesta.status}`
        );

      }

    } catch (error) {

      console.error(error);

      setMensaje("Error de conexión con el servidor.");

    }
  };


  // =========================
  // INTERFAZ
  // =========================

  return (

    <div className="socios-pagina">

      {/* ENCABEZADO */}

      
      <header className="socios-encabezado">

        <button
          type="button"
          className="logo-enlace"
          onClick={onVolver}
          title="Volver al inicio"
        >
          YANFITNESS
        </button>

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



      {/* CONTENIDO PRINCIPAL */}

      <main className="socios-contenedor">


        {/* TÍTULO */}

        <div className="socios-cabecera">

          <div>

            <h2>Gestión de socios</h2>

            <p>
              Registro y administración de socios del gimnasio.
            </p>

          </div>


          <button
            className="boton-secundario"
            onClick={onVolver}
          >
            Volver al inicio
          </button>

        </div>


        {/* =========================
            REGISTRAR SOCIO
            ========================= */}

        <FormularioSocio
          usuario={usuario}
          onSocioRegistrado={listarSocios}
        />


        {/* =========================
            EDITAR SOCIO
            ========================= */}

        {socioSeleccionado && (

          <EditarSocio
            socio={socioSeleccionado}
            usuario={usuario}

            onActualizado={() => {

              listarSocios();

              setSocioSeleccionado(null);

            }}

            onCancelar={() => {

              setSocioSeleccionado(null);

            }}
          />

        )}


        {/* =========================
            DETALLE DEL SOCIO
            ========================= */}

        {socioDetalle && (
          <DetalleSocio
            socio={socioDetalle}
            onVolver={() => setSocioDetalle(null)}
          />
        )}

        {/* =========================
            LISTADO DE SOCIOS
            ========================= */}

        <div className="socios-tarjeta">


          {/* CABECERA DE LA TABLA */}

          <div className="titulo-tabla">

            <h3>Socios registrados</h3>

            <button
              className="boton-principal"
              onClick={listarSocios}
            >
              Actualizar lista
            </button>

          </div>


          {/* MENSAJES */}

          {mensaje && (

            <p className="mensaje">
              {mensaje}
            </p>

          )}


          {/* TABLA */}

          <div className="tabla-contenedor">


            {socios.length === 0 ? (

              <p>
                No hay socios para mostrar.
              </p>

            ) : (

              <table>

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>DNI</th>

                    <th>Nombre</th>

                    <th>Apellido</th>

                    <th>Teléfono</th>

                    <th>Correo</th>

                    <th>Estado</th>

                    <th>Acciones</th>

                  </tr>

                </thead>


                <tbody>


                  {socios.map((socio) => (

                    <tr key={socio.id}>


                      {/* ID */}

                      <td>
                        {socio.id}
                      </td>


                      {/* DNI */}

                      <td>
                        {socio.dni}
                      </td>


                      {/* NOMBRE */}

                      <td>
                        {socio.nombre}
                      </td>


                      {/* APELLIDO */}

                      <td>
                        {socio.apellido}
                      </td>


                      {/* TELÉFONO */}

                      <td>
                        {socio.telefono}
                      </td>


                      {/* CORREO */}

                      <td>
                        {socio.correo}
                      </td>


                      {/* ESTADO */}

                      <td>

                        <span
                          className={
                            socio.activo
                              ? "estado activo"
                              : "estado inactivo"
                          }
                        >

                          {socio.activo
                            ? "Activo"
                            : "Inactivo"}

                        </span>

                      </td>


                      {/* ACCIONES */}

                      <td>

                        <div className="acciones">

                      {/* VER DETALLE */}

                      <button
                        className="boton-secundario"
                        onClick={() => verDetalleSocio(socio.id)}
                      >
                        Ver detalle
                      </button>

                          {/* EDITAR */}

                          <button
                            className="boton-editar"
                            onClick={() =>
                              setSocioSeleccionado(socio)
                            }
                          >
                            Editar
                          </button>


                          {/* ACTIVAR / DESACTIVAR */}

                          <button
                            className="boton-estado"
                            onClick={() =>
                              cambiarEstado(socio)
                            }
                          >

                            {socio.activo
                              ? "Desactivar"
                              : "Activar"}

                          </button>


                          
                          {/* ELIMINAR - SOLO ADMIN */}

                          {usuario.rol === "ADMIN" && (
                            <button
                              className="boton-eliminar"
                              onClick={() => eliminarSocio(socio)}
                            >
                              Eliminar
                            </button>
                          )}



                        </div>

                      </td>


                    </tr>

                  ))}


                </tbody>

              </table>

            )}


          </div>

        </div>

      </main>

    </div>

  );
}

export default Socios;