package com.example.pts.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
public class AdminController {
  @GetMapping("/admin")
  public String adminHome() {
    return "Welcome to Admin Home Page - Placement Training System";
  }
}
