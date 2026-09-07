import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar.jsx";

import styles from "./MyTrips.module.css";

function MyTrips() {
    const navigate = useNavigate();

    const [trips, setTrips] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);

    const [filters, setFilters] = useState({
        destination: "",
        departureDate: "",
        returnDate: "",
        budget: "",
        tripType: "",
    });

    useEffect(() => {
        getTrips();
    }, []);

    function toggleMenu(tripId) {
        setOpenMenuId((current) => (current === tripId ? null : tripId));
    }

    function handleEdit(tripId) {
        setOpenMenuId(null);
        navigate(`/trips/edit/${tripId}`);
    }

    function handleDelete(tripId) {
        setOpenMenuId(null);

        const confirmed = window.confirm(
            "Tem certeza que deseja excluir esta viagem?"
        );

        if (!confirmed) {
            return;
        }

        axios
            .delete(`http://localhost:8080/v1/trips/${tripId}`)
            .then(() => {
                getTrips();
            })
            .catch((error) => {
                console.error("Erro ao excluir viagem:", error);
            });
    }

    function getTrips() {
        axios
            .get("http://localhost:8080/v1/trips")
            .then((response) => {
                setTrips(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar viagens:", error);
            });
    }

    function handleChange(event) {
        const {name, value} = event.target;

        setFilters({
            ...filters,
            [name]: value,
        });
    }

    function handleFilter(event) {
        event.preventDefault();

        axios
            .get("http://localhost:8080/v1/trips/filters", {
                params: filters,
            })
            .then((response) => {
                setTrips(response.data);
            })
            .catch((error) => {
                console.error("Erro ao filtrar viagens:", error);
            });
    }

    function clearFilters() {
        setFilters({
            destination: "",
            departureDate: "",
            returnDate: "",
            budget: "",
            tripType: "",
        });

        getTrips();
    }

    return (
        <div className={styles.pageLayout}>
            <Sidebar/>

            <main className={styles.myTrips}>
                <header className={styles.pageHeader}>
                    <h1>Minhas viagens</h1>

                    <p>
                        Aqui estão todas as suas viagens cadastradas.
                    </p>
                </header>

                <section
                    className={styles.filters}
                    aria-labelledby="filters-title"
                >
                    <h2 id="filters-title">
                        Filtros
                    </h2>

                    <form onSubmit={handleFilter}>
                        <div className={styles.filterFields}>
                            <div className={styles.field}>
                                <label htmlFor="destination">
                                    Destino
                                </label>

                                <input
                                    type="search"
                                    id="destination"
                                    name="destination"
                                    value={filters.destination}
                                    onChange={handleChange}
                                    placeholder="Buscar destino"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="departureDate">
                                    Data de ida
                                </label>

                                <input
                                    type="date"
                                    id="departureDate"
                                    name="departureDate"
                                    value={filters.departureDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="returnDate">
                                    Data de volta
                                </label>

                                <input
                                    type="date"
                                    id="returnDate"
                                    name="returnDate"
                                    value={filters.returnDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="budget">
                                    Orçamento
                                </label>

                                <input
                                    type="number"
                                    id="budget"
                                    name="budget"
                                    value={filters.budget}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    placeholder="Ex.: 5000"
                                />
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="tripType">
                                    Tipo de viagem
                                </label>

                                <select
                                    id="tripType"
                                    name="tripType"
                                    value={filters.tripType}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Todos
                                    </option>

                                    <option value="LAZER">
                                        Lazer
                                    </option>

                                    <option value="NEGOCIOS">
                                        Negócios
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.filterActions}>
                            <button
                                type="button"
                                onClick={clearFilters}
                            >
                                Limpar filtros
                            </button>

                            <button type="submit">
                                Aplicar filtros
                            </button>
                        </div>
                    </form>
                </section>

                <section
                    className={styles.tripsSection}
                    aria-labelledby="trips-title"
                >
                    <h2 id="trips-title">
                        Viagens cadastradas
                    </h2>

                    {trips.length === 0 ? (
                        <p>
                            Nenhuma viagem encontrada.
                        </p>
                    ) : (
                        <ul className={styles.tripsList}>
                            {trips.map((trip) => (
                                <li key={trip.id}>
                                    <article className={styles.tripCard}>
                                        <header className={styles.tripHeader}>
                                            <h3>
                                                {trip.destination}
                                            </h3>

                                            <div className={styles.optionsWrapper}>
                                                <button
                                                    type="button"
                                                    aria-label={`Opções da viagem para ${trip.destination}`}
                                                    aria-haspopup="true"
                                                    aria-expanded={openMenuId === trip.id}
                                                    className={styles.optionsButton}
                                                    onClick={() => toggleMenu(trip.id)}
                                                >
                                                    ⋮
                                                </button>

                                                {openMenuId === trip.id && (
                                                    <ul className={styles.optionsMenu}>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEdit(trip.id)}
                                                            >
                                                                Editar
                                                            </button>
                                                        </li>

                                                        <li>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(trip.id)}
                                                            >
                                                                Excluir
                                                            </button>
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>
                                        </header>

                                        <p className={styles.tripDates}>
                                            {trip.departureDate}
                                            {" - "}
                                            {trip.returnDate}
                                        </p>

                                        <span
                                            className={
                                                trip.tripType === "NEGOCIOS"
                                                    ? styles.business
                                                    : styles.leisure
                                            }
                                        >
                                            {trip.tripType}
                                        </span>

                                        <p className={styles.budget}>
                                            R$ {trip.budget}
                                        </p>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </div>
    );
}

export default MyTrips;