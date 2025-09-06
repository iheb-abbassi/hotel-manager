package com.exxeta.dataaccessobject;

import com.exxeta.domainobject.RoomDO;
import com.exxeta.domainvalue.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<RoomDO, Long>, JpaSpecificationExecutor<RoomDO> {
  Optional<RoomDO> findByNumber(Integer number);
  Page<RoomDO> findAllByTypeAndHasMinibarAndAvailable(RoomType type, boolean hasMinibar, boolean available, Pageable p);

  @Query("SELECT r FROM RoomDO r WHERE (:type IS NULL OR r.type = :type) AND (:hasMinibar IS NULL OR r.hasMinibar = :hasMinibar) AND (:available IS NULL OR r.available = :available)")
  Page<RoomDO> findByFilters(@Param("type") RoomType type, @Param("hasMinibar") Boolean hasMinibar, @Param("available") Boolean available, Pageable pageable);
}
