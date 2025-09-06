package com.exxeta.service;

import com.exxeta.controller.mapper.RoomMapper;
import com.exxeta.dataaccessobject.RoomRepository;
import com.exxeta.datatransferobject.RoomDTO;
import com.exxeta.domainobject.RoomDO;
import com.exxeta.domainvalue.RoomType;
import com.exxeta.exception.NotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

  private final RoomRepository repo;

  @Override
  public Page<RoomDTO> list(RoomType type, Boolean minibar, Boolean available, Pageable p) {
    return repo.findByFilters(type, minibar, available, p)
               .map(RoomMapper::makeRoomDTO);
  }

  @Override
  public RoomDTO getByNumber(int number) {
    RoomDO e = repo.findByNumber(number).orElseThrow(() -> new NotFoundException("Room " + number + " not found"));
    return RoomMapper.makeRoomDTO(e);
  }

  @Override @Transactional
  public RoomDTO create(RoomDTO req) {
    RoomDO e = RoomMapper.makeRoomDO(req);
    return RoomMapper.makeRoomDTO(repo.save(e));
  }

  @Override @Transactional
  public RoomDTO update(int number, RoomDTO req) {
    RoomDO e = repo.findByNumber(number).orElseThrow(() -> new NotFoundException("Room " + number + " not found"));
    // Prevent updating to an existing room number
    if (req.number() != number) {
      repo.findByNumber(req.number()).ifPresent(existing -> {
        throw new IllegalArgumentException("Room number " + req.number() + " already exists");
      });
    }
    RoomMapper.apply(req, e);
    return RoomMapper.makeRoomDTO(repo.save(e));
  }

  @Override @Transactional
  public void delete(int number) {
    RoomDO e = repo.findByNumber(number).orElseThrow(() -> new NotFoundException("Room " + number + " not found"));
    RoomMapper.markDeleted(e);
    repo.save(e);
  }
}
