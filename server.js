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

}

getInput();