const express = require('express'),
  router = express.Router()
  
const auth = require('./auth/auth-handler')
const user = require('./user/user-handler')

router.use('/api/auth', auth)
router.use('/api/user', user)

router.use('*', (req, res) => {
  res.status(404).json({
    message: 'Resource not found'
  })
})

module.exports = router