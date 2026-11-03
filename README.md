# Plantel y DT

Plataforma web orientada a clubes y equipos de fútbol amateur.

El sistema busca centralizar la planificación de entrenamientos, la gestión de equipos y el análisis de partidos, permitiendo conectar los aspectos detectados durante la competencia con el trabajo realizado posteriormente en los entrenamientos.

Pasa del resutado del partido al entrenamiento correctivo.
Pizarra táctica, que no termina con la charla técnica.
Cada partido deja una lección para el próximo entrenamiento.
Convertir lo que pasa en la cancha en decisiones fuera de ella.

## Tecnologías

### Backend
- Java 21
- Spring Boot
- Maven
- MySQL

### Frontend
- React
- Vite

## Estado

La base de acceso está en construcción y el modelo de datos ya contempla operación de club, planificación, calendario, convocatorias, lesiones, sanciones, métricas y rendimiento por posición. Consultá [el modelo operativo](docs/modelo-operativo.md) para el alcance y orden de aplicación de la base.

## Configuración local

El backend toma la conexión desde `DB_URL`, `DB_USERNAME` y `DB_PASSWORD`. Para no romper el inicio local ya configurado, usa `root` / `root` sólo como fallback de desarrollo; en cualquier entorno compartido o productivo definí las tres variables con un usuario de aplicación. Aplicá los scripts de `database/` en orden.
