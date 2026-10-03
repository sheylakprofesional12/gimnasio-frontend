import { useState } from "react";

function EditarSocio({ socio, usuario, onActualizado, onCancelar }) {

  const [correo, setCorreo] = useState(socio.correo || "");
  const [telefono, setTelefono] = useState(socio.telefono || "");
  const [mensaje, setMensaje] = useState("");

  const actualizarSocio = async (e) => {

    e.preventDefault();

    try {

      const respuesta = await fetch(
        `http://localhost:8080/gimnasio/${socio.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`
          },

          body: JSON.stringify({
            correo,
            telefono
          })
        }
      );

      if (respuesta.ok) {

        setMensaje("Socio actualizado correctamente.");

        onActualizado();

      } else {

        setMensaje("No se pudo actualizar el socio.");

      }

    } catch (error) {

      console.error(error);
      setMensaje("Error de conexión con el servidor.");

    }
  };

  return (
  <div className="tarjeta">

    <h3>Editar socio</h3>

    <p className="texto-ayuda">
      Actualice la información de contacto del socio seleccionado.
    </p>

    <div className="datos-socio">
      <p>
        <strong>Socio:</strong> {socio.nombre} {socio.apellido}
      </p>

      <p>
        <strong>DNI:</strong> {socio.dni}
      </p>
    </div>

    <form onSubmit={actualizarSocio}>

      <div className="formulario-grid">

        <div className="campo">
          <label>Teléfono</label>

          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            maxLength="9"
          />
        </div>

        <div className="campo">
          <label>Correo</label>

          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

      </div>

      <div className="acciones-formulario">

        <button
          className="boton-principal"
          type="submit"
        >
          Guardar cambios
        </button>

        <button
          className="boton-secundario"
          type="button"
          onClick={onCancelar}
        >
          Cancelar
        </button>

      </div>

    </form>

    {mensaje && (
      <p className="mensaje">{mensaje}</p>
    )}

  </div>
);

}

export default EditarSocio;