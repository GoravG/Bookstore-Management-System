package com.sunbeam.ocr;

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
		UserRegistrationDTO user=new UserRegistrationDTO("gaurav.ghenand@gmail.com","Gaurav@981");
		userService.registerNewUserAccount(user);
	}

}
