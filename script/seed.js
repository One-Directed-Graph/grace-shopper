'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const Product = require('../server/db/models/product')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const products = await Promise.all([
    Product.create({
      title: 'coolMask',
      description: 'be stylish and protected',
      price: 1.5,
      quantity: 10000,
      img: '/a.jpg',
    }),
    Product.create({
      title: 'sexyMask',
      description: 'sexy is good, do not forget social distancing',
      price: 1.9,
      quantity: 10000,
      img: '../public/images/stylish2.jpg',
    }),
    Product.create({
      title: 'scaryMask',
      description:
        'best for being protetcted and people will be scare to walk up to you',
      price: 1.25,
      quantity: 10000,
      img: '../public/images/scary.jpg',
    }),
  ])
  console.log('seeded Products successfully')
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
