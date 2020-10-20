const express = require('express'),
  router = express.Router()

const authorizationMiddleware = require('../../middlewares/authorizationMiddleware')

const { create } = require('./create')
const { getById } = require('./read')

router.get('/:id', authorizationMiddleware, getById)

router.post('/', create)

module.exports = router