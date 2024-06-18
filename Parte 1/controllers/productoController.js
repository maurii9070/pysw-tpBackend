import mongoose from 'mongoose'
import Producto from '../models/Producto.js'

const crearProducto = async (req, res) => {
	const producto = req.body

	try {
		const newProducto = new Producto(producto)
		const productoDB = await newProducto.save()
		res.json({ msg: 'Producto creado con exito', producto: productoDB })
	} catch (error) {
		console.log(error)
	}
}

const obtenerProductos = async (req, res) => {
	try {
		const productos = await Producto.find()
		res.json(productos)
	} catch (error) {
		console.log(error)
	}
}

const obtenerProductosDestacados = async (req, res) => {
	try {
		const productos = await Producto.find({ destacado: true })
		res.json(productos)
	} catch (error) {
		console.log(error)
	}
}

const modificarProducto = async (req, res) => {
	const { id } = req.params

	// Validar por objectID
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID no valido' })
	}
	// Validar que exista
	const producto = await Producto.findById(id)
	if (!producto) {
		return res.status(404).json({ msg: 'Producto no encontrado' })
	}

	try {
		await producto.updateOne(req.body)
		res.json({ msg: 'Producto modificado con exito' })
	} catch (error) {
		console.log(error)
	}
}

const eliminarProducto = async (req, res) => {
	const { id } = req.params

	// Validar por objectID
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID no valido' })
	}
	// Validar que exista
	const producto = await Producto.findById(id)
	if (!producto) {
		return res.status(404).json({ msg: 'Producto no encontrado' })
	}

	try {
		await producto.deleteOne()
		res.json({ msg: 'Producto eliminado con exito' })
	} catch (error) {
		console.log(error)
	}
}

export { obtenerProductos, obtenerProductosDestacados, crearProducto, eliminarProducto, modificarProducto }
