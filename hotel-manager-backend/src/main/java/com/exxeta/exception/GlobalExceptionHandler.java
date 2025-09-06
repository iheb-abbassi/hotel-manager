package com.exxeta.exception;

import com.exxeta.exception.NotFoundException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  Map<String, Object> notFound(NotFoundException ex) {
    return Map.of("error","RoomNotFound","message", ex.getMessage());
  }

  @ExceptionHandler({ MethodArgumentNotValidException.class, ConstraintViolationException.class })
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  Map<String, Object> validation(Exception ex) {
    return Map.of("error","ValidationError","message","Payload has validation errors");
  }
}
