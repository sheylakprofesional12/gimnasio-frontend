
import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mantenerSesion, setMantenerSesion] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      const respuesta = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!respuesta.ok) {
        setMensaje(
          respuesta.status === 401
            ? "Usuario o contraseña incorrectos."
            : `Error al iniciar sesión (${respuesta.status}).`
        );
        return;
      }

      const datos = await respuesta.json();

      const usuarioAutenticado = {
  username: datos.username,
  rol: datos.rol,
  token: datos.token
};

if (mantenerSesion) {
  localStorage.setItem("yanfitness_usuario", JSON.stringify(usuarioAutenticado));
} else {
  localStorage.removeItem("yanfitness_usuario");
}

onLogin(usuarioAutenticado);

    } catch (error) {
      console.error(error);
      setMensaje("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="yf2-pagina">
      <div className="yf2-contenedor">

        {/* IMAGEN SUPERIOR ORIGINAL */}
        <div className="yf2-imagen">
          <img
            src="/yanfitness-login.png"
            alt="YANFITNESS - Sistema de gestión de gimnasio"
          />
        </div>

        {/* FORMULARIO VERSION 2.0 */}
        <div className="yf2-formulario">

          <div className="yf2-marca">
            <div className="yf2-logo">YF</div>
            <h1>YANFITNESS</h1>
          </div>

          <div className="yf2-bienvenida">
            <h2>BIENVENIDO</h2>
            <p>
              Ingresa tus credenciales para acceder
              al sistema de gestión.
            </p>
          </div>

          <form onSubmit={iniciarSesion} className="yf2-form">

            <div className="yf2-campo">
              <label htmlFor="yf2-usuario">Usuario</label>
              <div className="yf2-input">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                </svg>
                <input
                  id="yf2-usuario"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="yf2-campo">
              <div className="yf2-password-encabezado">
              <label htmlFor="yf2-password">Contraseña</label>

              <button
                type="button"
                className="yf2-olvide"
                onClick={() =>
                  alert("Para recuperar tu contraseña, contacta al administrador del sistema.")
                }
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
              <div className="yf2-input">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  id="yf2-password"
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="yf2-ver"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  aria-label={
                    mostrarPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {mostrarPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>


            {/* MANTENER SESIÓN INICIADA */}
                      <div className="yf2-opciones">
              <label className="yf2-recordar">
                <input
                  type="checkbox"
                  checked={mantenerSesion}
                  onChange={(e) => setMantenerSesion(e.target.checked)}
                />
                <span>Mantener sesión iniciada</span>
              </label>
            </div>
           {/* BOTÓN INICIAR SESIÓN */}
            <button 
                            
              type="submit"
              className="yf2-boton"
              disabled={cargando}
            >
              {cargando ? "Ingresando..." : "Iniciar sesión  →"}
            </button>

            {mensaje && (
              <p className="yf2-error" role="alert">
                {mensaje}
              </p>
            )}
          </form>

          <div className="yf2-footer">
            <span>YANFITNESS · Sistema Administrativo</span>
            <span>v2.0</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
