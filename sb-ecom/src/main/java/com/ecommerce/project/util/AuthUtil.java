package com.ecommerce.project.util;


import com.ecommerce.project.model.User;
import com.ecommerce.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.security.Security;

@Component
public class AuthUtil {

    @Autowired
    UserRepository userRepository;

    public User getAuthenticationDetails(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUserName(authentication.getName()).orElseThrow(()->new UsernameNotFoundException("User not Found with User Name:" + authentication.getName()));
    }
    public String loggedInEmail(){
        User user = getAuthenticationDetails();
        return user.getEmail();
    }

    public User loggedInUser(){
        return getAuthenticationDetails();
    }

}
