package com.exxeta.controller.mapper;

import com.exxeta.datatransferobject.RoomDTO;
import com.exxeta.domainobject.RoomDO;
import java.time.Instant;

public final class RoomMapper {
  private RoomMapper() {}

  public static RoomDO makeRoomDO(RoomDTO dto) {
    RoomDO e = new RoomDO();
    e.setNumber(dto.number());
    e.setType(dto.type());
    e.setHasMinibar(dto.hasMinibar());
    e.setAvailable(dto.available());
    return e;
  }

  public static void apply(RoomDTO dto, RoomDO e) {
    e.setType(dto.type());
    e.setHasMinibar(dto.hasMinibar());
    e.setAvailable(dto.available());
  }

  public static RoomDTO makeRoomDTO(RoomDO e) {
    return new RoomDTO(e.getNumber(), e.getType(), e.isHasMinibar(), e.isAvailable());
  }

  public static void markDeleted(RoomDO e) {
    e.setDeletedAt(Instant.now());
  }
}
