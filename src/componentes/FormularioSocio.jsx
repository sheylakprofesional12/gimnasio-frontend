import { useState } from "react";

function FormularioSocio({ usuario, onSocioRegistrado }) {

  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [activo, setActivo] = useState(true);

  const [mensaje, setMensaje] = useState("");

  const registrarSocio = async (e) => {

    e.preventDefault();

    try {

      const respuesta = await fetch(
        "http://localhost:8080/gimnasio",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`
          },

          body: JSON.stringify({
            dni,
            nombre,
            apellido,
            telefono,
            correo,
            activo
          })
        }
      );

      if (respuesta.ok) {

        setMensaje("Socio registrado correctamente.");

        setDni("");
        setNombre("");
        setApellido("");
        setTelefono("");
        setCorreo("");
        setActivo(true);

        onSocioRegistrado();

      } else {

        setMensaje("No se pudo registrar el socio.");

      }

    } catch (error) {

      console.error(error);

      setMensaje("Error de conexión con el servidor.");

    }
  };

return (
  <div className="tarjeta">

    <h3>Registrar nuevo socio</h3>

    <form onSubmit={registrarSocio}>

      <div className="formulario-grid">

        <div className="campo">
          <label>DNI</label>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            maxLength="8"
            placeholder="Ej. 12345678"
            required
          />
        </div>

        <div className="campo">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese el nombre"
            required
          />
        </div>

        <div className="campo">
          <label>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Ingrese el apellido"
          />
        </div>

        <div className="campo">
          <label>Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            maxLength="9"
            placeholder="Ej. 999999999"
          />
        </div>

        <div className="campo">
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="campo">
          <label>Estado</label>
          <select
            value={activo}
            onChange={(e) => setActivo(e.target.value === "true")}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

      </div>

      <div className="acciones-formulario">
        <button
          className="boton-principal"
          type="submit"
        >
          Registrar socio
        </button>
      </div>

    </form>

    {mensaje && (
      <p className="mensaje">{mensaje}</p>
    )}

  </div>
);
}

export default FormularioSocio;