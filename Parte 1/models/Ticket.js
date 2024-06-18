import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema({
	precioTicket: {
		type: Number,
		required: true,
	},
	categoriaEspectador: {
		type: String,
		required: true,
		enum: ['e', 'l'],
	},
	fechaCompra: {
		type: String,
		required: true,
	},
	espectador: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Espectador',
		required: true,
	},
})

const Ticket = mongoose.model('Ticket', ticketSchema)
export default Ticket
