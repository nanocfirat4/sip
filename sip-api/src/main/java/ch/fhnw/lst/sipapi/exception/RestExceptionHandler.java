package ch.fhnw.lst.sipapi.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(ch.fhnw.lst.sipapi.exception.ResourceNotFoundException.class)
  protected ResponseEntity<Object> handleNotFound(
      RuntimeException ex, WebRequest request) {
    return handleExceptionInternal(ex, new ch.fhnw.lst.sipapi.exception.ErrorInfo("not found", ex),
        new HttpHeaders(), HttpStatus.NOT_FOUND, request);
  }
  @ExceptionHandler(RuntimeException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<Object> handleAllUncaughtException(
          RuntimeException ex,
          WebRequest request
  ){
    return handleExceptionInternal(ex, new ch.fhnw.lst.sipapi.exception.ErrorInfo("Unexpected Internal Server Error", ex),
            new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
  }
}