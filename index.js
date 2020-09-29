const inquirer = require("inquirer");
const { generateMarkdown, writeFile } = require("./utils/generateMarkdown.js");
//const generatePage = require("./src/readme-template");
const arg = process.argv[2];
const version = "0.0.1";

const promptUser = (readmeData) => {
        readmeData = [];

    console.log(`
    [ README Generator ]
  `);
    return inquirer
        .prompt([
            {
                type: "input",
                name: "authorName",
                message: "Enter your name:",
                validate: (name) => {
                    if (name) {
                        return true;
                    } else {
                        console.log("Enter your name!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "gitHub",
                message: "Enter your GitHub username:",
                validate: (username) => {
                    if (username) {
                        return true;
                    } else {
                        console.log("Enter your GitHub username!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "projectTitle",
                message: "Enter project title:",
                validate: (title) => {
                    if (title) {
                        return true;
                    } else {
                        console.log("Enter a title for the project!");
                        return false;
                    }
                },
            },
            {
                type: "confirm",
                name: "emojiyn",
                message: "Include emoji icon?",
                default: false,
            },
            {
                type: "input",
                name: "emoji",
                message: "Provide one emoji (:emoji-name:):",
                when: ({ emojiyn }) => emojiyn,
                validate: (emojiInput) => {
                    if (emojiInput) {
                        return true;
                    } else {
                        console.log("Enter an emoji for the project!");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "projectDescription",
                message: "Provide a description of the project:",
                validate: (titleInput) => {
                    if (titleInput) {
                        return true;
                    } else {
                        console.log("Enter a description for the project!");
                        return false;
                    }
                },
            },
            {
                type: "checkbox",
                name: "languages",
                message: "What did you build this project with? (Check all that apply)",
                choices: ["HTML", "CSS", "JavaScript", "ES6", "jQuery", "Express", "Bootstrap", "Node", "React", "Web3", "Solidity", "Bash", "Python", "AutoIt", "PowerShell"],
            },
            {
                type: "checkbox",
                name: "requirements",
                message: "Check any requirements or dependencies from the list:",
                choices: ["node", "npm", "react", "Ganache"],
            },
            {
                type: "confirm",
                name: "installation",
                message: "Include installation section?",
                default: false,
            },
            {
                type: "input",
                name: "installationInstructions",
                message: "Provide installation instructions:",
                when: ({ installation }) => installation,
            },
            {
                type: "confirm",
                name: "usage",
                message: "Include usage instructions?",
                default: false,
            },
            {
                type: "input",
                name: "usageInstructions",
                message: "Provide usage instructions:",
                when: ({ usage }) => usage,
            },
            {
                type: "confirm",
                name: "screenshot",
                message: "Include screenshot?",
                default: false,
            },
            {
                type: "input",
                name: "screenshotURL",
                message: "Provide media URL:",
                when: ({ screenshot }) => screenshot,
            },
            {
                type: "confirm",
                name: "screenshot2",
                message: "Would you like to enter another screenshot?",
                default: false,
                when: ({ screenshotURL }) => screenshotURL,
            },
            {
                type: "input",
                name: "screenshot2URL",
                message: "Provide screenshot #2's URL:",
                when: ({ screenshot2 }) => screenshot2,
            },
            {
                type: "input",
                name: "contact",
                message: "Provide contact e-mail address:",
                validate: (emailAddress) => {
                    if (emailAddress) {
                        return true;
                    } else {
                        console.log("Enter your e-mail address!");
                        return false;
                    }
                },
            },
            {
                type: "confirm",
                name: "tableofContents",
                message: "Include table of contents?",
                default: false,
            },
            {
                type: "confirm",
                name: "issues",
                message: "Include list of the projects issues?",
                default: false,
            },
            {
                type: "list",
                name: "numberIssues",
                message: "How many issues are closed?",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
                when: ({ issues }) => issues,
            },
        ])
};


// function to write README file
//function writeToFile(fileName, data) {
//}

// Initialize the App
function init() {
    promptUser()
    .then((readmeData) => {
        console.log(readmeData);
        return generateMarkdown(readmeData);
    })
    .then((markdown) => {
        console.log(markdown);
        //return writeFile(markdown);
    })
    .catch((err) => {
        console.log(err);
    });
}

init();

// App Wireframe

// Ask Order:
// Project Title
// Project Description
// Languages
// Requirements [Leave Blank to Exclude]
// Installation Instructions  [Leave Blank to Exclude]
// Usage Instructions [Leave Blank to Exclude]
// Screenshot Location [Leave Blank to Exclude]
// E-mail Address for Questions Section
// Table of Contents [Y/n]
// Issues [Y/n]

// Display Order:
// # Project Title
// > Project Description
// [x] Issues
// Table of Contents [Requirements, Installation, Usage, Screenshot(s), Questions (static), License (static) ]
// ### Requirements * Items
// Divider w/ Link to Webapp
// [tab] Usage Information
// Image(s) w/ Link to Webapp
// Questions Section w/ E-mail Address
// License