const express = require('express')
const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.use(express.json())

router.get('/', async (req, res, next) => {
  console.log('nmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmnmn')
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

router.get('/user-list', (req, res, next) => {
  console.log('getting user list for admin')
  User.findAll({
    where: {admin: false},
    attributes: ['id', 'email', 'admin', 'pwReset'],
  })
    .then((users) => res.send(users))
    .catch(next)
})

router.post('/user-list', (req, res, next) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch(next)
})

router.put('/user-list', (req, res, next) => {
  const {change} = req.body
  User.findByPk(req.body.id)
    .then((user) => user.update(change))
    .then((user) => res.send(user))
})

router.delete('/user-list/:id', async (req, res, next) => {
  console.log('in api delete', req.params.id)
  try {
    await User.destroy({where: {id: req.params.id}})
    res.status(204).end()
  } catch (ex) {
    next(ex)
  }
})
