DROP TABLE IF EXISTS airports CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS airlines CASCADE;
DROP TABLE IF EXISTS flights CASCADE;
DROP TABLE IF EXISTS route_info CASCADE;


CREATE TABLE airports (
  fs VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  countrycode VARCHAR(255),
  countryname VARCHAR(255),
  city VARCHAR(255)
);

CREATE TABLE routes (
  id SERIAL PRIMARY KEY NOT NULL,
  stops INT DEFAULT 0,
  departure_iata VARCHAR(255) REFERENCES airports(fs),
  arrival_iata VARCHAR(255) REFERENCES airports(fs) 
);


CREATE TABLE airlines (
  fs VARCHAR(255) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  iata VARCHAR(255),
  icao VARCHAR(255)
);


CREATE TABLE flights (
  id SERIAL PRIMARY KEY NOT NULL,
  airlineFsCode VARCHAR(255) REFERENCES airlines(fs),
  stops INT, 
  departureAirportFs VARCHAR(255),
  arrivalAirportFs VARCHAR(255),
  departureTime VARCHAR(255),
  arrivalTime VARCHAR(255)
);


create table route_info (
  id SERIAL PRIMARY KEY NOT NULL,
  position_time INT,
  position VARCHAR(255),
  altitude INT,
  direction INT,
  departure_iata VARCHAR(255),
  arrival_iata VARCHAR(255)
  );
