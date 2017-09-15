'use strict'

const express = require('express');
const router = express.Router();
const { FilledForm, Form, FormQuestion, FilledFormQuestion, Question, Answer } = require('../db/models');

router.get('/:filledformId', (req, res, next) => {
  FilledForm.findById(req.params.filledformId)
    .then(filledform => res.json(filledform))
    .catch(next)
})

// get filled forms by entity id
router.get('/byentity/:entityId', (req, res, next) => {
  FilledForm.findAll({ where: { entityId: req.params.entityId }})
    .then(filledforms => res.json(filledforms))
    .catch(next)
})

router.get('/:filledformId/answers', (req, res, next) => {
  Answer.findAll({ where: { filledformId: req.params.filledformId }})
    .then(answers => res.json(answers))
    .catch(next)
})

// get association table entries for the filled form
router.get('/:filledformId/filledformquestions', (req, res, next) => {
  FilledFormQuestion.findAll({ where: { filledformId: req.params.filledformId }})
    .then(filledformquestions => res.json(filledformquestions))
    .catch(next);
})

// create new filledForm and create associations between filledForm and questions
router.post('/', (req, res, next) => {
  FilledForm.create(req.body)
    .then(filledform => {
      return FormQuestion.findAll({ where: { formId: req.body.formId }})
        .then(formquestions => {
          console.log('found formquestions are', formquestions)
          Promise.all(formquestions.map(formquestion =>
            FilledFormQuestion.create({ filledformId: filledform.id, questionId: formquestion.questionId, order: formquestion.order})
          ))
        })
        .then(() => filledform)
    })
    .then(filledform => res.json(filledform))
    .catch(next);
})

// save all answers on a filled form
router.put('/:filledformId', (req, res, next) => {
  const answers = req.body.answers;
  Promise.all(answers.map(answer =>
    Answer.findOrBuild({ where: { questionId: answer.questionId, filledformId: req.params.filledformId }})
  ))
  .then(answerInstances => {
    answerInstances.forEach((answerInstance, index) => {
      answerInstance[0].content = answers[index].content;
      answerInstance[0].save();
    })
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

module.exports = router;
