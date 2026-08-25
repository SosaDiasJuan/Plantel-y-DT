import { ShieldCheck } from "lucide-react";

function BrandPanel() {

  return (
    <section className="brand-panel">

      <div className="brand-overlay"></div>

      <div className="brand-content">

        <div className="brand-logo">
          <ShieldCheck size={34} strokeWidth={2.5} />

          <div>
            <strong>FÚTBOL AMATEUR</strong>
            <span>PLATAFORMA DE GESTIÓN</span>
          </div>
        </div>

        <div className="brand-message">

          <h1>
            EL FÚTBOL
            <br />
            <span>AMATEUR</span>
            <br />
            MERECE
            <br />
            HERRAMIENTAS
            <br />
            <em>PROFESIONALES.</em>
          </h1>

          <div className="green-line"></div>

          <p>
            Gestión completa de equipos, planificación de
            entrenamientos y seguimiento del rendimiento
            para el fútbol amateur.
          </p>

        </div>

        <div className="statistics">

          <div>
            <strong>1.200+</strong>
            <span>EQUIPOS REGISTRADOS</span>
          </div>

          <div>
            <strong>48.000+</strong>
            <span>JUGADORES ACTIVOS</span>
          </div>

          <div>
            <strong>320+</strong>
            <span>TORNEOS EN CURSO</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default BrandPanel;