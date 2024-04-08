package com.gaurav.dtos;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
	@NotNull
	private String isbn;
	@NotNull
	private String title;
	@NotNull
	private String author;
	@NotNull
	private String description;
	@NotNull
	private Integer noOfPages;
	@NotBlank
	private String categoryId;
	@NotNull
	private MultipartFile coverImage;
}
