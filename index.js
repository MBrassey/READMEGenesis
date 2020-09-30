const inquirer = require("inquirer");
const { generateMarkdown, writeFile } = require("./utils/generateMarkdown");
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
                name: "title",
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
                type: "input",
                name: "description",
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
                message: "Provide installation instructions ( , for new line ):",
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
                message: "Provide usage instructions ( , for new line ):",
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
                name: "screenshotURL1",
                message: "Provide media URL:",
                when: ({ screenshot }) => screenshot,
            },
            {
                type: "confirm",
                name: "screenshot2",
                message: "Would you like to enter another screenshot?",
                default: false,
                when: ({ screenshotURL1 }) => screenshotURL1,
            },
            {
                type: "input",
                name: "screenshotURL2",
                message: "Provide media URL:",
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
                name: "tOc",
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
                type: "input",
                name: "issueTitles",
                message: "Enter issue names ( separated by , ):",
                when: ({ issues }) => issues,
            },
            {
                type: "list",
                name: "license",
                message: "Under which license are you publishing the project?",
                choices: ["Apache2.0", "GPLv3.0", "MIT", "BSD2", "BSD3", "Boost", "CreativeCommons", "Eclipse2.0", "AGPL", "GPLv2.0", "LGPLv2.1", "Mozilla2.0", "TheUnlicense"],
            }
        ])
};


// Display Argument Data
if (arg === "-h") {
    console.log(`
    Usage: node index.js [ -h | -v | -l | -a ]

    [options]

    -h          Display this message.
    -v          Show version.
    -l          Show license info.
    -a          What is READMEGenesis?
`);} else if (arg === "-v") {
    console.log("READMEGenesis Version: " + version);
} else if (arg === "-l") {
    console.log("Licensed under the GNU General Public License v3.0");
} else if (arg === "-a") {
    console.log("Menu driven command line utility written in Node.js to generate a professional README for new projects.");
} else {
// Initialize the App
function init() {
    promptUser()
    .then((readmeData) => {
        console.log(readmeData);
        return generateMarkdown(readmeData);
    })
    .then((markdown) => {
        //console.log(markdown);
        return writeFile(markdown);
    })
    .catch((err) => {
        console.log(err);
    });
}

init();
}