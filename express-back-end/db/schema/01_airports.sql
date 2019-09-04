DROP TABLE IF EXISTS airports CASCADE;

CREATE TABLE airports (
  iata PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  country VARCHAR(255),
  city VARCHAR(255)
);