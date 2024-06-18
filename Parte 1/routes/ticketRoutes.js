import express from 'express'

import {
	crearTicket,
	obtenerTickets,
	eliminarTicket,
	modificarTicket,
	obtenerTicketsPorEspectador,
} from '../controllers/ticketController.js'

const router = express.Router()

router.route('/espectador/:id').post(crearTicket)
router.route('/').get(obtenerTickets)
router.route('/:id').delete(eliminarTicket).put(modificarTicket)
router.route('/categoria-espectador/:categoria').get(obtenerTicketsPorEspectador)

export default router
