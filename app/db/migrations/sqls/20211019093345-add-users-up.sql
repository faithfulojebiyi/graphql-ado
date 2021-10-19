/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS user(
  id uuid PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  isactive BOOLEAN NOT NULL,
);

CREATE TABLE IF NOT EXISTS post(
  id uuid PRIMARY KEY,
  userid uuid REFERENCES user(id) NOT NULL,
  content VARCHAR(1000) NOT NULL,
  ispublished BOOLEAN NOT NULL,
);