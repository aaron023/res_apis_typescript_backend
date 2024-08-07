import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req : Request, res : Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ]
        //attributes: {exclude: ['createdAt','updatedAt','availability']}
    })
    res.json({data : products})
}

export const getProductById = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    res.json({data: product})
}

export const createProduct = async (req : Request, res : Response) => {
    // // Validación
    // await check('name')
    //     .notEmpty().withMessage('El nombre del producto no puede ir vacio')
    //     .run(req)
    
    // await check('price')
    //     .isNumeric().withMessage('Valor no válido')
    //     .notEmpty().withMessage('El precio del producto no puede ir vacio')
    //     .custom(value => value > 0).withMessage('precio no válido')
    //     .run(req)

    // let errors = validationResult(req)
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({errors: errors.array()})
    // }

    const product = await Product.create(req.body)
    //res.json({data: product})
    res.status(201).json({data: product})   
}

export const updateProduct = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    //Actualizar
    await product.update(req.body)
    await product.save()

    res.json({data: product})

}

export const updateAvailability = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    //Actualizar
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({data: product})

}

export const deleteProduct = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }

    await product.destroy()
    res.json({ data: 'Producto Eliminado' })

}