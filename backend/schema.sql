CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    nick text UNIQUE,
    entity text,
    email text NOT NULL UNIQUE
);

CREATE TABLE authData (
    user_id INTEGER PRIMARY KEY NOT NULL REFERENCES "user" (id),
    password_hash text
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
INSERT INTO place VALUES (DEFAULT,'Chatelet, 74001 Paris','Paris','Châtelet in Paris');

INSERT INTO "group"VALUES (DEFAULT, 'E-Event');
INSERT INTO "group"VALUES (DEFAULT, 'Test Group');

INSERT INTO "user" VALUES (DEFAULT, 'UserOne', 'Ricky', 'RickiBoi', 'Polytech-Bots','rickyboi@gmail.com');
INSERT INTO "user" VALUES (DEFAULT, 'UserTwo', 'Marco', 'polo', 'Polytech-Bots','marco@gmail.com');
INSERT INTO "user" VALUES (DEFAULT, 'UserThree', 'ui', 'oioioi', 'Polytech-Bots','ui@gmail.com');

INSERT INTO authdata VALUES(1,'3628b592447c13efba1ec3b7d6af3e8a31580a540fefe9a38c6358961e29a1d8');
INSERT INTO authdata VALUES(2,'860fa34c373ebe2f7ece2295c0521ef9deb71ffc7ea34e48ed11c086d6907805');
INSERT INTO authdata VALUES(3,'860fa34c373ebe2f7ece2295c0521ef9deb71ffc7ea34e48ed11c086d6907805');

INSERT into membership VALUES (1,1);
INSERT into membership VALUES (2,1);
INSERT into membership VALUES (2,2);
INSERT into membership VALUES (3,2);

INSERT into administration VALUES (2,1);
INSERT into administration VALUES (3,2);

INSERT INTO event VALUES (DEFAULT,'Parrainage',1,1,20,'2021-03-14','2021-03-14',0,'C''est genial!');
INSERT INTO event VALUES (DEFAULT,'Maraton',2,2,500,'2021-04-30','2021-04-30',10,'Venez courir!');

INSERT INTO participation VALUES(1,1);
INSERT INTO participation VALUES(2,1);
INSERT INTO participation VALUES(2,2);