package ch.fhnw.lst.sipapi.exception;

public class ErrorInfo {
  public final String error;
  public final String message;

  public ErrorInfo(String error, Exception ex) {
    this.error = error;
    this.message = ex.getLocalizedMessage();
  }
}