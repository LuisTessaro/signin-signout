const User = require('../models/User')

const auth = async (email, password) => {
  try {
    const user = await User.findOne({ email: email })

    if (!user)
      return {
        message: 'Usuário e/ou senha inválidos',
        status: 401
      }

    const resp = await user.validatePassword(password)

    if (!resp)
      return {
        message: 'Usuário e/ou senha inválidos',
        status: 401
      }

    user.last_login = Date.now()
    await user.save()

    return {
      message: 'Autenticado com sucesso',
      data: user,
      status: 200
    }

  } catch (e) {
    return e
  }
}

module.exports = {
  auth
}
