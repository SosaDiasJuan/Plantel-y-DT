import { useMemo, useState } from "react";
import {
  Activity, CalendarDays, ClipboardList, Dumbbell, HeartPulse, LayoutDashboard,
  LogOut, Menu, Plus, Search, Settings, ShieldCheck, Trophy, Users, X
} from "lucide-react";
import { logout } from "../services/authService";

const NAVIGATION = [
  ["inicio", "Inicio", LayoutDashboard], ["plantel", "Plantel", Users],
  ["calendario", "Calendario", CalendarDays], ["entrenamientos", "Entrenamientos", ClipboardList],
  ["ejercicios", "Ejercicios", Dumbbell], ["partidos", "Partidos", Trophy],
  ["rendimiento", "Rendimiento", Activity], ["salud", "Salud y disponibilidad", HeartPulse],
  ["configuracion", "Configuración", Settings]
];

const CONTENT = {
  inicio: {
    title: "Centro de mando", description: "Priorizá el trabajo del equipo y conectá cada partido con la próxima práctica.",
    cards: [["Próximos eventos", "El calendario mostrará aquí prácticas, partidos y convocatorias."], ["Aspectos a trabajar", "Registrá análisis de partido y vinculalos a los objetivos de entrenamiento."], ["Disponibilidad", "Las alertas de lesión, sanción o carga aparecerán antes de convocar."]]
  },
  plantel: { title: "Plantel", description: "Fichas individuales, posiciones, historial y disponibilidad de cada integrante.", cards: [["Jugadores", "Dá de alta integrantes y asignales equipo, dorsal y posiciones."], ["Posiciones", "Guardá la posición principal, alternativas y evolución por rol."], ["Cuerpo técnico", "Organizá responsables por categoría y equipo."]] },
  calendario: { title: "Calendario", description: "Una sola agenda para partidos, entrenamientos, convocatorias y sedes.", cards: [["Agenda del equipo", "Creá eventos con fecha, hora, sede y responsables."], ["Competencias", "Asociá jornadas y rivales a la temporada correcta."], ["Convocatorias", "Controlá confirmaciones y disponibilidad antes de cada encuentro."]] },
  entrenamientos: { title: "Entrenamientos", description: "Diseñá prácticas con objetivos claros y compartilas con el plantel.", cards: [["Planificador", "Ordená ejercicios, duración, indicaciones e intensidad."], ["Objetivos correctivos", "Vinculá la práctica a aspectos detectados en partidos."], ["Asistencia y carga", "Registrá asistencia, RPE y carga posterior."]] },
  ejercicios: { title: "Biblioteca de ejercicios", description: "Reutilizá ejercicios, clasificá objetivos y armá sesiones más rápido.", cards: [["Biblioteca del club", "Guardá descripciones, videos, materiales y variantes."], ["Etiquetas", "Filtrá por fase, objetivo, cantidad de jugadores e intensidad."], ["Uso y evaluación", "Identificá qué ejercicios se aplicaron a cada necesidad."]] },
  partidos: { title: "Partidos y análisis", description: "Registrá lo que pasó y transformalo en prioridades de entrenamiento.", cards: [["Registro de partido", "Resultado, rival, competencia, formación y eventos minuto a minuto."], ["Análisis", "Guardá fortalezas, errores recurrentes y aspectos a mejorar."], ["Alineación", "Convocados, titulares, minutos, posiciones y evaluación individual."]] },
  rendimiento: { title: "Rendimiento", description: "Tomá decisiones con evolución individual, carga y desempeño por posición.", cards: [["Por jugador", "Compará minutos, calificaciones y métricas en el tiempo."], ["Por posición", "Detectá dónde rinde mejor cada futbolista con datos reales."], ["Tendencias", "Seguimiento de métricas físicas, técnicas y bienestar."]] },
  salud: { title: "Salud y disponibilidad", description: "Protegé al plantel con trazabilidad de lesiones, sanciones y restricciones.", cards: [["Disponibilidad", "Indicá porcentaje disponible, motivo y período."], ["Lesiones", "Registrá diagnóstico, zona, tratamiento y alta estimada."], ["Sanciones", "Controlá tarjetas, fechas y partidos pendientes."]] },
  configuracion: { title: "Configuración", description: "Definí cómo trabaja tu club sin depender de valores fijos del sistema.", cards: [["Club y equipos", "Administrá sedes, categorías, temporadas y competencias."], ["Catálogos", "Configurá posiciones, estados, intensidades y tipos de evento."], ["Accesos", "Asigná roles y permisos por club y equipo."]] }
};

