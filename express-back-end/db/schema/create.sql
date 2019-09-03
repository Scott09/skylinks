DROP TABLE IF EXISTS airports CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS airlines CASCADE;
DROP TABLE IF EXISTS flights CASCADE;
DROP TABLE IF EXISTS flights_info CASCADE;

CREATE TABLE airports (
  iata VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  country VARCHAR(255),
  city VARCHAR(255)
);

CREATE TABLE routes (
  id SERIAL PRIMARY KEY NOT NULL,
  stops INT DEFAULT 0,
  departure_iata VARCHAR(255) REFERENCES airports(iata),
  arrival_iata VARCHAR(255)
);


CREATE TABLE airlines (
  iata VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  logo_link VARCHAR(255),
  website_link VARCHAR(255)
);


CREATE TABLE flights (
  id SERIAL PRIMARY KEY NOT NULL,
  model VARCHAR(255),
  route_id INT REFERENCES routes(id),
  airline_iata VARCHAR(255) REFERENCES airlines(iata)
);


CREATE TABLE flights_info (
  id SERIAL PRIMARY KEY NOT NULL,
  _timestamp timestamp,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  altitude DECIMAL NOT NULL,
  flight_id INT REFERENCES flights(id)
);
