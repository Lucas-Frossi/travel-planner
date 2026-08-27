package school.sptech.travelplanner.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import school.sptech.travelplanner.models.User;
import school.sptech.travelplanner.repositories.UserRepository;
import school.sptech.travelplanner.validations.UserValidation;

@RestController
@RequestMapping("v1/users")
public class UserController {
    private final UserRepository repository;
    private final UserValidation validation;

    public UserController(UserRepository repository, UserValidation validation) {
        this.repository = repository;
        this.validation = validation;
    }

    @PostMapping
    public ResponseEntity<User> register(@RequestBody User user) {
        if (!validation.isNameValid(user.getName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (!validation.isEmailValid(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (!validation.isPhoneValid(user.getPhone())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (repository.isEmailExiste(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        repository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

}
