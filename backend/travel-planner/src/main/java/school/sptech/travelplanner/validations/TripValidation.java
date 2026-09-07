package school.sptech.travelplanner.validations;

import org.springframework.stereotype.Component;
import school.sptech.travelplanner.enums.TripType;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class TripValidation {

    public Boolean isIdValid(Integer id) {
        return id != null && id > 0;
    }

    public Boolean isDestinationValid(String destination) {
        return destination != null && !destination.isBlank();
    }

    public Boolean isDepartureDateValid(LocalDate departureDate) {
        return departureDate != null;
    }

    public Boolean isReturnDateValid(LocalDate returnDate) {
        return returnDate != null;
    }

    public Boolean isDatesValid(
            LocalDate departureDate,
            LocalDate returnDate
    ) {
        return departureDate != null
                && returnDate != null
                && !returnDate.isBefore(departureDate);
    }

    public Boolean isTripTypeValid(TripType tripType) {
        return tripType != null;
    }

    public Boolean isBudgetValid(BigDecimal budget) {
        return budget != null
                && budget.compareTo(BigDecimal.ZERO) > 0;
    }
}
