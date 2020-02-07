#!/usr/bin/env node
"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.bold.green;
var response2 = chalk.bold.red;

var resume = require("./resume.json");

var resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: response("        What do you want to know about me?        "),
  choices: [...Object.keys(resume), "Exit"]
};

function main() {
  console.log(response("------------------------------------------------------------"));  
  console.log("                 Hello, My name is Hiram Zamorano!                 ");
  console.log(response("------------------------------------------------------------"));  
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Exit") {
      return;
    }
    var option = answer.resumeOptions;
    console.log(response("---------------------------------------------------------------"));
    resume[`${option}`].forEach(info => {
      console.log("|   => " + info);
    });
    console.log(response("---------------------------------------------------------------"));
    
    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: response2("Go back or Exit?"),
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          resumeHandler();
        } else {
          return;
        }
      });
  });
}

main();