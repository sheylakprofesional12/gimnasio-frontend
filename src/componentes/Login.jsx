import { useState } from "react";

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {

      const respuesta = await fetch(
        "http://localhost:8080/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const datos = await respuesta.json();

      if (respuesta.ok) {

        onLogin({
          username: datos.username,
          rol: datos.rol,
          token: datos.token
        });

      } else {

        setMensaje("Usuario o contraseña incorrectos.");

      }

    } catch (error) {

      console.error(error);
      setMensaje("No se pudo conectar con el servidor.");

    }
  };

 return (
  <div className="login-pagina">

    <div className="login-contenedor">

      {/* LADO IZQUIERDO */}
      <div className="login-imagen">
        <img
          src="/yanfitness-login.png"
          alt="YANFITNESS"
        />
      </div>


      {/* LADO DERECHO */}
      <div className="login-formulario">

        <div className="login-marca">

         <div className="login-marca">

  <div className="login-logo-texto">
    <span className="logo-yan">YAN</span>
    <span className="logo-fitness">FITNESS</span>
  </div>

  <p>
    Sistema de Gestión de Gimnasio
  </p>

</div>
        </div>


        <div className="login-card">

          <h2>Bienvenido</h2>

          <p className="login-descripcion">
            Ingrese sus credenciales para acceder al sistema
          </p>


          <form onSubmit={iniciarSesion}>

            <div className="campo">

              <label>Usuario</label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Ingrese su usuario"
              />

            </div>


            <div className="campo">

              <label>Contraseña</label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Ingrese su contraseña"
              />

            </div>


            <button
              type="submit"
              className="boton-login"
            >
              Iniciar sesión
            </button>

          </form>


          {mensaje && (
            <p className="mensaje-login">
              {mensaje}
            </p>
          )}


          <div className="login-footer">
            YANFITNESS · Sistema Administrativo
          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default Login;