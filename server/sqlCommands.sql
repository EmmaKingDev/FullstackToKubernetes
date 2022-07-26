CREATE TABLE nimet(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    date_added TEXT
);
CREATE TABLE names(
    id TEXT,
    nimi TEXT NOT NULL,
    date_added TEXT
);