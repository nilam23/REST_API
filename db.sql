CREATE DATABASE rest_api;
USE rest_api;

CREATE TABLE courses(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

INSERT INTO courses(name) VALUES('course 01'), ('course 02'), ('course 03');