const fs = require("fs");

const variableScreenshot1 = data => {
  if (!data.screenshotURL1) {
    return '';
  }
return `
[<p align="center"><img src="${data.screenshotURL1}">](https://${data.gitHub}.github.io/${data.title}/)
`
}

const variableScreenshot2 = data => {
  if (!data.screenshotURL2) {
    return '';
  }
return `
[<p align="center"><img src="${data.screenshotURL2}">](https://${data.gitHub}.github.io/${data.title}/)
`
}

const variableUsage = usageInstructions => {
  if (!usageInstructions) {
    return '';
  }
return `
#### Usage

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

* [Requirements](#Requirements)
* [Installation](#Installation)
* [Usage](#Usage)
* [Screenshot(s)](#Screenshots)
* [Questions](#Questions)
`
}

const variableIssues = data => {
  if (!data.issueTitles) {
    return '';
  }
  var str = data.issueTitles;
  var issue = str.split(',');
  var issueLines = [];
  for (var i = 1; i < issue.length; i++) {
issueLines.push("- [x] ["+ issue[i] +"](https://github.com/"+ data.gitHub +"/"+ data.title +"/issues/"+ i);
  }
  var str2 = issueLines + '';
  var presentIssues = str2.split(",").join("\n");

return `
#### Issues

${presentIssues}

`
}

// Generate Markdown for README
function generateMarkdown(data) {
return `
## ${data.title}

${data.description}

![licensebadge](https://img.shields.io/badge/license-${data.license}-blue)

${variableIssues(data)}

${variableToc(data.tOc)}

${variableRequirements(data.requirements)}

${variableInstallation(data.installationInstructions)}

${variableUsage(data.usageInstructions)}

<h6><p align="right">:cyclone: Click the image(s) below to view the live <a href="https://${data.gitHub}.github.io/${data.title}/">webapplication</a></p></h6>

${variableScreenshot1(data)}

${variableScreenshot2(data)}

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
