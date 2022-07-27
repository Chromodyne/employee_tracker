//Imports
const inquirer = require("inquirer");
const mysql = require("mysql2");
const console = require("console");
const util = require("util");
const { connect } = require("http2");

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

const dbActions = [
    "View all departments.",
    "View all roles.",
    "View all employees",
    "Add a department.",
    "Add a role.",
    "Add an employee.",
    "Update an employee role."
];

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

//TODO: This function will begin the logic based on the choice the user made.
function performActions(choice) {

    switch(choice.action) {

        //View all departments.
        case dbActions[0]:
            console.log("Choice 0 selected.")
            queryDepartments();
            break;

        //View all roles.
        case dbActions[1]:
            console.log("Choice 1 selected.")
            queryRoles();
            break;

        //View all employees.
        case dbActions[2]:
            console.log("Choice 2 selected.");
            queryEmployees();
            break;

        //Add a department.
        case dbActions[3]:
            console.log("Choice 3 selected.")
            addDepartment();
            break;

        //Add a role.
        case dbActions[4]:
            console.log("Choice 4 selected.")
            addRole();
            break;
        
        //Add an employee.
        case dbActions[5]:
            console.log("Choice 5 selected.")
            break;
        
        //Update an employee role.
        case dbActions[6]:
            console.log("Choice 6 selected.")
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
        
    })
}

//This function is called to add new roles.
function addRole() {

    //First get user input and store it.
    inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name: "role"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salary"
        },
        {
            type: "input",
            message: "What department is this role considered under?",
            name: "department"
        }
    ]).then(
        connection.query("INSERT INTO role(id, title, salary, department_id) VALUES")
    );

}

function insertData(response) {
    console.log("Insertion procedure started.");
    console.log("Insertion procedure completed.")
}

//Get user input on run.
getInput();