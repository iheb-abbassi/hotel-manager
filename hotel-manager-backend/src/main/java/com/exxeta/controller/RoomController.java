package com.exxeta.controller;

import com.exxeta.datatransferobject.RoomDTO;
import com.exxeta.domainvalue.RoomType;
import com.exxeta.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

  @DeleteMapping("/{number}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable("number") int number) {
    service.delete(number);
  }
}
