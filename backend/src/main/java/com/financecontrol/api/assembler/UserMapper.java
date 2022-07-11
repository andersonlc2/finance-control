package com.financecontrol.api.assembler;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.financecontrol.api.model.request.UserRequest;
import com.financecontrol.api.model.response.ResumeUserResponse;
import com.financecontrol.domain.model.User;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class UserMapper {

	private ModelMapper modelMapper;

	public ResumeUserResponse toResponse(User user) {
		return modelMapper.map(user, ResumeUserResponse.class);
	}

	public Page<ResumeUserResponse> toCollectionResponse(Page<User> page) {
		return page.map(user -> toResponse(user));
	}

	public User toEntity(UserRequest userRequest) {
		return modelMapper.map(userRequest, User.class);
	}

}
