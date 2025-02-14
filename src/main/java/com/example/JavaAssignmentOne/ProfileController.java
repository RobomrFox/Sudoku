package com.example.JavaAssignmentOne;


import jdk.jshell.StatementSnippet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@Controller
public class ProfileController {
    @Autowired
    private StatisticsRepository statRepo;

    @GetMapping("/profile")
    public String profile(Model model){
        model.addAttribute("stats", statRepo.findByuserName("Dean"));
        return "profile";
    }
    @PostMapping("/addStatistics")
    public Statistics addStatistics(@RequestBody Statistics stats) {
        return statRepo.save(stats);
    }
    @PostMapping("/deleteStatistics")
    public Statistics deleteStats(@RequestBody Statistics stats) {
        return statRepo.deleteByuserName(stats.userName);
    }
    @PostMapping("/updateStatistics")
    public Statistics updateStats(@RequestBody Statistics stats) {
        return statRepo.save(stats);
    }



}
