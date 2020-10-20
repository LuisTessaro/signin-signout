const express = require('express'),
  router = express.Router()

const authorizationMiddleware = require('../../middlewares/authorizationMiddleware')

const { create } = require('./create')
const { getById } = require('./read')

router.get('/:id', authorizationMiddleware, getById)

router.post('/', create)

const D = require('../../models/User')

router.delete('/', async (req, res) => {
  await D.deleteMany()
  res.send('ok')
})

module.exports = router