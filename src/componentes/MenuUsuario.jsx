
import { useState } from "react";

function MenuUsuario({ usuario, onCerrarSesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="usuario-menu">

      <button
        type="button"
        className="home-rol boton-rol"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-expanded={menuAbierto}
        aria-haspopup="true"
      >
        {usuario.rol} ▾
      </button>

      {menuAbierto && (
        <div className="menu-desplegable">
          <button
            type="button"
            className="menu-cerrar-sesion"
            onClick={onCerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      )}

    </div>
  );
}

export default MenuUsuario;
