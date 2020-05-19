const router = require('express').Router()
const Product = require('../db/models/product')
const Category = require('../db/models/category')
const Review = require('../db/models/review')
const Order = require('../db/models/order')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['title', 'ASC']],
      include: [
        {model: Review, attributes: ['rating', 'description']},
        {model: Category, attributes: ['name']},
      ],
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {model: Category},
        {model: Review, attributes: ['rating', 'description']},
      ],
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  req.body.categoryId =
    req.body.categoryId === 'null'
      ? JSON.parse(req.body.categoryId)
      : req.body.categoryId
  Product.create(req.body)
    .then((product) => res.status(201).json(product))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  req.body.categoryId =
    req.body.categoryId === 'null'
      ? JSON.parse(req.body.categoryId)
      : req.body.categoryId
  Product.findByPk(req.params.id)
    .then((product) => product.update(req.body))
    .then((product) => res.json(product))
    .catch(next)
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
    res.status(204).end()
  } catch (ex) {
    next(ex)
  }
})
router.put('/checkout/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then((product) => product.update(req.body))
    .then((product) => res.json(product))
    .catch(next)
})

// router.get('/:page?', (req, res, next) => {
//   const resultsPerPage = 8
//   // pageNum is zero indexed
//   let pageNum = req.params.page
//   //console.log("12121212121212121212121", pageNum);
//   if (pageNum === undefined) {
//     pageNum = 0
//   } else if (isNaN(pageNum)) {
//     return res.status(400).send({error: 'Invalid page number'})
//   }

//   const {limit, offset} = paginate(pageNum, resultsPerPage)
//   Employee.findAndCountAll({
//     limit,
//     offset,
//     // order: [
//     //   ["firstName", "asc"],
//     //   ["lastName", "asc"]
//     // ]
//   }).then((results) => {
//     res.status(200).send(results)
//   })
// })
