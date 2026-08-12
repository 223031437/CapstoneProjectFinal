package za.ac.cput.nailbeautysalon.repository;
/*
Customer Repository class
Chris Kabangu
220296693
*/
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import za.ac.cput.nailbeautysalon.domain.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
}