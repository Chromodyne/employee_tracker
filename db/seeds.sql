INSERT INTO department(id, name)
VALUES  (001, "Sales"),
        (002, "Support"),
        (003, "Human Resources"),
        (004, "Financial");

INSERT INTO role (id, title, salary, department_id)
VALUES  (001, "Executive", 80000, 001),
        (002, "Salesperson", 40000, 001),
        (003, "Support Lead", 60000, 002),
        (004, "Technician", 50000, 002),
        (005, "HR Lead", 50000, 003),
        (006, "HR Tech", 40000, 003),
        (007, "CFO", 95000, 004),
        (008, "Comptroller",  80000, 004)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (001, "Michael", "Ginsberg", 001, null),
        (002, "Kaitlyn", "Moroe", 002, 001),
        (003, "James", "Schmidt", 003, 001),
        (004, "Ricky", "Bobby", 004, 003),
        