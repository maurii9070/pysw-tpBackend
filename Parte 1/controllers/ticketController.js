import mongoose from 'mongoose'
import Ticket from '../models/Ticket.js'

const crearTicket = async (req, res) => {
	const ticket = req.body
	const { id } = req.params
	ticket.espectador = id
	try {
		const newTicket = new Ticket(ticket)
		const result = await newTicket.save()
		res.json({ msg: 'Ticket creado con exito', ticket: result })
	} catch (error) {
		console.log(error)
	}
}

const obtenerTickets = async (req, res) => {
	try {
		const tickets = await Ticket.find()
		res.json(tickets)
	} catch (error) {
		console.log(error)
	}
}

const obtenerTicketsPorEspectador = async (req, res) => {
	const { categoria } = req.params
	try {
		const tickets = await Ticket.find({ categoriaEspectador: categoria })
		res.json(tickets)
	} catch (error) {
		console.log(error)
	}
}

const eliminarTicket = async (req, res) => {
	const { id } = req.params

	// Validar por objectID
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID no valido' })
	}

	// Validar que exista
	const ticket = await Ticket.findById(id)
	if (!ticket) {
		return res.status(404).json({ msg: 'Ticket no encontrado' })
	}

	try {
		await ticket.deleteOne()
		res.json({ msg: 'Ticket eliminado con exito', ticket })
	} catch (error) {
		console.log(error)
	}
}

const modificarTicket = async (req, res) => {
	const { id } = req.params

	// Validar por objectID
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID no valido' })
	}
	// Validar que exista
	const ticket = await Ticket.findById(id)
	if (!ticket) {
		return res.status(404).json({ msg: 'Ticket no encontrado' })
	}

	try {
		await ticket.updateOne(req.body)
		res.json({ msg: 'Ticket modificado con exito', ticket })
	} catch (error) {
		console.log(error)
	}
}

export { crearTicket, obtenerTickets, eliminarTicket, modificarTicket, obtenerTicketsPorEspectador }
