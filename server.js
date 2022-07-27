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
            break;

        //Add a role.
        case dbActions[4]:
            console.log("Choice 4 selected.")
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

//Queries the department table to display it.
//TODO: Make these return user control after displaying the table.
function queryDepartments() {
    connection.query( "SELECT * FROM department", (err, results, fields) => {
        console.table(results);
    });
}

//Queries the role table to display it.
function queryRoles() {
    connection.query("SELECT * FROM role", (err, results, fields) => {
        console.table(results);
    })
}

function queryEmployees() {
    connection.query("SELECT * FROM employee", (err, results, fields) => {
        console.table(results);
    })
}


getInput();