const fs = require("fs");

const tableofContents = tOc => {
    if (!tOc) {
      return '';
    }
return `
#### Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshot(s)](#screenshots)
* [Questions](#questions)
* [License](#license)
`
}

const closedIssues = issues => {
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
## ${data.title} ![licensebadge](https://img.shields.io/badge/license-${data.license}-blue)
    
${data.description}

${closedIssues(data.issues)}

${tableofContents(data.tOc)}

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
