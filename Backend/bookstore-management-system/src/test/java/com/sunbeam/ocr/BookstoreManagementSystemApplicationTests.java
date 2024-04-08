package com.sunbeam.ocr;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;

import com.gaurav.BookstoreManagementSystemApplication;
import com.gaurav.dtos.UserRegistrationDTO;
import com.gaurav.services.UserService;

@SpringBootTest
@ContextConfiguration(classes = BookstoreManagementSystemApplication.class)
class BookstoreManagementSystemApplicationTests {

	@Autowired
	UserService userService;

	@Test
	@Rollback(false)
	void appTest() {
		UserRegistrationDTO user = new UserRegistrationDTO("gaurav", "ghenand", "9665105760",
				"gaurav.ghenand@gmail.com", LocalDate.of(1998, 6, 15),"Gaurav@981");
		userService.registerNewAdminAccount(user);
		UserRegistrationDTO user2 = new UserRegistrationDTO("aayush", "aayush", "7798947070",
				"aayush@gmail.com", LocalDate.of(1998, 6, 26),"Gaurav@981");
		userService.registerNewUserAccount(user2);
	}
}
