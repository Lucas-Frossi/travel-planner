import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar.jsx";

import styles from "./EditTrip.module.css";

function EditTrip() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [trip, setTrip] = useState({
        destination: "",
        departureDate: "",
        returnDate: "",
        budget: "",
        tripType: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/v1/trips/${id}`)
            .then((response) => {
                setTrip(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar viagem:", error);
                setLoading(false);
            });
    }, [id]);

    function handleChange(event) {
        const {name, value} = event.target;

        setTrip({
            ...trip,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios
            .put(`http://localhost:8080/v1/trips/${id}`, trip)
            .then(() => {
                navigate("/trips");
            })
            .catch((error) => {
                console.error("Erro ao atualizar viagem:", error);
            });
    }

    function handleCancel() {
        navigate("/trips");
    }

    if (loading) {
        return (
            <div className={styles.pageLayout}>
                <Sidebar/>

                <main className={styles.createTrip}>
                    <p>Carregando viagem...</p>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.pageLayout}>
            <Sidebar/>

            <main className={styles.createTrip}>
                <header className={styles.header}>
                    <h1>Editar viagem</h1>

                    <p>
                        Atualize as informações da sua viagem.
                    </p>
                </header>

                <form onSubmit={handleSubmit}>
                    <fieldset className={styles.formFields}>
                        <legend>
                            Informações da viagem
                        </legend>

                        <div className={styles.field}>
                            <label htmlFor="destination">
                                Destino
                            </label>

                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                value={trip.destination}
                                onChange={handleChange}
                                placeholder="Ex.: Paris, França"
                                required
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
                                value={trip.departureDate}
                                onChange={handleChange}
                                required
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
                                value={trip.returnDate}
                                onChange={handleChange}
                                required
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
                                value={trip.budget}
                                onChange={handleChange}
                                placeholder="Ex.: 5000"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="tripType">
                                Tipo de viagem
                            </label>

                            <select
                                id="tripType"
                                name="tripType"
                                value={trip.tripType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Selecione o tipo
                                </option>

                                <option value="LAZER">
                                    Lazer
                                </option>

                                <option value="NEGOCIOS">
                                    Negócios
                                </option>

                                <option value="AVENTURA">
                                    Aventura
                                </option>

                                <option value="FAMILIA">
                                    Família
                                </option>

                                <option value="ROMANTICA">
                                    Romântica
                                </option>
                            </select>
                        </div>
                    </fieldset>

                    <footer className={styles.actions}>
                        <button
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>

                        <button type="submit">
                            Salvar alterações
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default EditTrip;