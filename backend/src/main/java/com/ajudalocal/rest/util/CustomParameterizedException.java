package com.ajudalocal.rest.util;

public class CustomParameterizedException extends RuntimeException {


    private static final long serialVersionUID = 1L;

    private final String message;
    private final String[] params;

    public CustomParameterizedException(String message, String... params) {
        super(message);
        this.message = message;
        this.params = params.clone();
    }
}
