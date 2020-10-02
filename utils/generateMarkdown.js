const fs = require("fs");
const licenseDetail = license => {
  if (license === "Apache2.0") {
    return '> A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.';
  } else if (license === "GPLv3.0") {
    return '> Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.';
  } else if (license === "MIT") {
    return '> A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.';
  } else if (license === "BSD2") {
    return '> A permissive license that comes in two variants, the BSD 2-Clause and BSD 3-Clause. Both have very minute differences to the MIT license.';
  } else if (license === "BSD3") {
    return '> A permissive license similar to the BSD 2-Clause License, but with a 3rd clause that prohibits others from using the name of the project or its contributors to promote derived products without written consent.';
  } else if (license === "Boost") {
    return '> A simple permissive license only requiring preservation of copyright and license notices for source (and not binary) distribution. Licensed works, modifications, and larger works may be distributed under different terms and without source code.';
  } else if (license === "CC0-1.0-Universal") {
    return '> The Creative Commons CC0 Public Domain Dedication waives copyright interest in a work you,ve created and dedicates it to the world-wide public domain. Use CC0 to opt out of copyright entirely and ensure your work has the widest reach. As with the Unlicense and typical software licenses, CC0 disclaims warranties. CC0 is very similar to the Unlicense.';
  } else if (license === "Eclipse2.0") {
    return '> This commercially-friendly copyleft license provides the ability to commercially license binaries; a modern royalty-free patent license grant; and the ability for linked works to use other licenses, including commercial ones.';
  } else if (license === "AGPL") {
    return '> Permissions of this strongest copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. When a modified version is used to provide a service over a network, the complete source code of the modified version must be made available.';
  } else if (license === "GPLv2.0") {
    return '> The GNU GPL is the most widely used free software license and has a strong copyleft requirement. When distributing derived works, the source code of the work must be made available under the same license. There are multiple variants of the GNU GPL, each with different requirements.';
  } else if (license === "LGPLv2.1") {
    return '> Primarily used for software libraries, the GNU LGPL requires that derived works be licensed under the same license, but works that only link to it do not fall under this restriction. There are two commonly used versions of the GNU LGPL.';
  } else if (license === "Mozilla2.0") {
    return '> Permissions of this weak copyleft license are conditioned on making available source code of licensed files and modifications of those files under the same license (or in certain cases, one of the GNU licenses). Copyright and license notices must be preserved. Contributors provide an express grant of patent rights. However, a larger work using the licensed work may be distributed under different terms and without source code for files added in the larger work.';
  } else if (license === "TheUnlicense") {
    return '> A license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms and without source code.';
  }
return `
    No License. . .
`
}

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
  var str5 = usageInstructions + '';
  var presentUsageInstructions = str5.split(",").join("\n"+"    ");
return `
#### Usage

    ${presentUsageInstructions}
`
}

const variableInstallation = installationInstructions => {
  if (!installationInstructions) {
    return '';
  }
  var str4 = installationInstructions + '';
  var presentInstallationInstructions = str4.split(",").join("\n"+"    ");
return `
#### Installation

    ${presentInstallationInstructions}
`
}

const variableRequirements = requirements => {
  if (!requirements) {
    return '';
  }
  var str3 = requirements + '';
  var presentRequirements = str3.split(",").join("\n"+"    ");

return `
#### Requirements

    ${presentRequirements}
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
* [License](#License)
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
issueLines.push("- [x] ["+ issue[i] +"](https://github.com/"+ data.gitHub +"/"+ data.title +"/issues/"+ i +")");
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

<h6><p align="right">:cyclone: Click the image(s) below to view the live <a  id="Screenshots" href="https://${data.gitHub}.github.io/${data.title}/">webapplication</a></p></h6>

${variableScreenshot1(data)}

${variableScreenshot2(data)}

#### Questions
Contact me at [${data.contact}](mailto:${data.contact}) with any questions or comments. 

#### License
${data.title} is published under the __${data.license}__ license.

${licenseDetail(data.license)}
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
