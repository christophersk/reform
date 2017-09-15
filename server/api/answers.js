'use strict'

const express = require('express');
const router = express.Router();
const { Answer, FilledForm } = require('../db/models');

router.get('/:entityId', (req, res, next) => {
  FilledForm.findAll({ where: { entityId: req.params.entityId }})
    .then(filledforms => {
      return Promise.all(filledforms.map(filledform =>
        filledform.getAnswers()
      ))
    })
    .then(answerArrays => {
      return answerArrays.reduce((acc, val) => {
        return acc.concat(val)
      }, []).sort((a, b) => b.updatedAt - a.updatedAt)
    })
    .then(answersArray => {
      const questionIdObj = {};
      return answersArray.filter(answer => {
        if (!questionIdObj[answer.questionId]) {
          questionIdObj[answer.questionId] = true;
          return true;
        } else {
          return false;
        }
      }).sort((a, b) => a.questionId - b.questionId)
    })
    .then(answersArray => {
      console.log(answersArray);
      res.json(answersArray);
    })
    .catch(next)
})

module.exports = router;
