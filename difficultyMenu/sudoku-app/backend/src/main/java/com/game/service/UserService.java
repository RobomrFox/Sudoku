package com.game.service;

import com.game.dto.UserProfileDto;
import com.game.model.User;
import com.game.model.Stats;
import com.game.repository.UserRepository;
import com.game.repository.StatsRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final StatsRepository statsRepository;

    public UserService(UserRepository userRepository, StatsRepository statsRepository) {
        this.userRepository = userRepository;
        this.statsRepository = statsRepository;
    }

    public UserProfileDto getUserProfile(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        Stats stats = statsRepository.findById(userId).orElse(null);
        return new UserProfileDto(user, stats);
    }
}
