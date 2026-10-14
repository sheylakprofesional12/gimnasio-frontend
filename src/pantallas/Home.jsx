import MenuUsuario from "../componentes/MenuUsuario";
function Home({ usuario, onSocios, onRegistrarUsuario, onReportes, onCerrarSesion }) {
console.log("USUARIO COMPLETO:", usuario);
console.log("ROL RECIBIDO:", usuario?.rol);
  return (
    <div className="home-pagina">

      <header className="home-encabezado">

        <div className="home-marca">

          <div className="home-logo">
            YF
          </div>

          <div>
            <h1>YANFITNESS</h1>
            <span>Sistema de Gestión de Gimnasio</span>
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

        <section className="home-bienvenida">

          <p className="home-etiqueta">
            PANEL DE ADMINISTRACIÓN
          </p>

          <h2>
            Bienvenido, {usuario.username}
          </h2>

          <p>
            Desde este panel puede acceder a las opciones
            disponibles del sistema YANFITNESS.
          </p>

        </section>


        <h3 className="home-titulo-opciones">
          Módulos del sistema
        </h3>


        <section className="home-modulos">

          <div className="home-modulo">

            <div className="home-icono">
              S
            </div>

            <div className="home-modulo-contenido">

              <h3>Gestión de socios</h3>

              <p>
                Registre, consulte, edite y administre el
                estado de los socios del gimnasio.
              </p>

              <button
                className="home-boton-principal"
                onClick={onSocios}
              >
                Gestionar socios
              </button>

            </div>

          </div>


{["ADMIN", "ADMINISTRADOR"].includes(usuario.rol) && (
  <div className="home-modulo">

    <div className="home-icono">
      U
    </div>

    <div className="home-modulo-contenido">

      <h3>Gestión de usuarios</h3>

      <p>
        Registre nuevos usuarios del sistema
        y administre sus roles de acceso.
      </p>

      <button
        className="home-boton-principal"
        onClick={onRegistrarUsuario}
      >
        Registrar usuarios
      </button>

    </div>

  </div>
)}


   
{["ADMIN", "ADMINISTRADOR"].includes(usuario.rol) && (
  <div className="home-modulo">

    <div className="home-icono">
      R
    </div>

    <div className="home-modulo-contenido">

      <h3>Reportes</h3>

      <p>
        Consulte el total de socios, socios activos,
        inactivos y nuevos registros del mes.
      </p>

      <button
        type="button"
        className="home-boton-principal"
        onClick={onReportes}
      >
        Ver reportes
      </button>

    </div>

  </div>
)}
  

        </section>


        <div className="home-pie">
          <span>
            YANFITNESS · Sistema Administrativo
          </span>
        </div>

      </main>

    </div>
  );
}

export default Home;