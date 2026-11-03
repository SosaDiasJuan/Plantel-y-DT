# Modelo operativo deportivo

La base inicial se amplió con `database/02_operacion_deportiva.sql`. Se mantiene la separación entre personas (`usuarios`), su pertenencia a un equipo (`equipo_usuarios`) y su ficha deportiva para ese equipo (`perfiles_jugador`). Esto evita mezclar datos de un futbolista que participa en más de una categoría o temporada.

## Principios

- Los estados, posiciones, tipos de evento, lesiones e intensidades se almacenan en catálogos. La interfaz debe consumirlos por API y no duplicar listas fijas.
- Las posiciones se registran como historial y las evaluaciones de partido guardan la posición efectivamente jugada. De ahí se puede calcular rendimiento por posición sin inferencias frágiles.
- La disponibilidad, las lesiones y las sanciones son registros con fecha; una convocatoria debe consultar esos tres orígenes antes de permitir confirmar una lista.
- Los partidos y entrenamientos siguen siendo el calendario real del equipo. Competiciones, temporadas y sedes aportan su contexto sin duplicar eventos.
- `aspectos_partido` y `entrenamiento_aspectos` materializan el ciclo central: una observación de partido puede quedar asociada a uno o más entrenamientos y marcarse resuelta al evaluarla.
- Las métricas son definiciones configurables por club. Cada medición queda fechada, con unidad y responsable, para preservar trazabilidad.

## Consultas que habilita

- Disponibilidad actual de una plantilla y alertas de lesión/sanción.
- Convocados, once titular, minutos y eventos de cada partido.
- Promedio de calificación, minutos y rendimiento por jugador y posición.
- Carga planificada versus RPE/carga registrada en prácticas.
- Evolución temporal de métricas físicas, técnicas o de bienestar.
- Aspectos recurrentes pendientes y qué prácticas se diseñaron para trabajarlos.

## Operación

1. Crear la base con `database/01_schema.sql`.
2. Aplicar `database/02_operacion_deportiva.sql` una sola vez por base.
3. Crear un usuario MySQL de aplicación con permisos mínimos sobre `plantel_y_dt`.
4. Copiar `.env.example` a `.env` o definir las variables de entorno equivalentes antes de iniciar el backend.

Las migraciones deben pasar a un gestor como Flyway antes de operar en producción; mientras tanto, se versionan como scripts SQL ordenados para que cada entorno aplique exactamente el mismo modelo.
