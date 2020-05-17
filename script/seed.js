'use strict'

const db = require('../server/db')

const {
  User,
  Product,
  Category,
  Order,
  OrderItem,
  Review,
  Cart,
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', admin: true}),
    User.create({email: 'vinayak@email.com', password: '123', admin: true}),
    User.create({email: 'katt@email.com', password: '123', admin: true}),
    User.create({email: 'aleks@email.com', password: '123', admin: true}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'jeff@email.com', password: '123'}),
    User.create({email: 'taylor@email.com', password: '123'}),
    User.create({email: 'manny@email.com', password: '123'}),
    User.create({email: 'eric@email.com', password: '123'}),
    User.create({email: 'mark@email.com', password: '123'}),
    User.create({email: 'peet@email.com', password: '123'}),
  ])

  console.log(`seeded ${users.length} users`)

  const [medical, fashion, handMade] = await Promise.all([
    Category.create({
      name: 'medical',
      description: 'safety masks for everyday use',
      img: '/menuMed.jpeg',
    }),
    Category.create({
      name: 'fashion',
      description: ' masks that are fashion-forward and chic',
      img: '/manuPic3.jpeg',
    }),
    Category.create({
      name: 'handmade',
      description: 'handmade masks that are comfortable and fun',
      img: '/manuHMpic1.jpg',
    }),
  ])

  const products = await Promise.all([
    Product.create({
      title: 'Cool Mask',
      description: 'be stylish and protected',
      price: 1.5,
      quantity: 10000,
      img: '/images/blueMask.jpeg',
      categoryId: medical.id,
    }),
    Product.create({
      title: 'Sexy Mask',
      description: 'sexy is good, do not forget social distancing',
      price: 1.9,
      quantity: 10000,
      img: '/images/blinblin.jpeg',
      categoryId: fashion.id,
    }),
    Product.create({
      title: 'Scary Mask',
      description:
        'best for being protected and people will be scare to walk up to you',
      price: 1.25,
      quantity: 10000,
      img: '/images/blackMask.jpeg',
      categoryId: handMade.id,
    }),
    /////////////////////////////// done
    Product.create({
      title: 'Black Mask',
      description: 'be stylish and protected',
      price: 1.5,
      quantity: 10000,
      img: '/images/blackMask.jpeg',
      categoryId: medical.id,
    }),
    Product.create({
      title: 'Blue Round',
      description: 'Medical mask, better protaction. Rated N95 for medical use',
      price: 1.9,
      quantity: 10000,
      img: '/images/blueRound.jpeg',
      categoryId: medical.id,
    }),
    Product.create({
      title: 'Round Texture',
      description: 'Bright colors nice design art work',
      price: 1.25,
      quantity: 10000,
      img: '/images/bright.jpeg',
      categoryId: handMade.id,
    }),
    /////////////////////////////////////////// done
    Product.create({
      title: 'Dust Mask',
      description: 'construction style mask',
      price: 1.5,
      quantity: 10000,
      img: '/images/constructionMask.jpeg',
      categoryId: medical.id,
    }),
    Product.create({
      title: 'Designer Mask',
      description: 'sexy is good, do not forget social distancing',
      price: 1.9,
      quantity: 10000,
      img: '/images/crazyEyes.jpeg',
      categoryId: fashion.id,
    }),

    Product.create({
      title: 'Nice Texture Mask',
      description: 'hand made with nice texture design, dark colors',
      price: 1.25,
      quantity: 10000,
      img: '/images/colorfullMask.jpeg',
      categoryId: handMade.id,
    }),
    //////////////////////////////////////////////////// done
    Product.create({
      title: 'Custom Made Masks',
      description: 'you dream it we make it, does protect from virus too',
      price: 15000,
      quantity: 100,
      img: '/images/crazyMoney.jpeg',
      categoryId: fashion.id,
    }),
    Product.create({
      title: 'Cycodelic Texture Mask',
      description: 'sexy is good, do not forget social distancing',
      price: 1.9,
      quantity: 10000,
      img: '/images/dark.jpeg',
      categoryId: handMade.id,
    }),

    Product.create({
      title: 'Modern Gas Mask',
      description: 'it extreme but best resolts',
      price: 30,
      quantity: 1000,
      img: '/images/dastMask2.jpg',
      categoryId: medical.id,
    }),
    /////////////////////////////////////// done
    Product.create({
      title: 'Duck Style Mask',
      description:
        'duck style mask greate protection, horizontal nous direction',
      price: 1.5,
      quantity: 10000,
      img: '/images/duckyStyleHoriz.jpeg',
      categoryId: medical.id,
    }),
    Product.create({
      title: 'Duck Style Mask2',
      description: 'duck style mask greate protection, vertical nous direction',
      price: 1.9,
      quantity: 10000,
      img: '/images/duckyStylevertical.jpeg',
      categoryId: medical.id,
    }),

    Product.create({
      title: 'Flowers Mask',
      description: 'hand made with nice texture design, light colors',
      price: 15,
      quantity: 10000,
      img: '/images/flowers.jpeg',
      categoryId: handMade.id,
    }),
    //////////////////////////done
    Product.create({
      title: 'Gas Punk Mask',
      description: 'real gas mask, with futeristic fetures',
      price: 15,
      quantity: 1000,
      img: '/images/gasMASK.jpeg',
      categoryId: medical.id,
    }),
    Product.create({
      title: 'Happy Mask',
      description: 'real colorful with bunch of diffrent designs',
      price: 15,
      quantity: 100,
      img: '/images/happy.jpeg',
      categoryId: handMade.id,
    }),

    Product.create({
      title: 'White N95 Mask',
      description:
        'real protection most popular, no nosel for better breathing',
      price: 3,
      quantity: 10000,
      img: '/images/N95no.jpeg',
      categoryId: medical.id,
    }),
    //////////////////////////////////////done
    Product.create({
      title: 'N95 With Nosel Mask',
      description:
        'Best seller best protection, mask with nosel and carbon filter',
      price: 4,
      quantity: 10000,
      img: '/images/N95yes.jpeg',
      categoryId: medical.id,
    }),
    Product.create({
      title: 'Puma Texture Mask',
      description: 'custom mask puma design',
      price: 15,
      quantity: 1000,
      img: '/images/pumma.jpeg',
      categoryId: handMade.id,
    }),

    Product.create({
      title: 'Disco Mask',
      description: 'hand made mask for zoom parties',
      price: 150,
      quantity: 100,
      img: '/images/stylish.jpg',
      categoryId: fashion.id,
    }),
    //////////////////////////////////////done
    Product.create({
      title: 'Harizontal Duck Mask',
      description: 'medical good protetction',
      price: 1.5,
      quantity: 10000000,
      img: '/images/duckyStyleHoriz.jpeg',
      categoryId: medical.id,
    }),
    Product.create({
      title: 'Stylish Mask',
      description: 'mask to look profesinal in the office',
      price: 30,
      quantity: 1000,
      img: '/images/stylishBlueMask.jpeg',
      categoryId: fashion.id,
    }),

    Product.create({
      title: 'Designer Extas Masks',
      description: 'hand made with custom jewelery',
      price: 150,
      quantity: 100,
      img: '/images/superFashion.jpg',
      categoryId: fashion.id,
    }),
    //////////////////////////////done
    Product.create({
      title: 'Tribal Mask',
      description: 'custom mask with tribal texture',
      price: 15,
      quantity: 10000,
      img: '/images/tribal.jpeg',
      categoryId: handMade.id,
    }),
    Product.create({
      title: 'WW2 Gas Mask',
      description: 'dold fashion but protects even from radiation',
      price: 100,
      quantity: 10000,
      img: '/images/WW2gasMask.jpeg',
      categoryId: medical.id,
    }),

    Product.create({
      title: 'Zebra Mask',
      description: 'hand made with nice texture design, light colors',
      price: 15,
      quantity: 10000,
      img: '/images/Zebra.jpeg',
      categoryId: handMade.id,
    }),
  ])

  console.log(`seeded ${products.length} products`)

  //ORDERS & ORDERITEMS

  const randStatus = ['Cart', 'Processing', 'Completed', 'Cancelled', 'Shipped']

  const orders = await Promise.all(
    users
      .filter((user) => !user.admin)
      .map((user) =>
        Order.create({
          status: randStatus[Math.floor(Math.random() * randStatus.length)],
          userId: user.id,
        })
      )
  )

  console.log(`seeded ${orders.length} orders`)

  const orderItems = await Promise.all(
    orders.map((_order) => {
      const randProduct = products[Math.floor(Math.random() * products.length)]
      return OrderItem.create({
        orderId: _order.id,
        productId: randProduct.id,
        quantity: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        price: randProduct.price,
      })
    })
  )

  console.log(`seeded ${orderItems.length} orderItems`)

  const [codyOrder] = await Promise.all([
    Order.create({
      dateOfPurchase: '05/01/2020',
      status: 'Cart',
      userId: users[0].id,
    }),
  ])

  const codyOrderItems = await Promise.all([
    OrderItem.create({
      orderId: codyOrder.id,
      productId: products[2].id,
      quantity: 4,
      price: products[2].price,
    }),
    OrderItem.create({
      orderId: codyOrder.id,
      productId: products[1].id,
      quantity: 10,
      price: products[1].price,
    }),
  ])

  console.log(
    'cody orders',
    users[0].email,
    codyOrder.id,
    codyOrderItems.map((item) => item.orderId)
  )

  orders.forEach((order) => {
    let subTotal = 0
    orderItems.forEach((orderItem) => {
      if (order.id === orderItem.orderId) {
        subTotal += orderItem.price * 1
      }
    })
    order.update({subTotal})
  })

  console.log(`updated ${orders.length} orders`)

  //REVIEWS
  const randDescriptions = [
    'This mask is horrible.',
    'I definitely would not buy this again.',
    'Usable...',
    'I like it! Decent.',
    'Excellent mask!',
  ]

  const reviews = await Promise.all(
    orderItems.map((orderItem) => {
      const order = orders.find((_order) => _order.id === orderItem.orderId)
      const rand = Math.floor(Math.random() * (5 - 1 + 1)) + 1
      return Review.create({
        userId: order.userId,
        productId: orderItem.productId,
        rating: rand,
        description: randDescriptions[rand - 1],
      })
    })
  )
  console.log(`seeded ${reviews.length} reviews`)

  await Promise.all([
    Review.create({
      userId: users[0].id,
      productId: products[2].id,
      rating: 5,
      description: 'Excellent mask',
    }),
  ])

  //CARTS
  const carts = await Promise.all([
    Cart.create({
      productId: products[2].id,
      quantity: 4,
      price: 1.25,
    }),
    Cart.create({
      productId: products[1].id,
      quantity: 10,
      price: 1.9,
    }),
  ])

  console.log(`seeded ${carts.length} carts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
