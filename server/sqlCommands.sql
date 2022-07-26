CREATE TABLE nimet(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    date_added TEXT
);
CREATE TABLE names(
    idMain SERIAL PRIMARY KEY,
    id INTEGER,
    nimi TEXT NOT NULL,
    date_added TEXT
);