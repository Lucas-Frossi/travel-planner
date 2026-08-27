package school.sptech.travelplanner.validations;

import org.springframework.stereotype.Component;

@Component
public class UserValidation {
    public Boolean isNameValid(String name) {
        return name != null && !name.isBlank();
    }

    public Boolean isEmailValid(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";

        return email != null && email.matches(regex);
    }

    public Boolean isPhoneValid(String phone) {
        String regex = "^\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}$";

        return phone != null && phone.matches(regex);
    }
}
