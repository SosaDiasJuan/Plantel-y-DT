package com.plantelydt.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DatabaseMigrationRunner implements ApplicationRunner {

    private static final String MIGRATION_ID = "02_operacion_deportiva";

    private final JdbcTemplate jdbcTemplate;
    private final DataSource dataSource;

    public DatabaseMigrationRunner(JdbcTemplate jdbcTemplate, DataSource dataSource) {
        this.jdbcTemplate = jdbcTemplate;
        this.dataSource = dataSource;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        jdbcTemplate.execute("""
                CREATE TABLE IF NOT EXISTS schema_migrations (
                    id VARCHAR(100) PRIMARY KEY,
                    aplicado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                )
                """);

        Integer applied = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM schema_migrations WHERE id = ?", Integer.class, MIGRATION_ID
        );
        if (applied != null && applied > 0) return;

        Integer catalogTableExists = jdbcTemplate.queryForObject("""
                SELECT COUNT(*) FROM information_schema.tables
                WHERE table_schema = DATABASE() AND table_name = 'catalogos'
                """, Integer.class);
        if (catalogTableExists != null && catalogTableExists > 0) {
            jdbcTemplate.update("INSERT INTO schema_migrations (id) VALUES (?)", MIGRATION_ID);
            return;
        }

        try (Connection connection = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(connection, new ClassPathResource("db/migration/02_operacion_deportiva.sql"));
        }
        jdbcTemplate.update("INSERT INTO schema_migrations (id) VALUES (?)", MIGRATION_ID);
    }
}
