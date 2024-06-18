import express from 'express'
import {
	obtenerProductos,
	obtenerProductosDestacados,
	crearProducto,
	eliminarProducto,
	modificarProducto,
} from '../controllers/productoController.js'

const router = express.Router()

router.route('/').get(obtenerProductos).post(crearProducto)
router.route('/:id').delete(eliminarProducto).put(modificarProducto)
router.route('/destacados').get(obtenerProductosDestacados)

export default router
