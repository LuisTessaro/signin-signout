module.exports = (req, res, next) => {
  const authorization = req.headers['authorization']

  if (!authorization)
    return res.status(400).send('Please provide an valid authorization header')

  try {
    const accessToken = authorization.split('Bearer ')[1]

    if (!accessToken)
      return res.status(400).send('Please provide an access-token')

    req.accessToken = accessToken

    next()
  } catch (e) {
    return res.status(400).send('Please provide an valid authorization header')
  }
}