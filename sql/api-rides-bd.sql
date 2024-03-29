CREATE TABLE riders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL

);

INSERT INTO riders(
id,
name,
email
)

values(
1,
'Antony manyoma',
'antonymanyoma@email.com'
);


CREATE TABLE drivers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    lat NUMERIC UNIQUE NOT NULL,
    lng NUMERIC UNIQUE NOT NULL
);


INSERT INTO drivers(
id,
name,
email,
lat,
lng
)

values(
  1,
'Jhon perez',
'jhonperez@email.com',
3.547206,
-76.293065
);

INSERT INTO drivers(
id,
name,
email,
lat,
lng
)

values(
2,
'Carlos jimenez',
'carlosjimenez@email.com',
3.532771,
-76.314465
);

INSERT INTO drivers(
id,
name,
email,
lat,
lng
)

values(
3,
'Laura ochoa',
'lauraochoa@email.com',
3.532461,
-76.294834
);

INSERT INTO drivers(
id,
name,
email,
lat,
lng
)

values(
	4,
'Milo ochoa',
'miloochoa@email.com',
3.531199,
-76.292340
);


CREATE TABLE payments_sources(
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    payment_source_id BIGINT NOT NULL,
    rider_id BIGINT NOT NULL,
    FOREIGN KEY (rider_id) REFERENCES riders (id)
);


CREATE TABLE rides(
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    driver_id BIGINT NOT NULL,
    rider_id BIGINT NOT NULL,
    lat NUMERIC UNIQUE NOT NULL,
    lng NUMERIC UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL,
    total NUMERIC NULL,
    FOREIGN KEY (rider_id) REFERENCES riders (id),
    FOREIGN KEY (driver_id) REFERENCES drivers (id)
);


