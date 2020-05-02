const router = require('express').Router()
const Product = require('../db/models/product')
const Category = require('../db/models/category')
module.exports = router

router.get('/', async (req, res, next) => {
  //console.log('<><><><><><><><><>><><><><><><><>')
  try {
    const categories = await Category.findAll()

    res.json(categories)
  } catch (err) {
    next(err)
  }
})
