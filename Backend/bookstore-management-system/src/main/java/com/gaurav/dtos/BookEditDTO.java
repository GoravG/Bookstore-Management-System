package com.gaurav.dtos;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookEditDTO {
	@NotNull
	private Long id;
	private String isbn;
	private String title;
	private String author;
	private String description;
	private Integer noOfPages;
	private String categoryId;
	private MultipartFile coverImage;
}
