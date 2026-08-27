package school.sptech.travelplanner.repositories;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import school.sptech.travelplanner.models.User;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class UserRepository {

    private final JdbcTemplate template;

    public UserRepository(JdbcTemplate template) {
        this.template = template;
    }

    public void save(User user) {
        String sqlInsert = """
                INSERT INTO users (name, email, phone, password)
                VALUES (?, ?, ?, ?)
                """;

        KeyHolder key = new GeneratedKeyHolder();

        template.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(
                    sqlInsert,
                    Statement.RETURN_GENERATED_KEYS
            );

            statement.setString(1, user.getName());
            statement.setString(2, user.getEmail());
            statement.setString(3, user.getPhone());
            statement.setString(4, user.getPassword());

            return statement;

        }, key);

        Integer idGenerated = key.getKeyAs(Number.class).intValue();

        user.setId(idGenerated);

    }

    public Boolean isEmailExiste(String email) {
        String sql = """
                SELECT COUNT(*)
                FROM users
                WHERE email = ?
                """;

        Integer quantidade = template.queryForObject(
                sql,
                Integer.class,
                email
        );

        return quantidade > 0;
    }
}
