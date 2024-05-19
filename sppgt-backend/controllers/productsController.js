//приличный коммент. код говна
const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')

class ProductsController {
    async create(req, res, next) {

        try {
            let { name, price, rating, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({ name, price, typeId, info, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )

            }



            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }


    }

    async getAll(req, res) {
        let { typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (typeId) {
            products = await Product.findAndCountAll({ where: { typeId }, limit, offset })
        }

        if (!typeId) {
            products = await Product.findAndCountAll({ limit, offset })
        }

        return res.json(products)
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = await Product.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            },
        )
        return res.json(product)
    }
}

module.exports = new ProductsController()