const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log('nmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmn')
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/home/user-list', async (req, res, next) => {
  console.log('getting user list for admin')
  try {
    const user = User.findByPk(req.body.id)
    if (user.admin) {
      const users = await User.findAll()
      res.json(users)
    } else {
      throw Error('Unauthorized')
    }
  } catch (err) {
    err.status(401)
    next(err)
  }
})
