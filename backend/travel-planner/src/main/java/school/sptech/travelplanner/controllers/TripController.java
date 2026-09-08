package school.sptech.travelplanner.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.sptech.travelplanner.enums.TripType;
import school.sptech.travelplanner.models.Trip;
import school.sptech.travelplanner.repositories.TripRepository;
import school.sptech.travelplanner.validations.TripValidation;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("v1/trips")
public class TripController {

    private final TripRepository repository;
    private final TripValidation validation;

    public TripController(
            TripRepository repository,
            TripValidation validation
    ) {
        this.repository = repository;
        this.validation = validation;
    }

    @PostMapping
    public ResponseEntity<?> register(@RequestBody Trip trip) {

        if (!validation.isDestinationValid(trip.getDestination())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("O destino é obrigatório.");
        }

        if (!validation.isDepartureDateValid(trip.getDepartureDate())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("A data de partida é obrigatória.");
        }

        if (!validation.isReturnDateValid(trip.getReturnDate())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("A data de retorno é obrigatória.");
        }

        if (!validation.isDatesValid(
                trip.getDepartureDate(),
                trip.getReturnDate()
        )) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("A data de retorno não pode ser anterior à data de partida.");
        }

        if (!validation.isTripTypeValid(trip.getTripType())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("O tipo da viagem é obrigatório.");
        }

        if (!validation.isBudgetValid(trip.getBudget())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("O orçamento deve ser maior que zero.");
        }

        repository.save(trip);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(trip);
    }

    @GetMapping
    public ResponseEntity<?> findAll() {

        List<Trip> trips = repository.findAll();

        if (trips.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Nenhuma viagem encontrada.");
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(trips);
    }

    @GetMapping("/filters")
    public ResponseEntity<?> filter(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) LocalDate departureDate,
            @RequestParam(required = false) LocalDate returnDate,
            @RequestParam(required = false) BigDecimal budget,
            @RequestParam(required = false) TripType tripType
    ) {

        List<Trip> trips = repository.findAllWithFilters(
                destination,
                departureDate,
                returnDate,
                budget,
                tripType
        );

        if (trips.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Nenhuma viagem encontrada.");
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(trips);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {

        if (!validation.isIdValid(id)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("O ID da viagem é inválido.");
        }

        Trip trip = repository.findById(id);

        if (trip == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Viagem não encontrada.");
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(trip);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Trip trip) {
        if (!validation.isIdValid(id)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("O ID da viagem é inválido.");
        }

        if (!validation.isDestinationValid(trip.getDestination())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("O destino é obrigatório.");
        }

        if (!validation.isDepartureDateValid(trip.getDepartureDate())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("A data de partida é obrigatória.");
        }

        if (!validation.isReturnDateValid(trip.getReturnDate())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("A data de retorno é obrigatória.");
        }

        if (!validation.isDatesValid(
                trip.getDepartureDate(),
                trip.getReturnDate()
        )) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("A data de retorno não pode ser anterior à data de partida.");
        }

        if (!validation.isTripTypeValid(trip.getTripType())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("O tipo da viagem é obrigatório.");
        }

        if (!validation.isBudgetValid(trip.getBudget())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("O orçamento deve ser maior que zero.");
        }

        int response = repository.update(id, trip);

        if (response == 0) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Viagem não encontrada.");
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(trip);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) {

        if (!validation.isIdValid(id)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("O ID da viagem é inválido.");
        }

        int response = repository.remove(id);

        if (response == 0) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Viagem não encontrada.");
        }

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body("Viagem excluída com sucesso.");
    }
}