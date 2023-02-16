# Rides api

![Image text](https://descubrecomohacerlo.com/wp-content/uploads/2020/07/gps-uber.jpg)

> Is a ride-hailing service, developed in Nest js. A sql file is included inside with dummy data for its operation. Uses Postgresql relational database and ORM TypeOrm.

> With this API you can create a payment source with a previously tokenized card and an acceptance token, request a ride and pay for it at the end.


# Getting Started

> According to general purpose you need to configure and follows next steps

## Configuration and Prerequisites

  - Node js v 14.16.0
  - Nest js cli v 9.1.9
  - npm v 6.14.11
  - Docker
  - Create .env file and includes

    ```
    POSTGRES_PORT_EXTERNAL=9091
    DB_USER=root
    DB_PASS=QXBJXy9SaURlclMq
    DB_NAME=api-rides

    DB_HOST=database
    DB_PORT=5432

    AUTHORIZATION_WOMPI_TOKEN=PUT_YOUR_TOKEN
    ```
## Instalation

  - Clone the project
  - Execute npm install
  - Run docker compose up -d

## Tips 
> The docker-compose file contains the Pgadmin image, to connect to the database and review the information quickly. the connection data is
    ```
    Email: prueba@email.com
    Password: root
    ```

## Available Endpoints

1. Create payment source 

  - url http://localhost:3000/api/payments_sources/create
  - Method POST
  - Params
  ```
    {
      "type": "CARD",
      "token": "tok_test_35483_aff96d7F849aafa865840b96E55104dE",
      "customer_email": "pepito_perez@example.com",
      "rider_id": 1,
      "acceptance_token": "eyJhbGciOiJIUzI1NiJ9.eyJjb250cmFjdF9pZCI6MSwicGVybWFsaW5rIjoiaHR0cHM6Ly93b21waS5jby93cC1jb250ZW50L3VwbG9hZHMvMjAxOS8wOS9URVJNSU5PUy1ZLUNPTkRJQ0lPTkVTLURFLVVTTy1VU1VBUklPUy1XT01QSS5wZGYiLCJmaWxlX2hhc2giOiIzZGNkMGM5OGU3NGFhYjk3OTdjZmY3ODExNzMxZjc3YiIsImppdCI6IjE2NzY1MTg2NjUtODI0NDMiLCJleHAiOjE2NzY1MjIyNjV9.EAPuHDemn2GlmYNDXVS7jEbBnSxJqXommfZYXwzMpF4"
    }
  ```
  - Response 

  ```
  {
    "message": "Payment method added successfully",
    "paymentSource": {
        "date": "2023-02-15",
        "payment_source_id": 48942,
        "rider_id": 1,
        "id": 1
    }
  }
  ```

2. Create ride

  - url http://localhost:3000/api/rides/create
  - Method POST
  - Params

  ```
    {   
        "rider_id": 1,
        "lat": 3.531802,
        "lng": -76.299841
    }
  ```
  - Response 

  ```
  {
    "message": "Ride created successfully",
    "ride": {
        "date": "2023-02-15 22:39:06",
        "driver_id": 3,
        "rider_id": 1,
        "lat": 3.531802,
        "lng": -76.299841,
        "status": "in progress",
        "total": null,
        "id": 1
    }
  }
  ```
3. Finish ride

  - url http://localhost:3000/api/rides/finish_ride
  - Method POST
  - Params

  ```
    {
      "driver_id": 3,
      "rider_id": 1,
      "payment_source_id":8,
      "installments": 1,
      "lat": 3.517023,
      "lng": -76.299174
    }
  ```
  - Response 

  ```
  {
    "message": "Ride finished successfully"
  }
  ```