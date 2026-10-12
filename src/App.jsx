
import { useState } from "react";
import Login from "./componentes/Login";
import Home from "./pantallas/Home";
import Socios from "./pantallas/Socios";
import RegistrarUsuario from "./componentes/RegistrarUsuario";
import MenuUsuario from "./componentes/MenuUsuario";
import "./App.css";
import Reportes from "./pantallas/Reportes";

function App() {

  const [usuario, setUsuario] = useState(null);
  const [pantallaActual, setPantallaActual] = useState("inicio");

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    setPantallaActual("inicio");
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setPantallaActual("inicio");
  };

  const irASocios = () => {
    setPantallaActual("socios");
  };

  const irAReportes = () => {
  if (usuario?.rol === "ADMIN") {
    setPantallaActual("reportes");
  }
  };

  const irARegistrarUsuario = () => {
    if (usuario?.rol === "ADMIN") {
      setPantallaActual("registrarUsuario");
    }
  };

  const volverInicio = () => {
    setPantallaActual("inicio");
  };

  if (usuario === null) {
    return <Login onLogin={iniciarSesion} />;
  }

  if (pantallaActual === "socios") {
    return (
      <Socios
        usuario={usuario}
        onVolver={volverInicio}
        onCerrarSesion={cerrarSesion}
      />
    );
  }


  
  if (pantallaActual === "reportes" && usuario.rol === "ADMIN") {
  return (
    <Reportes
      usuario={usuario}
      onVolver={volverInicio}
      onCerrarSesion={cerrarSesion}
    />
  );
  }


  
if (pantallaActual === "registrarUsuario") {
  return (
    <div className="home-pagina">

      <header className="home-encabezado">

        
      <button
        type="button"
        className="home-marca marca-enlace"
        onClick={volverInicio}
        title="Volver al inicio"
      >
        <div className="home-logo">YF</div>

        <div>
          <h1>YANFITNESS</h1>
          <span>Sistema de Gestión de Gimnasio</span>
        </div>
      </button>


        
      <div className="home-usuario">

        <div>
          <span>Usuario</span>
          <strong>{usuario.username}</strong>
        </div>

        <MenuUsuario
          usuario={usuario}
          onCerrarSesion={cerrarSesion}
        />

      </div>


      </header>

      <main className="home-contenedor">

        <button
          className="boton-secundario"
          onClick={volverInicio}
        >
          Volver al inicio
        </button>

        <RegistrarUsuario usuario={usuario} />

      </main>

    </div>
  );
}


  
  return (
    <Home
      usuario={usuario}
      onSocios={irASocios}
      onRegistrarUsuario={irARegistrarUsuario}
      onReportes={irAReportes}
      onCerrarSesion={cerrarSesion}
    />
  );
}

export default App;
