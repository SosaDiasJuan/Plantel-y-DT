package com.plantelydt.repository;

import com.plantelydt.entity.ClubUsuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ClubUsuarioRepository extends Repository<ClubUsuario, Long> {
    @Query(value = "SELECT r.nombre FROM club_usuarios cu INNER JOIN roles r ON r.id = cu.rol_id WHERE cu.usuario_id = :usuarioId AND cu.activo = true", nativeQuery = true)
    List<String> findActiveRoleNamesByUsuarioId(@Param("usuarioId") Long usuarioId);
}
