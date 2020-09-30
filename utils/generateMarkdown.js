const fs = require("fs");
const { title } = require("process");

const variableUsage = usageInstructions => {
  if (!usageInstructions) {
    return '';
  }
return `
    ${usageInstructions}
`
}

const variableInstallation = installationInstructions => {
  if (!installationInstructions) {
    return '';
  }
return `
#### Installation

    ${installationInstructions}
`
}

const variableRequirements = requirements => {
  if (!requirements) {
    return '';
  }
return `
#### Requirements

    ${requirements}
`
}

const variableToc = tOc => {
  if (!tOc) {
    return '';
  }
return `
#### Table of Contents

* [variableRequirements](#variableRequirements)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshot(s)](#screenshots)
* [Questions](#questions)
* [License](#license)
`
}

const variableIssues = issues => {
  if (!issues) {
    return '';
  }
return `
#### Closed Issues

- [x] [Wireframe App & Capture User Input](https://github.com/username/title/issues/1)
- [x] [Generate the README file](https://github.com/username/title/issues/2)
- [x] [Prompt user for more input](https://github.com/username/title/issues/3)
- [x] [Modify the HTML template to handle more data](https://github.com/username/title/issues/4)
- [x] [Generate entire README](https://github.com/username/title/issues/5)
- [x] [Finishing Touches](https://github.com/username/title/issues/6)
`
}

// Generate Markdown for README
function generateMarkdown(data) {
return `
## ${data.title}

${data.description}

![licensebadge](https://img.shields.io/badge/license-${data.license}-blue)

${variableIssues(data.issues)}

${variableToc(data.tOc)}

${variableRequirements(data.requirements)}

${variableInstallation(data.installationInstructions)}
<h6><p align="right">:cyclone: Click the image(s) below to view the live <a href="https://${data.gitHub}.github.io/${data.title}/">webapplication</a></p></h6>
${variableUsage(data.usageInstructions)}

#### Questions
Contact me at [${data.contact}](mailto:${data.contact}) with any questions or comments. 
`;
}

// Write the File to Disk
const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
      fs.writeFile("./dist/README.md", fileContent, (err) => {
          // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
          if (err) {
              reject(err);
              // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
              return;
          }

          // if everything went well, resolve the Promise and send the successful data to the `.then()` method
          resolve({
              ok: true,
              message: "README created!",
          });
      });
  });
};

module.exports = { generateMarkdown, writeFile };
