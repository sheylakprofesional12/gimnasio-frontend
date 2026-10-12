
import { useState } from "react";

function RegistrarUsuario({ usuario }) {

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("ADMIN");
  const [mensaje, setMensaje] = useState("");

  // REGISTRAR USUARIO
  const registrarUsuario = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const respuesta = await fetch("/api/auth/registrar", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`
        },

        body: JSON.stringify({
          username,
          password,
          rol
        })
      });

      if (respuesta.ok) {

        setMensaje("Usuario registrado correctamente.");

        // Limpiar formulario
        setNombreCompleto("");
        setUsername("");
        setPassword("");
        setRol("ADMIN");

     
          } else {
            const detalle = await respuesta.text();

            console.error("Error del backend:", detalle);

            if (respuesta.status === 409) {
              setMensaje(
                "El nombre de usuario ya se encuentra registrado. Ingresa uno diferente."
              );
            } else if (respuesta.status === 400) {
              setMensaje(
                "Los datos ingresados no son válidos. Verifica la información."
              );
            } else if (respuesta.status === 401 || respuesta.status === 403) {
              setMensaje(
                "No tienes autorización para registrar usuarios."
              );
            } else {
              setMensaje(
                `No se pudo registrar el usuario. Error ${respuesta.status}`
              );
            }
          }


    } catch (error) {

      console.error(error);
      setMensaje("Error de conexión con el servidor.");

    }
  };

  return (
    <div className="tarjeta">

      <h3>Registrar usuario del sistema</h3>

      <form onSubmit={registrarUsuario}>

        <div className="formulario-grid">

          {/* NOMBRES Y APELLIDOS */}
          <div className="campo">

            <label>Nombres y apellidos</label>

            <input
              type="text"
              value={nombreCompleto}
              onChange={(e) =>
                setNombreCompleto(e.target.value)
              }
              placeholder="Ej. Ivonne Fasanando"
              required
            />

          </div>

          {/* NOMBRE DE USUARIO */}
          <div className="campo">

            <label>Nombre de usuario</label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              minLength={3}
              maxLength={50}
              pattern="[A-Za-z0-9._]+"
              title="Utilice letras, números, puntos o guiones bajos, sin espacios."
              placeholder="Ej. ivonne.fasanando"
              required
            />

          </div>

          {/* CONTRASEÑA */}
          <div className="campo">

            <label>Contraseña</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              minLength={6}
              maxLength={100}
              placeholder="Mínimo 6 caracteres"
              required
            />

          </div>

          {/* ROL */}
          <div className="campo">

            <label>Rol</label>

            <select
              value={rol}
              onChange={(e) =>
                setRol(e.target.value)
              }
            >
              <option value="ADMIN">
                Administrador
              </option>

              <option value="EMPLEADO">
                Empleado
              </option>
            </select>

          </div>

        </div>

        <div className="acciones-formulario">

          <button
            className="boton-principal"
            type="submit"
          >
            Registrar usuario
          </button>

        </div>

      </form>

      {mensaje && (
        <p className="mensaje">{mensaje}</p>
      )}

    </div>
  );
}

export default RegistrarUsuario;
