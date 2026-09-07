import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import MyTrips from "./pages/MyTrips/MyTrips.jsx";
import CreateTrip from "./pages/CreateTrip/CreateTrip.jsx";
import EditTrip from "./pages/EditTrip/EditTrip.jsx";

import "./App.css";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/trips"
                    element={<MyTrips />}
                />

                <Route
                    path="/trips/create"
                    element={<CreateTrip />}
                />

                <Route
                    path="/trips/edit/:id"
                    element={<EditTrip />}
                />
            </Routes>
        </div>
    );
}

export default App;