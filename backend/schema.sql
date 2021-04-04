CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    nick text,
    entity text,
    email text NOT NULL
);

CREATE TABLE place (
    id SERIAL PRIMARY KEY,
    address TEXT NOT NULL,
    place_name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE "group"(
    id SERIAL PRIMARY KEY,
    group_name TEXT NOT NULL
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    event_name text NOT NULL,
    place_id INTEGER REFERENCES place (id),
    organizer_id INTEGER REFERENCES "group"(id),
    available_places INTEGER,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    --https://stackoverflow.com/a/51238749/13251554 -> utiliser bigint ou numeric pour stocker la monnaie?
    price BIGINT,
    information text NOT NULL
);

CREATE TABLE participation (
    user_id INTEGER NOT NULL REFERENCES "user" (id),
    event_id INTEGER NOT NULL REFERENCES event (id),
    UNIQUE(user_id,event_id)
);

CREATE TABLE membership (
    user_id INTEGER NOT NULL REFERENCES "user" (id),
    group_id INTEGER NOT NULL REFERENCES "group"(id),
    UNIQUE(user_id,group_id)
);

CREATE TABLE administration (
    user_id INTEGER NOT NULL REFERENCES "user" (id),
    group_id INTEGER NOT NULL REFERENCES "group"(id),
    UNIQUE(user_id,group_id)
);

INSERT INTO place VALUES (DEFAULT,'Rue Louis de Broglie, 91190 Orsay','Maison de l''Ingénieur','Batiment 620. Polytech Paris-Saclay');

INSERT INTO "group"VALUES (DEFAULT, 'E-Event');

INSERT INTO "user" VALUES (DEFAULT, 'UserOne', 'Ricky', 'RickiBoi', 'Polytech-Bots','rickyboi@gmail.com');
INSERT INTO "user" VALUES (DEFAULT, 'UserTwo', 'Marco', 'polo', 'Polytech-Bots','marco@gmail.com');

INSERT into membership VALUES (1,1);
INSERT into membership VALUES (2,1);

INSERT INTO event VALUES (DEFAULT,'Parrainage',1,1,20,'2021-03-14','2021-03-14',0,'C''est genial!');