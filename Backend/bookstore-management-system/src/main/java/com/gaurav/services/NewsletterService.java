package com.gaurav.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurav.entities.Newsletter;
import com.gaurav.repositories.NewsletterRepository;

@Service
public class NewsletterService {
	
	@Autowired
	NewsletterRepository newsletterRepository;
	
	public Newsletter subscribeForNewsletter(String email) {
		Newsletter news=newsletterRepository.save(new Newsletter(email));
		return news;
	}

}
