package com.exxeta.service;

import com.exxeta.datatransferobject.RoomDTO;
import com.exxeta.domainvalue.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoomService {
  Page<RoomDTO> list(RoomType type, Boolean hasMinibar, Boolean available, Pageable pageable);
  RoomDTO getByNumber(int number);
  RoomDTO create(RoomDTO req);
  RoomDTO update(int number, RoomDTO req);
  void delete(int number);
}
