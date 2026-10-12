function DetalleSocio({ socio, onVolver }) {
  if (!socio) return null;

  return (
    <div className="tarjeta">
      <h3>Detalle del socio</h3>

      <div className="formulario-grid">
        <div className="campo">
          <label>DNI</label>
          <p>{socio.dni}</p>
        </div>

        <div className="campo">
          <label>Nombres</label>
          <p>{socio.nombre}</p>
        </div>

        <div className="campo">
          <label>Apellidos</label>
          <p>{socio.apellido}</p>
        </div>

        <div className="campo">
          <label>Teléfono</label>
          <p>{socio.telefono || "No registrado"}</p>
        </div>

        <div className="campo">
          <label>Correo electrónico</label>
          <p>{socio.correo || "No registrado"}</p>
        </div>

        <div className="campo">
          <label>Estado</label>
          <p>{socio.activo ? "Activo" : "Inactivo"}</p>
        </div>

        <div className="campo">
          <label>Fecha de registro</label>
          <p>
            {socio.fechaCreacion
              ? new Date(socio.fechaCreacion).toLocaleString("es-PE")
              : "No disponible"}
          </p>
        </div>
      </div>

      <div className="acciones-formulario">
        <button
          type="button"
          className="boton-secundario"
          onClick={onVolver}
        >
          Volver a socios
        </button>
      </div>
    </div>
  );
}

export default DetalleSocio;
