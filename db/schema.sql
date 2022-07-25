DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department {
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
}; 

CREATE TABLE role {
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES (department(id))
    ON DELETE SET NULL
};

CREATE TABLE employee {
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES(role(id))
    ON DELETE SET NULL,
    -- TODO: Add mapping to the id above.
    manager_id INT
};