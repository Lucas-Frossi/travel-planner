CREATE DATABASE IF NOT EXISTS travel_planner;

USE travel_planner;

CREATE TABLE trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(255) NOT NULL,
    departure_date DATE NOT NULL,
    return_date DATE NOT NULL,
    budget DECIMAL(10,2) NOT NULL,
    trip_type VARCHAR(50) NOT NULL
);