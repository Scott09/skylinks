DROP TABLE IF EXISTS flights CASCADE;

CREATE TABLE flights (
  id SERIAL PRIMARY KEY NOT NULL,
  model VARCHAR(255),
  route_id INT REFERENCES routes(id),
  airline_iata VARCHAR(255) REFERENCES airlines(iata)
);
