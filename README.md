# tmi_PG

Twitch chat logger with PostgreSQL

## Installation

* Clone the repo and edit the db.js file with your database credentials then edit index.js for the channels you want to log.

OR

* Docker https://hub.docker.com/r/awniahades/tmi_pg


## Usage

You will need to run this query first for now.

```SQL
CREATE TABLE IF NOT EXISTS users
(
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(50) NOT NULL,
    user_id INT UNIQUE  NOT NULL
);

CREATE TABLE IF NOT EXISTS channel_list
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(30) NOT NULL,
    channel_id INT UNIQUE  NOT NULL
);

CREATE TABLE messages
(
    id         SERIAL PRIMARY KEY,
    body       VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id    INTEGER      NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    channel_id INTEGER      NOT NULL REFERENCES channel_list (channel_id) ON DELETE CASCADE
    );
```
