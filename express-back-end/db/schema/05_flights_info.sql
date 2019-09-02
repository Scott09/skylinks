DROP TABLE IF EXISTS flights_info CASCADE;

CREATE TABLE flights_info (
  id SERIAL PRIMARY KEY NOT NULL,
  _timestamp timestamp,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  altitude DECIMAL NOT NULL,
  flight_id INT REFERENCES flights(id)
);
