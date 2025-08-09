package com.sunbeam.util;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseUtil<T> {
    private String status;
    private String message;
    private T data;

    public ResponseUtil(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static <T> ResponseUtil<T> apiSuccess(T data) {
        return new ResponseUtil<>("success", null, data);
    }

    public static <T> ResponseUtil<T> apiError(String message) {
        return new ResponseUtil<>("error", message, null);
    }

    // Getters
    public String getStatus() { return status; }
    public String getMessage() { return message; }
    public T getData() { return data; }
}
