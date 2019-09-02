DROP TABLE IF EXISTS airlines CASCADE;

CREATE TABLE airlines (
  iata PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  logo_link VARCHAR(255),
  website_link VARCHAR(255)
);
