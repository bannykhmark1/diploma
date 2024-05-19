const Router = require('express')

const router = new Router()
const productsRouter = require('./productsRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/product', productsRouter)

module.exports = router
