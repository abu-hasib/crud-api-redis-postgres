DROP DATABASE IF EXISTS accounts;
CREATE DATABASE accounts;

\c accounts;

CREATE TABLE account (
  ID SERIAL PRIMARY KEY,
  owner VARCHAR,
  type VARCHAR,
  amount INTEGER,
  status VARCHAR
);

INSERT INTO account (owner, type, amount, status)
  VALUES ('Agabiaka Nwosu Adamu', 'Savings', 8490, 'active');
