const router = require('express').Router()
//const Product = require('../db/models/product')
const Cart = require('../db/models/cart')
module.exports = router

/* router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findAll()

    res.json(cart)
  } catch (err) {
    next(err)
  }
})
 */

/*  router.get('/',(req,res,next)=>{
    Order.findAll({where: {
                    userId: //Userid
                  },
                  {
                    status: //CART
                  }
            })
})
 */
router.post('/', (req, res, next) => {
  Cart.create(req.body)
    .then((resp) => {
      res.status(200).send(resp)
    })
    .catch(next)
})

/* router.put('/',(req,res,next)=>{
  Cart.findBy

}) */
