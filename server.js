const inquirer = require("inquirer");
const mysql2 = require("mysql2"); 
const console = require("console");

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
            break;

        //View all roles.
        case dbActions[1]:
            console.log("Choice 1 selected.")
            break;

        //View all employees.
        case dbActions[2]:
            console.log("Choice 2 selected.")
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

getInput();