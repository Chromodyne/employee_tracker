//Imports
const inquirer = require("inquirer");
const mysql = require("mysql2");
const console = require("console");
const util = require("util");

//Create the connection from mysql2 to the database.
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "2zQTR33vX!",
    database: "employees_db"
};

const connection = mysql.createConnection(dbConfig);

//Promisify queries so that it's completed prior to later logic.
const query = util.promisify(connection.query).bind(connection);

//This array contains the list of choices the user can choose to perform on the database.
const dbActions = [
    "View all departments.",
    "View all roles.",
    "View all employees",
    "Add a department.",
    "Add a role.",
    "Add an employee.",
    "Update an employee role."
];

//Gets user input for database actions.
function getInput() {
    inquirer.prompt([
        {
            type: "list",
            message: "Please choose an action.",
            choices: dbActions,
            name: "action"
        }
    ]).then((response) => {
        performActions(response);
    })
}

//This function determines the functions to invoke based on the user's choice of action.
function performActions(choice) {

    switch(choice.action) {

        //View all departments.
        case dbActions[0]:
            console.log("Departments:")
            queryDepartments();
            break;

        //View all roles.
        case dbActions[1]:
            console.log("Roles:")
            queryRoles();
            break;

        //View all employees.
        case dbActions[2]:
            console.log("Employees:");
            queryEmployees();
            break;

        //Add a department.
        case dbActions[3]:
            addDepartment();
            break;

        //Add a role.
        case dbActions[4]:
            addRole();
            break;
        
        //Add an employee.
        case dbActions[5]:
            addEmployee();
            break;
        
        //Update an employee role.
        case dbActions[6]:
            updateRole();
            break;

        default:
            console.error("Invalid case detected for action.");
            break;
    }
}

//Queries the department table to display it. Promisified to make sure table displays before getting input.
async function queryDepartments() {
    try {
        let rows = await query("SELECT * FROM department");
        console.table(rows);
    } finally {
        getInput();
    }
}

//Queries the role table to display it. Promisified to make sure table displays before getting input.
async function queryRoles() {
    try {
        let rows = await query("SELECT * FROM role");
        console.table(rows);
    } finally {
        getInput();
    }
}

//Queries the employee table and display it. Promisified to make sure table displays before getting input.
async function queryEmployees() {
    try {
        let rows = await query("SELECT * FROM employee");
        console.table(rows);
    } finally {
        getInput();
    }
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name: "department"
        }
    ]).then((response) => {

        console.log("Insertion procedure started.");
        connection.query("INSERT INTO department (name) VALUES (?)", [response.department]);
        console.log("Insertion procedure completed.");
        getInput();

    })
}

//This function is called to add new roles.
function addRole() {

    //First get user input and store it.
    inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary"
        },
        {
            type: "list",
            message: "What department is this role considered under?",
            choices: ["Sales", "Support", "Human Resources", "Financial"],
            name: "department"
        }
    ]).then( (response) => {
        //TODO: Put in logic for changing text for role into a number.

        connection.query("INSERT INTO role(title, salary, department_id) VALUES (?,?,?)", [response.title, response.salary, response.department]);
        connection.
        console.log("Role added successfully.");
        getInput();
    }
    );

}

function addEmployee() {

    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last"
        },
        {
            type: "input",
            message: "What is the employee's role?",
            name: "role_id"
        },
        {
            type: "input",
            message: "Who is the employee's manager? (Use ID. Null if none.)",
            name: "manager"
        }

    ]).then((response) => {
        //TODO: Logic goes here.
        connection.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [response.first_name, response.last_name, response.role_id, response.manager]);
        console.log("Employee added successfully.");
    })

}

function updateRole() {

    inquirer.prompt([
        {
            type: "input",
            message: "Which employee would you like to update?",
            name: "employee"
        },
        {
            type: "input",
            message: "What is their new role?",
            name: "newRole"
        }
    ]).then((response) => {
        //TODO: LOGIC GOES HERE.
    })

}

//Get user input on run.
getInput();

