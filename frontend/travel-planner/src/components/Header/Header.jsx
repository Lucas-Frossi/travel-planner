import {Link} from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img
                    src="/images/logo.png"
                    alt="Travel Planner"
                />
            </Link>

            <nav
                className={styles.nav}
                aria-label="Navegação principal"
            >
                <ul className={styles.navList}>
                    <li>
                        <Link to="/" className={styles.navLink}>
                            Início
                        </Link>
                    </li>

                    <li>
                        <Link to="/trips" className={styles.navLink}>
                            Minhas Viagens
                        </Link>
                    </li>
                </ul>
            </nav>

            <Link
                to="/trips/create"
                className={styles.registerButton}
            >
                Cadastrar viagens
            </Link>
        </header>
    );
}

export default Header;