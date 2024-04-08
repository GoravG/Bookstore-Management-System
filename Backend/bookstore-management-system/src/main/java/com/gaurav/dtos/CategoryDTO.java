package com.gaurav.dtos;

import com.gaurav.entities.BaseEntity;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO extends BaseEntity{
	@NotBlank(message = "Name required")
	private String name;
	@NotBlank(message = "Description required")
	private String description;
}
