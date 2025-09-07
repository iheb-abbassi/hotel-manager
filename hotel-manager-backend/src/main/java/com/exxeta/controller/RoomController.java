package com.exxeta.controller;

import com.exxeta.datatransferobject.RoomDTO;
import com.exxeta.datatransferobject.RoomPatchDTO;
import com.exxeta.domainvalue.RoomType;
import com.exxeta.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for hotel rooms.
 * Exposes CRUD and filtering endpoints.
 */

// TODO: Add authentication with JWT
// For now, all endpoints are open for demo purposes

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

  private final RoomService service;

  @GetMapping
  public Page<RoomDTO> list(
      @RequestParam(name = "type", required = false) RoomType type,
      @RequestParam(name = "hasMinibar", required = false) Boolean hasMinibar,
      @RequestParam(name = "available", required = false) Boolean available,
      @PageableDefault(size = 20, sort = "number") Pageable pageable) {
    return service.list(type, hasMinibar, available, pageable);
  }

  @GetMapping("/{number}")
  public RoomDTO getByNumber(@PathVariable("number") int number) {
    return service.getByNumber(number);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public RoomDTO create(@Valid @RequestBody RoomDTO req) {
    return service.create(req);
  }

  @PutMapping("/{number}")
  public RoomDTO update(@PathVariable("number") int number, @Valid @RequestBody RoomDTO req) {
    return service.update(number, req);
  }

  @PatchMapping("/{number}")
  public RoomDTO patch(@PathVariable("number") int number, @RequestBody RoomPatchDTO req) {
    return service.patch(number, req);
  }

  @DeleteMapping("/{number}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable("number") int number) {
    service.delete(number);
  }
}
