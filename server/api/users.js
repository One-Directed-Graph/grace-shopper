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

router.get('/user-list', async (req, res, next) => {
  console.log('getting user list for admin')
  try {
    const users = await User.findAll({
      where: {admin: false},
      attributes: ['id', 'email', 'admin'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
