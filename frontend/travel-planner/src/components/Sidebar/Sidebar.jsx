import {NavLink} from "react-router-dom";

import styles from "./Sidebar.module.css";

function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <NavLink
                to="/"
                className={styles.logo}
                aria-label="Travel Planner - Início"
            >
                <img
                    src="/images/logo.png"
                    alt="Travel Planner"
                />
            </NavLink>

            <nav aria-label="Menu principal">
                <ul className={styles.navigation}>
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) =>
                                `${styles.navLink} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                        >
                            <span className={styles.icon}>
                                <img
                                    src="/images/home.png"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </span>

                            <span>Início</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/trips"
                            end
                            className={({isActive}) =>
                                `${styles.navLink} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                        >
                            <span className={styles.icon}>
                                <img
                                    src="/images/trips.png"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </span>

                            <span>Minhas viagens</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/trips/create"
                            className={({isActive}) =>
                                `${styles.navLink} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                        >
                            <span className={styles.icon}>
                                <img
                                    src="/images/plus.png"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </span>

                            <span>Cadastrar viagem</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <footer className={styles.footer}>
                <NavLink to={'/'} className={styles.footerLink}>
                    <button
                        type="button"
                        className={styles.logout}
                    >
                        <span className={styles.icon}>
                            <img
                                src="/images/logout.webp"
                                alt=""
                                aria-hidden="true"
                            />
                        </span>

                        <span>Sair</span>
                    </button>
                </NavLink>
            </footer>
        </aside>
    );
}

export default Sidebar;