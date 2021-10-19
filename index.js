const inquirer = require("inquirer");

const render = require("./lib/htmlrenderer");
const questions = require("./lib/questions")

const Manager = require("./lib/constructors/Manager");
const Engineer = require("./lib/constructors/Engineer");
const Intern = require("./lib/constructors/Intern");

const teamMembers = [];

async function init() {

  
  const response = await inquirer.prompt(questions.managerQuestions)
  const manager = new Manager(response.name, response.id, response.email, response.office)
  teamMembers.push(manager);
  console.log(teamMembers)

  let newPerson = true;


  while (newPerson) {
    const member = await inquirer.prompt(questions.addPeople)
    console.log(member)

    
    if (member.addmore === "Engineer") {

      const res = await inquirer.prompt(questions.engineerQuestions)
      const engineer = new Engineer(res.name, res.id, res.email, res.github);
      teamMembers.push(engineer);
    }

    
    else if (member.addmore === "Intern") {

      const res = await inquirer.prompt(questions.internQuestions);
      const intern = new Intern(res.name, res.id, res.email, res.school);
      teamMembers.push(intern);
    }

    
    else {
      newPerson = !newPerson
      render(teamMembers)

    }

  }


}



init();