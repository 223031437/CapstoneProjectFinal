package za.ac.cput.nailbeautysalon.service;
/*
ICustomerService class
Author: Chris Kabangu
220296693
*/
import za.ac.cput.nailbeautysalon.domain.Customer;

import java.util.List;

public interface ICustomerService <T, ID>{
    T create(T t);
    T read(ID id);
    T update(T t);
    boolean delete(ID id);
    List<Customer> getAll();
}