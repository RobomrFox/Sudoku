package com.example.JavaAssignmentOne;

import lombok.Generated;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.yaml.snakeyaml.events.Event;

import java.math.BigInteger;

public class Statistics {

    @Id
    @NonNull
    public String id;

    public String userName;
    public int gameWins;
    public int gameLosses;
    public int gamesSaved;
    public int gamesRestarted;
    public String winLossRatio;

    public Statistics(String userName,int gameWins, int gameLosses, int gamesSaved, int gamesRestarted, String winLossRatio) {
        this.userName = userName;
        this.gameWins = gameWins;
        this.gameLosses = gameLosses;
        this.gamesSaved = gamesSaved;
        this.gamesRestarted = gamesRestarted;
        this.winLossRatio = winLossRatio;
    }


}
