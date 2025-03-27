package com.game.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document(collection = "users")
public class User {
    @Id
    private String userId;
    private String userName;
    private String password; // Add this field
    private Date dateJoined;

    public User() {}

    // Updated constructor to accept password
    public User(String userId, String userName, String password, Date dateJoined) {
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.dateJoined = dateJoined;
    }

    // Getters and setters
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getPassword() {  // New getter
        return password;
    }
    public void setPassword(String password) {  // New setter
        this.password = password;
    }
    public Date getDateJoined() {
        return dateJoined;
    }
    public void setDateJoined(Date dateJoined) {
        this.dateJoined = dateJoined;
    }
}
