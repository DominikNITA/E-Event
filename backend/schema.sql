CREATE TABLE "user" (
    id INTEGER PRIMARY KEY,
    firstName text NOT NULL,
    lastName text NOT NULL,
    nick text,
    entity text,
    email text NOT NULL
);

CREATE TABLE place (
    id INTEGER PRIMARY KEY,
    address TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE event (
    id INTEGER PRIMARY KEY,
    name text NOT NULL,
    place_id INTEGER REFERENCES place (id),
    organizer_id INTEGER REFERENCES event (id),
    availablePlaces INTEGER,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    --https://stackoverflow.com/a/51238749/13251554 -> utiliser bigint ou numeric pour stocker la monnaie?
    price BIGINT,
    information text NOT NULL
);

CREATE TABLE groupe (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE participation (
    user_id INTEGER NOT NULL REFERENCES "user" (id),
    event_id INTEGER NOT NULL REFERENCES event (id),
    UNIQUE(user_id,event_id)
);

CREATE TABLE membership (
    user_id INTEGER NOT NULL REFERENCES "user" (id),
    groupe_id INTEGER NOT NULL REFERENCES groupe (id),
    UNIQUE(user_id,groupe_id)
);

CREATE TABLE administration (
    user_id INTEGER NOT NULL REFERENCES "user" (id),
    groupe_id INTEGER NOT NULL REFERENCES groupe (id),
    UNIQUE(user_id,groupe_id)
);