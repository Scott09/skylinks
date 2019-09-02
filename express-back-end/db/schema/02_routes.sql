DROP TABLE IF EXISTS routes CASCADE;

CREATE TABLE routes (
  id SERIAL PRIMARY KEY NOT NULL,
  stops INT DEFAULT 0,
  departure_iata VARCHAR(255) REFERENCES aiports(iata),
  arrival_iata VARCHAR(255) REFERENCES aiports(iata)
);
