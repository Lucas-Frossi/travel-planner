import {Link} from "react-router-dom";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.page}>
            <Header/>

            <main className={styles.home}>
                <section
                    className={styles.hero}
                    aria-labelledby="hero-title"
                >
                    <article className={styles.heroContent}>
                        <h1 id="hero-title">
                            Planeje suas
                            <br/>
                            próximas aventuras
                        </h1>

                        <p>
                            Organize seus destinos, gerencie seu orçamento
                            <br/>
                            e viva experiências inesquecíveis.
                        </p>

                        <Link
                            to="/trips/create"
                            className={styles.heroButton}
                        >
                            Começar agora

                            <span aria-hidden="true">
                                →
                            </span>
                        </Link>
                    </article>

                    <figure className={styles.heroImage}>
                        <img
                            src="/images/travel-hero.png"
                            alt="Pessoa planejando uma viagem em uma paisagem"
                        />
                    </figure>
                </section>
            </main>

            <Footer/>
        </div>
    );
}

export default Home;