package com.financecontrol.api.exceptionhandler;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.financecontrol.domain.exception.DomainException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

	private MessageSource messageSource;

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {

		List<FieldsError> fields = new ArrayList<>();
		ex.getBindingResult().getAllErrors().forEach(x -> fields.add(new FieldsError(((FieldError) x).getField(),
				messageSource.getMessage(x, LocaleContextHolder.getLocale()))));

		Error error = new Error();
		error.setStatus(status.value());
		error.setDateTime(OffsetDateTime.now());
		error.setTitle("Um ou mais campos com valores inválidos");
		error.setFields(fields);

		return handleExceptionInternal(ex, error, headers, status, request);
	}

	@ExceptionHandler(DomainException.class)
	public ResponseEntity<Object> handleDomain(DomainException ex, WebRequest request) {
		HttpStatus status = HttpStatus.BAD_REQUEST;

		Error error = new Error();
		error.setStatus(status.value());
		error.setDateTime(OffsetDateTime.now());
		error.setTitle(ex.getMessage());

		return handleExceptionInternal(ex, error, new HttpHeaders(), status, request);
	}
}
