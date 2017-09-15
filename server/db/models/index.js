const Form = require('./form');
const Question = require('./question');
const FormQuestion = require('./formquestion')
const Entity = require('./entity');
const Answer = require('./answer');
const FilledForm = require('./filledform');
const FilledFormQuestion = require('./filledformquestion');

Question.belongsToMany(Form, { through: FormQuestion })
Form.belongsToMany(Question, { through: FormQuestion })

Question.belongsToMany(FilledForm, { through: FilledFormQuestion })
FilledForm.belongsToMany(Question, { through: FilledFormQuestion })

Answer.belongsTo(Question);
Question.hasMany(Answer);

FilledForm.belongsTo(Form);
Form.hasMany(FilledForm);

FilledForm.belongsTo(Entity);
Entity.hasMany(FilledForm);

Answer.belongsTo(FilledForm);
FilledForm.hasMany(Answer);

module.exports = {
  Form,
  Entity,
  Question,
  Answer,
  FormQuestion,
  FilledForm,
  FilledFormQuestion
}
