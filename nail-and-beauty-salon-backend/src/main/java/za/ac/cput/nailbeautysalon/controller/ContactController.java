package za.ac.cput.nailbeautysalon.controller;
/* ContactController.java
Contact Controller class
Author: Mbali Hlaba (223031437)
Date: 21July 2027
*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import za.ac.cput.nailbeautysalon.domain.Address;
import za.ac.cput.nailbeautysalon.domain.Contact;
import za.ac.cput.nailbeautysalon.service.ContactService;

import java.util.List;

@RestController
@RequestMapping("/contact")
public class ContactController {
    private ContactService service;

    @Autowired
    ContactController(ContactService service){
        this.service = service;
    }

    @PostMapping
    public Contact create(@RequestBody Contact contact){
        return service.create(contact);
    }

    // Note: Contact's @Id is the Address entity itself, so Spring can't bind
    // a path variable straight into it (read/delete by id below are kept
    // for completeness but aren't reachable over plain REST without a
    // custom converter). getAll() is the endpoint the public site uses.
    @GetMapping("/all")
    public List<Contact> getAll(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Contact read(@PathVariable Address id){
        return service.read(id);
    }

    @PutMapping
    public Contact update(@RequestBody Contact contact){
        return service.update(contact);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable Address id){
        service.delete(id);
        return false;
    }
}
