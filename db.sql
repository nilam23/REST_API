CREATE DATABASE rest_api;
USE rest_api;

CREATE TABLE courses(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    code VARCHAR(5) UNIQUE NOT NULL
);

INSERT INTO courses(name, code) VALUES('course 01', 'c01'), ('course 02', 'c02'), ('course 03', 'c03');