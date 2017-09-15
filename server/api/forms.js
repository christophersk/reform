'use strict'

const express = require('express');
const router = express.Router();
const { Form, FormQuestion } = require('../db/models');

router.get('/', (req, res, next) => {
  Form.findAll()
    .then(forms => res.json(forms))
    .catch(next)
})

router.get('/:formId', (req, res, next) => {
  Form.findById(req.params.formId)
    .then(form => res.json(form))
    .catch(next)
})

router.put('/:formId', (req, res, next) => {
  Form.findById(req.params.formId)
    .then(form => {
      return form.update(req.body);
    })
    .then(form => form.save())
    .then(form => res.json(form))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Form.create(req.body)
    .then(form => res.json(form))
    .catch(next)
})

// get association table entries for the form
router.get('/:formId/formquestions', (req, res, next) => {
  FormQuestion.findAll({ where: { formId: req.params.formId }})
    .then(formquestions => res.json(formquestions))
    .catch(next);
})

// move up question in form order
router.put('/:formId/move/:questionId/up', (req, res, next) => {
  FormQuestion.findOne({ where: { formId: req.params.formId, questionId: req.params.questionId }})
    .then(formquestion => {
      return [formquestion, FormQuestion.findOne({ where: { order: formquestion.order - 1 }})]
    })
    .spread((formquestion, formquestionToSwap) => {
      formquestion.order = formquestion.order - 1;
      formquestionToSwap.order = formquestionToSwap.order + 1;
      formquestion.save();
      formquestionToSwap.save();
      return [formquestion, formquestionToSwap];
    })
    .then(formquestions => res.json(formquestions))
    .catch(next);
})

router.put('/:formId/move/:questionId/down', (req, res, next) => {
  FormQuestion.findOne({ where: { formId: req.params.formId, questionId: req.params.questionId }})
    .then(formquestion => {
      return [formquestion, FormQuestion.findOne({ where: { order: formquestion.order + 1 }})]
    })
    .spread((formquestion, formquestionToSwap) => {
      formquestion.order = formquestion.order + 1;
      formquestionToSwap.order = formquestionToSwap.order - 1;
      formquestion.save();
      formquestionToSwap.save();
      return [formquestion, formquestionToSwap];
    })
    .then(formquestions => res.json(formquestions))
    .catch(next);
})

module.exports = router;
