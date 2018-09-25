package com.egroup.util.entity;

import java.net.HttpURLConnection;

import com.google.gson.Gson;

public class WebResponse {
	// 2XX
	private static Integer HTTP_OK = HttpURLConnection.HTTP_OK; // 200
	private static Integer HTTP_NO_CONTENT = HttpURLConnection.HTTP_NO_CONTENT; // 204
	// 4XX
	private static Integer HTTP_BAD_REQUEST = HttpURLConnection.HTTP_BAD_REQUEST; // 400
	private static Integer HTTP_UNAUTHORIZED = HttpURLConnection.HTTP_UNAUTHORIZED; // 401
	private static Integer HTTP_FORBIDDEN = HttpURLConnection.HTTP_FORBIDDEN; // 403
	private static Integer HTTP_NOT_FOUND = HttpURLConnection.HTTP_NOT_FOUND; // 404
	private static Integer HTTP_CONFLICT = HttpURLConnection.HTTP_CONFLICT; // 409
	private static Integer HTTP_UNPROCESSABLE_ENTITY = 422; // 422

	private Gson gson = new Gson();
	private Integer statusCode;
	private Object data;
	private Error error = new Error();

	public Integer getStatusCode() {
		return statusCode;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = gson.toJson(data);
	}

	public Error getError() {
		return error;
	}

	public void setError(Error error) {
		this.error = error;
	}

	public void OK() {
		this.statusCode = HTTP_OK;
	}
	
	public void BAD_REQUEST() {
		this.statusCode = HTTP_BAD_REQUEST;
	}
	
	public void UNAUTHORIZED() {
		this.statusCode = HTTP_UNAUTHORIZED;
	}
	
	public void FORBIDDEN() {
		this.statusCode = HTTP_FORBIDDEN;
	}
	
	public void NOT_FOUND() {
		this.statusCode = HTTP_NOT_FOUND;
	}
	
	public void CONFLICT() {
		this.statusCode = HTTP_CONFLICT;
	}
	
	public void UNPROCESSABLE_ENTITY() {
		this.statusCode = HTTP_UNPROCESSABLE_ENTITY;
	}
	
	public void NO_CONTENT() {
		this.statusCode = HTTP_NO_CONTENT;
	}

}
