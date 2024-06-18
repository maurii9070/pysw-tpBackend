import mongoose from 'mongoose'

const espectadorSchema = mongoose.Schema({
	apellido: {
		type: String,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
	dni: {
		type: Number,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
})

const Espectador = mongoose.model('Espectador', espectadorSchema)
export default Espectador
