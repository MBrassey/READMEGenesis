const fs = require("fs");

// Generate Markdown for README
function generateMarkdown(projectData) {
  return `
## ${projectData.projectTitle} ${projectData.emoji}

${projectData.projectDescription}

#### Closed Issues

- [x] [Wireframe App & Capture User Input](https://github.com/${projectData.gitHub}/${projectData.projectTitle}/issues/1)
- [x] [Generate the README file](https://github.com/${projectData.gitHub}/${projectData.projectTitle}/issues/2)
- [x] [Prompt user for more input](https://github.com/${projectData.gitHub}/${projectData.projectTitle}/issues/3)
- [x] [Modify the HTML template to handle more data](https://github.com/${projectData.gitHub}/${projectData.projectTitle}/issues/4)
- [x] [Generate entire README](https://github.com/${projectData.gitHub}/${projectData.projectTitle}/issues/5)
- [x] [Finishing Touches](https://github.com/${projectData.gitHub}/${projectData.projectTitle}/issues/6)

#### Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshot(s)](#screenshots)
* [Questions](#questions)
* [License](#license)

#### Requirements

    ${projectData.requirements}

#### Installation

    ${projectData.installationInstructions}

<h6><p align="right">:cyclone: Click the image(s) below to view the live <a href="https://${projectData.gitHub}.github.io/${projectData.projectTitle}/">webapplication</a></p></h6>

    ${projectData.usageInstructions}

[<p align="center"><img src="src/img/Preview.png">](https://${projectData.gitHub}.github.io/${projectData.projectTitle}/)

#### Questions
Contact me at [${projectData.contact}](mailto:${projectData.contact}) with any questions or comments. 

---

<h4><p align="center">Published under the ${projectData.license} :balance_scale: ${projectData.authorName}</h4>

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
