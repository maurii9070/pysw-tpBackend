import mongoose from 'mongoose'

const transaccionSchema = mongoose.Schema({
	monedaOrigen: {
		type: String,
		required: true,
	},
	cantidadOrigen: {
		type: Number,
		required: true,
	},
	monedaDestino: {
		type: String,
		required: true,
	},
	cantidadDestino: {
		type: Number,
	},
	emailCliente: {
		type: String,
		required: true,
	},
	tasaConversion: {
		type: Number,
		required: true,
	},
})

const Transaccion = mongoose.model('Transaccion', transaccionSchema)
export default Transaccion
