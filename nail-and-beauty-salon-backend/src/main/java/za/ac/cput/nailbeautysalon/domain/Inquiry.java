package za.ac.cput.nailbeautysalon.domain;
/* Inquiry.java
   Inquiry POJO class
   Author: M Hlaba (223031437)
   Date: 22 June 2026 */

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Inquiry {
    @Id
    private String email;
    private String fullName;
    private String phoneNumber;
    private Subject subject;
    private String message;

    @ManyToOne
    private Customer customer;

    protected Inquiry(){ }

    public Inquiry(Builder builder){
        this.email = builder.email;
        this.fullName = builder.fullName;
        this.phoneNumber = builder.phoneNumber;
        this.subject = builder.subject;
        this.message = builder.message;
    }

    // Lets Jackson build this straight from incoming JSON — the class only
    // exposes a Builder otherwise, which Jackson can't drive automatically.
    @JsonCreator
    public Inquiry(
            @JsonProperty("email") String email,
            @JsonProperty("fullName") String fullName,
            @JsonProperty("phoneNumber") String phoneNumber,
            @JsonProperty("subject") Subject subject,
            @JsonProperty("message") String message) {
        this.email = email;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.subject = subject;
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Subject getSubject() {
        return subject;
    }

    @Override
    public String toString() {
        return "Inquiry{" +
                "email='" + email + '\'' +
                ", fullName='" + fullName + '\'' +
                ", phoneNumber=" + phoneNumber +
                ", subject=" + subject +
                ", message='" + message + '\'' +
                '}';
    }

    public static class Builder{
        private String email;
        private String fullName;
        private String phoneNumber;
        private Subject subject;
        private String message;

        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }

        public Builder setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Builder setSubject(Subject subject) {
            this.subject = subject;
            return this;
        }

        public Builder setFullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder copy(Inquiry inquiry){
            this.email = inquiry.email;
            this.fullName = inquiry.fullName;
            this.phoneNumber = inquiry.phoneNumber;
            this.subject = inquiry.subject;
            this.message = inquiry.message;
            return this;
        }

        public Inquiry build(){
            return new Inquiry(this);
        }
    }
}