function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [createdItems, setCreatedItems] = useState([]);
  const section = CONTENT[active];
  const visibleItems = useMemo(() => createdItems.filter((item) => item.section === active && item.name.toLowerCase().includes(query.toLowerCase())), [active, createdItems, query]);
  const label = NAVIGATION.find(([id]) => id === active)?.[1];

  const createItem = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    setCreatedItems((items) => [...items, { id: crypto.randomUUID(), section: active, name, detail: String(form.get("detail") || "") }]);
    setShowForm(false);
  };
  const signOut = async () => { try { await logout(); } finally { onLogout(); } };

  return <main className="workspace">
    <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
      <div className="workspace-brand"><ShieldCheck size={25} /><span>PLANTEL <i>Y DT</i></span><button className="mobile-close" onClick={() => setMenuOpen(false)}><X /></button></div>
      <nav>{NAVIGATION.map(([id, name, Icon]) => <button key={id} className={active === id ? "nav-active" : ""} onClick={() => { setActive(id); setMenuOpen(false); setQuery(""); }}><Icon size={18} />{name}</button>)}</nav>
      <button className="logout-button" onClick={signOut}><LogOut size={18} />Cerrar sesión</button>
    </aside>
    <section className="workspace-main">
      <header className="workspace-header"><button className="menu-button" onClick={() => setMenuOpen(true)}><Menu /></button><div className="team-switcher"><span>ESPACIO DE TRABAJO</span><strong>Seleccioná un club y equipo</strong></div><div className="user-chip"><span>{user.email?.slice(0, 1).toUpperCase()}</span><div><strong>{user.email}</strong><small>{user.role || user.roles?.[0]?.replace("ROLE_", "")}</small></div></div></header>
      <div className="page-content">
        <div className="page-heading"><div><span className="page-eyebrow">{label}</span><h1>{section.title}</h1><p>{section.description}</p></div><button className="primary-action" onClick={() => setShowForm(true)}><Plus size={18} />Nuevo registro</button></div>
        {active !== "inicio" && <label className="search-field"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Buscar en ${label.toLowerCase()}`} /></label>}
        <div className="feature-grid">{section.cards.map(([title, description]) => <article className="feature-card" key={title}><h2>{title}</h2><p>{description}</p><button onClick={() => setShowForm(true)}>Agregar información</button></article>)}</div>
        <section className="records-panel"><div><h2>Registros de esta sesión</h2><p>Los datos definitivos se guardarán al conectar los módulos del API.</p></div>{visibleItems.length ? <ul>{visibleItems.map((item) => <li key={item.id}><strong>{item.name}</strong><span>{item.detail}</span></li>)}</ul> : <div className="empty-state"><ClipboardList size={28} /><strong>Aún no hay registros en {label.toLowerCase()}</strong><span>Creá el primero con el botón “Nuevo registro”.</span></div>}</section>
      </div>
    </section>
    {showForm && <div className="modal-backdrop" role="presentation"><form className="record-modal" onSubmit={createItem}><button type="button" className="modal-close" onClick={() => setShowForm(false)}><X /></button><span className="page-eyebrow">NUEVO REGISTRO · {label}</span><h2>Agregá información al equipo</h2><label>Nombre<input name="name" autoFocus placeholder="Escribí un nombre claro" /></label><label>Detalle<textarea name="detail" placeholder="Objetivo, observación o información relevante" rows="4" /></label><div className="modal-actions"><button type="button" onClick={() => setShowForm(false)}>Cancelar</button><button className="primary-action" type="submit">Guardar borrador</button></div></form></div>}
  </main>;
}

export default Dashboard;
