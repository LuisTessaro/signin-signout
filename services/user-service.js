const moment = require('moment')
const User = require('../models/User')
const signJwt = require('../utils/sign-jwt')

const create = async user => {
  try {
    const _user = new User(user)

    const token = signJwt({ email: user.email }, 1800000)
    _user.token = token

    const savedUser = await _user.save()

    return {
      message: 'User criado',
      data: savedUser,
      status: 201,
    }
  } catch (err) {
    if (err.code === 11000)
      return {
        message: 'Email já existente',
        status: 422
      }

    if (Object.keys(err.errors).length > 0)
      return {
        message: err,
        status: 400
      }

    return {
      message: 'Server Error ' + err,
      status: 500,
    }
  }
}

const getById = async (id, token) => {
  try {
    const _user = await User.findById(id)

    if (!_user)
      return {
        message: 'Usuário não encontrado',
        status: 404
      }

    if (_user.token !== token)
      return {
        message: 'Token inválido',
        status: 401
      }

    const halfAnHourAgo = moment().subtract(30, 'minutes').toDate().getTime();

    if (moment(_user.lastLogin) < halfAnHourAgo)
      return {
        message: 'Sessão inválida',
        status: 401
      }

    return {
      message: 'User Found',
      data: _user,
      status: 200,
    }

  } catch (err) {
    if (err.kind === 'ObjectId')
      return {
        message: 'Invalid mongodb id',
        status: 400,
      }

    return {
      message: 'Server Error ' + err,
      status: 500,
    }
  }
}

module.exports = {
  create,
  getById,
}