package za.ac.cput.nailbeautysalon.domain;

/* Appointment.java
Appointment model class
Author: Tshephiso Kekana (240264681)
Date: 22 June 2026
*/


import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
@Entity
public class Appointment {
    @Id
    private String appointmentId;
    private LocalDateTime dateTime;
    private String serviceSelected;
    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "address_streetNumber", referencedColumnName = "streetNumber"),
            @JoinColumn(name = "address_streetName", referencedColumnName = "streetName"),
            @JoinColumn(name = "address_city", referencedColumnName = "city"),
            @JoinColumn(name = "address_suburb", referencedColumnName = "suburb"),
            @JoinColumn(name = "address_province", referencedColumnName = "province"),
            @JoinColumn(name = "address_postalCode", referencedColumnName = "postalCode")
    })
    private Address address;
    private String notes;
    private String status;

    protected Appointment() {
    }


    public Appointment(Builder builder){
        this.appointmentId = builder.appointmentId;
        this.dateTime= builder.dateTime;
        this.serviceSelected =builder.serviceSelected;
        this.address = builder.address;
        this.notes = builder.notes;
        this.status = builder.status;
    }

    // Lets Jackson build this straight from incoming JSON — the class only
    // exposes a Builder otherwise, which Jackson can't drive automatically.
    @JsonCreator
    public Appointment(
            @JsonProperty("appointmentId") String appointmentId,
            @JsonProperty("dateTime") LocalDateTime dateTime,
            @JsonProperty("serviceSelected") String serviceSelected,
            @JsonProperty("address") Address address,
            @JsonProperty("notes") String notes,
            @JsonProperty("status") String status) {
        this.appointmentId = appointmentId;
        this.dateTime = dateTime;
        this.serviceSelected = serviceSelected;
        this.address = address;
        this.notes = notes;
        this.status = status;
    }

    public Address getAddress() {
        return address;
    }

    public String getStatus() {
        return status;
    }

    public String getServiceSelected() {
        return serviceSelected;
    }

    public String getNotes() {
        return notes;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public String getAppointmentId() {
        return appointmentId;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Appointment{" +
                "address=" + address +
                ", appointmentId='" + appointmentId + '\'' +
                ", dateTime=" + dateTime +
                ", serviceSelected='" + serviceSelected + '\'' +
                ", notes='" + notes + '\'' +
                ", status='" + status + '\'' +
                '}';
    }


public static class Builder {
    private String appointmentId;
    private LocalDateTime dateTime;
    private String serviceSelected;
    private Address address;
    private String notes;
    private String status;

    public Builder setAppointmentId(String appointmentId) {
        this.appointmentId = appointmentId;
        return this;
    }

    public Builder setStatus(String status) {
        this.status = status;
        return this;
    }

    public Builder setServiceSelected(String serviceSelected) {
        this.serviceSelected = serviceSelected;
        return this;
    }

    public Builder setLocalDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
        return this;
    }
    public Builder setAddress(Address address) {
        this.address = address;
        return this;
    }

    public Builder setNotes(String notes) {
        this.notes = notes;
        return this;
    }
    public Builder copy(Appointment appointment){
        this.appointmentId=appointment.appointmentId;
        this.dateTime= appointment.dateTime;
        this.serviceSelected = appointment.serviceSelected;
        this.address = appointment.address;
        this.notes = appointment.notes;
        this.status = appointment.status;
        return this;
    }
    public Appointment build() {return new Appointment(this);}
}
}

