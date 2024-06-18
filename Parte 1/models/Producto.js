import mongoose from 'mongoose'

const productoSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true,
	},
	descripcion: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	precio: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	destacado: {
		type: Boolean,
		default: false,
	},
})

const Producto = mongoose.model('Producto', productoSchema)
export default Producto
