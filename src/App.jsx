import { useState } from "react";
import Login from "./componentes/Login";
import Home from "./pantallas/Home";
import Socios from "./pantallas/Socios";
import "./App.css";

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
      />
    );
  }

  return (
    <Home
      usuario={usuario}
      onSocios={irASocios}
      onCerrarSesion={cerrarSesion}
    />
  );
}

export default App;