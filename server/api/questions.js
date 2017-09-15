'use strict'

const express = require('express');
const router = express.Router();
const { Question } = require('../db/models');
const { Form, FormQuestion, FilledForm, FilledFormQuestion } = require('../db/models');

router.get('/', (req, res, next) => {
  Question.findAll()
    .then(questions => res.json(questions))
    .catch(next);
})

router.get('/:entityId', (req, res, next) => {
  FilledForm.findAll({ where: { entityId: req.params.entityId }})
  .then(filledforms => {
    return Promise.all(filledforms.map(filledform =>
      filledform.getQuestions()
    ))
  })
  .then(questionArrays => {
    return questionArrays.reduce((acc, val) => {
      return acc.concat(val)
    }, [])
  })
  .then(questionsArray => {
    const questionIdObj = {};
    return questionsArray.filter(question => {
      if (!questionIdObj[question.id]) {
        questionIdObj[question.id] = true;
        return true;
      } else {
        return false;
      }
    }).sort((a, b) => a.id - b.id)
  })
  .then(questionsArray => {
    console.log(questionsArray);
    res.json(questionsArray);
  })
  .catch(next)
})

// get association table entries for the question
router.get('/:questionId/formquestions', (req, res, next) => {
  FormQuestion.findAll({ where: { questionId: req.params.formId }})
    .then(formquestions => res.json(formquestions))
    .catch(next);
})

router.post('/', (req, res, next) => {
  Question.create(req.body)
    .then(question => [question, Form.findById(req.body.formId)])
    .spread((question, form) => {
      question.addForm(form, { through: { order: req.body.order }});
      return question.id;
    })
    .then(questionId => {
      return Question.findById(questionId, {
        include: [{
          model: Form,
          through: {
            attributes: ['order']
          }
        }]
      });
    })
    // .spread((question, formquestion) => {
    //   console.log('question is', question);
    //   console.log('formquestion is', formquestion);
    //   // question.stringify()
    //   return formquestion
    // })
    .then(question => res.json(question))
    .catch(next)
})

// get all questions for a form by formId
router.get('/form/:formId', (req, res, next) =>{
  Form.findById(req.params.formId)
    .then(form => form.getQuestions())
    .then(questions => res.json(questions))
    .catch(next)
})

// Get all questions for a filledForm by filledFormId
router.get('/filledform/:filledformId', (req, res, next) =>{
  FilledForm.findById(req.params.filledformId)
    .then(filledform => filledform.getQuestions())
    .then(questions => res.json(questions))
    .catch(next)
})

module.exports = router;
