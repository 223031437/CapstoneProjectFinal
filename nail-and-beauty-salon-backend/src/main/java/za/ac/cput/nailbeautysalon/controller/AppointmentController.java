package za.ac.cput.nailbeautysalon.controller;

/* Appointment.java
Appointment model class
Author: Tshephiso Kekana (240264681)
Date: 25 July 2026
*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.nailbeautysalon.domain.Appointment;
import za.ac.cput.nailbeautysalon.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
    private AppointmentService service;

    @Autowired
    public AppointmentController(AppointmentService service) {this.service= service;}

    @PostMapping("/create")
    public Appointment create(@RequestBody Appointment appointment){
        return service.create(appointment);
    }

    @GetMapping("/read/{appointmentId}")
    public Appointment read(@PathVariable String appointmentId){
        return service.read(appointmentId);
    }

    @PutMapping("/update")
    public Appointment update(@RequestBody Appointment appointment){
        return service.update(appointment);
    }

    @DeleteMapping("/delete/{appointmentId}")
    public boolean delete(@PathVariable String appointmentId ){
        return service.delete(appointmentId);
    }

    @GetMapping("/getAll")
    public List<Appointment> getAll(){
        return service.getAll();
    }
}
