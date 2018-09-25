package com.egroup.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class IndexController {	
	@RequestMapping(value = "/websocket", method = RequestMethod.GET,produces={"text/html; charset=UTF-8"})
	public @ModelAttribute ModelAndView websocket() {
		System.out.println("websocket");		
		final ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("websocket");
		return modelAndView;
	}
}
