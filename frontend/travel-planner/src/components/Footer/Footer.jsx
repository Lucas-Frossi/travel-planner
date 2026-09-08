import styles from "./Footer.module.css";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <section
                className={styles.benefitsSection}
                aria-label="Benefícios do Travel Planner"
            >
                <ul className={styles.benefits}>
                    <li className={styles.benefit}>
                        <span className={`${styles.icon} ${styles.travelIcon}`}>
                            <img
                                src="/images/travel.webp"
                                alt=""
                                aria-hidden="true"
                            />
                        </span>

                        <h3>Organize suas viagens</h3>

                        <p>
                            Tenha todas as informações
                            <br/>
                            em um só lugar.
                        </p>
                    </li>

                    <li className={styles.benefit}>
                        <span className={`${styles.icon} ${styles.destinationIcon}`}>
                            <img
                                src="/images/destination.png"
                                alt=""
                                aria-hidden="true"
                            />
                        </span>

                        <h3>Gerencie destinos</h3>

                        <p>
                            Adicione, edite e acompanhe
                            <br/>
                            suas próximas viagens.
                        </p>
                    </li>

                    <li className={styles.benefit}>
                        <span className={`${styles.icon} ${styles.budgetIcon}`}>
                            <img
                                src="/images/budget.png"
                                alt=""
                                aria-hidden="true"
                            />
                        </span>

                        <h3>Controle seu orçamento</h3>

                        <p>
                            Planeje seus gastos
                            <br/>
                            e evite surpresas.
                        </p>
                    </li>

                    <li className={styles.benefit}>
                        <span className={`${styles.icon} ${styles.experienceIcon}`}>
                            <img
                                src="/images/experience.png"
                                alt=""
                                aria-hidden="true"
                            />
                        </span>

                        <h3>Viva novas experiências</h3>

                        <p>
                            Descubra o mundo
                            <br/>
                            do seu jeito.
                        </p>
                    </li>
                </ul>
            </section>
        </footer>
    );
}

export default Footer;