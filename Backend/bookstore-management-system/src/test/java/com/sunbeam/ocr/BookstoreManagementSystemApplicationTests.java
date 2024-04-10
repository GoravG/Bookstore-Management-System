package com.sunbeam.ocr;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;

import com.gaurav.BookstoreManagementSystemApplication;
import com.gaurav.dtos.UserRegistrationDTO;
import com.gaurav.entities.Category;
import com.gaurav.services.CategoryService;
import com.gaurav.services.UserService;

@SpringBootTest
@ContextConfiguration(classes = BookstoreManagementSystemApplication.class)
class BookstoreManagementSystemApplicationTests {

	@Autowired
	UserService userService;
	
	@Autowired
	CategoryService categoryService;

	@Test
	@Rollback(false)
	void appTest() {
		UserRegistrationDTO user = new UserRegistrationDTO("gaurav", "ghenand", "9665105760",
				"gaurav.ghenand@gmail.com", LocalDate.of(1998, 6, 15),"Gaurav@981");
		userService.registerNewAdminAccount(user);
		UserRegistrationDTO user2 = new UserRegistrationDTO("aayush", "aayush", "7798947070",
				"aayush@gmail.com", LocalDate.of(1998, 6, 26),"Gaurav@981");
		userService.registerNewUserAccount(user2);
		
		categoryService.addNewCategory(
				new Category(
						"Fantasy",
						"Explore mystical realms filled with magic, mythical creatures, and epic quests."));
		
		categoryService.addNewCategory(
				new Category(
						"Self Help",
						"Empower yourself with practical advice and strategies for personal growth and development."));
		
		categoryService.addNewCategory(
				new Category(
						"History",
						"Uncover the rich tapestry of the past, from ancient civilizations to modern events."));
		
		categoryService.addNewCategory(
				new Category(
						"Science",
						"Discover the wonders of the universe through exploration, experimentation, and innovation."));
		
		categoryService.addNewCategory(
				new Category(
						"Technology",
						"Navigate the ever-evolving landscape of technology, from gadgets to software development."));
		
		categoryService.addNewCategory(
				new Category(
						"Study",
						"Enhance learning with resources tailored for academic success, including textbooks and guides."));
		
		categoryService.addNewCategory(
				new Category(
						"Religion",
						"Examine religious beliefs, rituals, traditions, and the role of spirituality in society."));
		
	}
}
