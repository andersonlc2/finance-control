package com.financecontrol.utils;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class GetToken {

	public String get(Map<String, String> headers) {
		
		return headers.get("authorization").substring(7);
	}
}
