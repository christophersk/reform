const { Form, Question, FormQuestion, Entity } = require('./server/db/models');
const db = require('./server/db');

const forms = [
  { name: 'Captain\'s Survey' },
  { name: 'Doctor\'s Survey' }
]

const questions = [
  { content: 'How many roads must a man walk down?', type: 'text' },
  { content: 'What is the meaning of life?', type: 'text' },
  { content: 'Why is the sky blue?', type: 'text' },
  { content: 'Who is your favorite captain?', type: 'text' },
  { content: 'Are you a leaf on the wind?', type: 'text' },
  { content: 'Am I talking to Miranda now?', type: 'text' },
]

const formquestions = [
  { formId: 1, questionId: 1, order: 1},
  { formId: 1, questionId: 2, order: 2},
  { formId: 1, questionId: 3, order: 3},
  { formId: 1, questionId: 4, order: 4},
  { formId: 2, questionId: 4, order: 1},
  { formId: 2, questionId: 5, order: 2},
  { formId: 2, questionId: 6, order: 3},
]

const entities = [
  { entityType: 1, name: 'Mal Reynolds'},
  { entityType: 1, name: 'Zoe Washburne'},
  { entityType: 1, name: 'Wash Washburne'},
  { entityType: 1, name: 'Inara Serra'},
  { entityType: 1, name: 'Jayne Cobb'},
  { entityType: 1, name: 'Keylee Frye'},
  { entityType: 1, name: 'Simon Tam'},
  { entityType: 1, name: 'River Tam'},
  { entityType: 1, name: 'Derrial Book'},
]

const seed = () => {
  Promise.all(forms.map(form =>
    Form.create(form)
  ))
  .then(() => console.log('forms created'))
  .then(() =>
  Promise.all(questions.map(question =>
    Question.create(question)
  )))
  .then(() => console.log('questions created'))
  .then(() =>
  Promise.all(entities.map(entity =>
    Entity.create(entity)
  )))
  .then(() => console.log('entities created'))
  .then(() =>
  Promise.all(formquestions.map(formquestion =>
    FormQuestion.create(formquestion)
  )))
  .then(() => console.log('form-question associations created'))
}

const main = () => {
  console.log('syncing db');
  db.sync({force: true})
    .then(() => {
      return seed();
    })
    .then(() => {
      // db.close();
    })
    .catch(console.error)
}

main();

module.exports = main;
