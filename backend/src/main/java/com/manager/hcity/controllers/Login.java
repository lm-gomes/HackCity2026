package com.manager.hcity.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.manager.hcity.dto.LoginDTO;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController 
public class Login {

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO login) {
        String email = login.ge
        return entity;
    }

    @PostMapping("register")
    public ResponseEntity register(@RequestBody LoginDTO login) {
        //TODO: process POST request
        
        return entity;
    }
    


}


