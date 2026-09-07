package school.sptech.travelplanner.repositories;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import school.sptech.travelplanner.enums.TripType;
import school.sptech.travelplanner.models.Trip;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.List;

@Repository
public class TripRepository {

    private final JdbcTemplate template;

    public TripRepository(JdbcTemplate template) {
        this.template = template;
    }

    public void save(Trip trip) {
        String sqlInsert = """
                INSERT INTO trips (
                    destination,
                    departure_date,
                    return_date,
                    budget,
                    trip_type
                )
                VALUES (?, ?, ?, ?, ?)
                """;

        KeyHolder key = new GeneratedKeyHolder();

        template.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(
                    sqlInsert,
                    Statement.RETURN_GENERATED_KEYS
            );

            statement.setString(1, trip.getDestination());
            statement.setDate(2, java.sql.Date.valueOf(trip.getDepartureDate()));
            statement.setDate(3, java.sql.Date.valueOf(trip.getReturnDate()));
            statement.setBigDecimal(4, trip.getBudget());
            statement.setString(5, trip.getTripType().name());

            return statement;

        }, key);

        Integer idGenerated = key.getKeyAs(Number.class).intValue();

        trip.setId(idGenerated);
    }

    public List<Trip> findAll() {
        String sqlSelect = """
                SELECT
                    id,
                    destination,
                    departure_date AS departureDate,
                    return_date AS returnDate,
                    budget,
                    trip_type AS tripType
                FROM trips
                """;

        return template.query(
                sqlSelect,
                new BeanPropertyRowMapper<>(Trip.class)
        );
    }

    public List<Trip> findAllWithFilters(
            String destination,
            LocalDate departureDate,
            LocalDate returnDate,
            BigDecimal budget,
            TripType tripType
    ) {
        String sqlSelect = """
                SELECT
                    id,
                    destination,
                    departure_date AS departureDate,
                    return_date AS returnDate,
                    budget,
                    trip_type AS tripType
                FROM trips
                WHERE (? IS NULL OR UPPER(destination) LIKE UPPER(?))
                AND (? IS NULL OR departure_date = ?)
                AND (? IS NULL OR return_date = ?)
                AND (? IS NULL OR budget = ?)
                AND (? IS NULL OR trip_type = ?)
                """;

        return template.query(
                sqlSelect,
                new Object[]{
                        destination,
                        destination != null ? "%" + destination + "%" : null,
                        departureDate,
                        departureDate,
                        returnDate,
                        returnDate,
                        budget,
                        budget,
                        tripType != null ? tripType.name() : null,
                        tripType != null ? tripType.name() : null
                },
                new BeanPropertyRowMapper<>(Trip.class)
        );
    }

    public Trip findById(Integer id) {
        String sqlSelect = """
                SELECT
                    id,
                    destination,
                    departure_date AS departureDate,
                    return_date AS returnDate,
                    budget,
                    trip_type AS tripType
                FROM trips
                WHERE id = ?
                """;

        List<Trip> trips = template.query(
                sqlSelect,
                new BeanPropertyRowMapper<>(Trip.class),
                id
        );

        return trips.isEmpty() ? null : trips.get(0);
    }

    public int update(Integer id, Trip trip) {
        String sqlUpdate = """
                UPDATE trips
                SET destination = ?,
                    departure_date = ?,
                    return_date = ?,
                    budget = ?,
                    trip_type = ?
                WHERE id = ?
                """;

        int response = template.update(
                sqlUpdate,
                trip.getDestination(),
                trip.getDepartureDate(),
                trip.getReturnDate(),
                trip.getBudget(),
                trip.getTripType().name(),
                id
        );

        trip.setId(id);

        return response;
    }

    public int remove(Integer id) {
        String sqlDelete = """
            DELETE FROM trips
            WHERE id = ?
            """;

        return template.update(sqlDelete, id);
    }

    public Boolean existById(Integer id) {
        String sql = """
                SELECT COUNT(*)
                FROM trips
                WHERE id = ?
                """;

        Integer quantidade = template.queryForObject(
                sql,
                Integer.class,
                id
        );

        return quantidade != null && quantidade > 0;
    }
}