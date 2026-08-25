import {
  Monitor,
  UserRound,
  ArrowRight
} from "lucide-react";

function RoleSelector({ onSelect }) {

  return (

    <div className="auth-content">

      <div className="eyebrow">
        ACCESO AL SISTEMA
      </div>

      <h2>
        ¿Cómo querés
        <br />
        ingresar?
      </h2>

      <p className="subtitle">
        Seleccioná tu perfil para continuar con el acceso.
      </p>

      <div className="role-list">

        <button
          className="role-card"
          onClick={() => onSelect("DIRECTOR")}
        >

          <div className="role-icon director">
            <Monitor size={23} />
          </div>

          <div className="role-info">
            <strong>DIRECTOR TÉCNICO</strong>

            <span>
              Gestión de plantilla, tácticas y
              rendimiento del equipo
            </span>
          </div>

          <ArrowRight className="role-arrow" size={20} />

        </button>

        <button
          className="role-card"
          onClick={() => onSelect("JUGADOR")}
        >

          <div className="role-icon player">
            <UserRound size={23} />
          </div>

          <div className="role-info">
            <strong>JUGADOR</strong>

            <span>
              Seguimiento personal, estadísticas
              y convocatorias
            </span>
          </div>

          <ArrowRight className="role-arrow" size={20} />

        </button>

      </div>

      <div className="access-request">
        ¿No tenés cuenta?
        <button>Solicitá el acceso a tu liga</button>
      </div>

      <footer>
        <span>Términos</span>
        <span>Privacidad</span>
        <span>Soporte</span>
      </footer>

    </div>
  );
}

export default RoleSelector;