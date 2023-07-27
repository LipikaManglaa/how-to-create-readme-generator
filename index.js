const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdownPage = require("./develop/generateMarkdown.js");
const { resolve } = require('dns/promises');


//create prompt question for user to create reamdme file
const promptQuestions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of your repository?',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Please enter some information about your project:',
            validate: aboutInput => {
                if (aboutInput) {
                    return true;
                } else {
                    console.log('Please enter some information!')
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmInstall',
            message: 'Does your project need special instructions on how to install?',
            default: true
        },
        {
            type: 'input',
            name: 'install',
            message: 'Enter your installation instructions:',
            when: ({ confirmInstall }) => {
                if (confirmInstall) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please explain the usage of this project:',
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            choices: ['MIT', 'GNU', 'Apache', 'BSD', 'ISC']
        },
        {
            type: 'confirm',
            name: 'confirmContribute',
            message: 'Will your project be open to contributions?',
            default: true
        },
        {
            type: 'input',
            name: 'contribution',
            message: 'Please explain your contribution guidlines for this project:',
            when: ({ confirmContribute }) => {
                if (confirmContribute) {
                    return true
                } else {
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmTest',
            message: 'Will your project need testing instructions?',
            default: true
        },
        {
            type: 'input',
            name: 'testing',
            message: 'Please input testing instructions for the user:',
            when: ({ confirmTest }) => {
                if (confirmTest) {
                    return true;
                } else {
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'githubUsername',
            message: 'What is your GitHub username?',
            validate: gitInput => {
                if (gitInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'gitLink',
            message: 'Please enter your GitHub Profile Link:',
            validate: gitLinkInput => {
                if (gitLinkInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Link!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter your email adress for people to contact you:',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter your email adress!');
                    return false;
                }
            }
        }

    ])
        .then(data => {
            return generateMarkdownPage(data);
        }) 
       
        .then(fileCreateContent => {
            return new Promise((resolve, reject) => {
                fs.writeFile('./output/README.md', fileCreateContent, err => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({
                        ok: true,
                        message: 'File sucessfully Created!'
                    });
                });

            })
        })
        .catch(err => {
            console.log(err);
        })
}





function init() {
    promptQuestions()
}
init()